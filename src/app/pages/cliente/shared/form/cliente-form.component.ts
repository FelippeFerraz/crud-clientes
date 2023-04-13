import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Cliente} from "../../../../model/cliente.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {conformToMask} from "angular2-text-mask";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnChanges{

  @Input()
  public update = false;

  @Input()
  public cliente!: Cliente;

  @Output()
  public formSubmit: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  public formCliente!: FormGroup;

  public confirmButtonText = "Cadastrar Cliente";

  public mascaraCPF = [/\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public mascaraTelefone = ['(', /\d/, /\d/, ')', ' ', /\d?/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mascaraCEP = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor() {
    this.initForm();
  }

  public ngOnChanges(): void{

    if(this.cliente == undefined){
      return;
    }

    this.formCliente.patchValue(this.prepararDadosForm(this.cliente));
  }

  ngOnInit(): void {
    if(this.update){
      this.confirmButtonText = "Atualizar Cliente";
    }
  }

  public initForm(): void{

    this.formCliente = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.pattern("^\\d{3}\.\\d{3}\.\\d{3}\-\\d{2}$")]),
      telefone: new FormControl('', [Validators.required, Validators.pattern("^\\(\\d{2}\\) \\d?\\d{4}-\\d{4}$")]),
      rendimentoMensal: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
      relacionamento: new FormControl('', Validators.required),
      endereco: new FormGroup({
        cep: new FormControl('', [Validators.required, Validators.pattern("^\\d{5}\-\\d{3}$")]),
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
      })
    })

  }

  public onFormSubmit(): void{
    this.formCliente.markAllAsTouched();

    if(this.formCliente.invalid){
      return;
    }

    this.formSubmit.emit(this.getDadosFromForm());
  }

  public prepararDadosForm(cliente: Cliente): Cliente{
    cliente.cpf = conformToMask(cliente.cpf, this.mascaraCPF, {guide: true}).conformedValue;
    cliente.telefone = conformToMask(cliente.telefone, this.mascaraTelefone, {guide: true}).conformedValue;
    cliente.endereco.cep = conformToMask(cliente.endereco.cep, this.mascaraCEP, {guide: true}).conformedValue;
    return cliente;
  }

  public getDadosFromForm(): Cliente{
    const cliente = JSON.parse(JSON.stringify(this.formCliente.getRawValue())) as Cliente;

    cliente.cpf = cliente.cpf.replaceAll(/\D/g, "");
    cliente.telefone = cliente.telefone.replaceAll(/\D/g, "");
    cliente.endereco.cep = cliente.endereco.cep.replaceAll(/\D/g, "");

    return cliente;
  }

  public isValidField(field: string, endereco = false): boolean{
    const control = (endereco ? this.formCliente.get('endereco')?.get(field) : this.formCliente.controls[field]) as FormControl;
    return control.invalid && (control.dirty || control.touched);
  }

  public reset(): void{
    this.formCliente.reset();
  }

}
