import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../model/cliente.model";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {ClienteFormComponent} from "../shared/form/cliente-form.component";

@Component({
  selector: 'app-cadastro',
  templateUrl: './edicao-cliente.component.html',
  styleUrls: ['./edicao-cliente.component.css']
})
export class EdicaoClienteComponent implements OnInit{

  public cliente!: Cliente;

  @ViewChild(ClienteFormComponent)
  public form!: ClienteFormComponent;

  constructor(private service: ClienteService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.consultarCliente(params['cpf']));
  }

  public consultarCliente(cpf: string): void{
    this.service.consultar(cpf).subscribe(cliente => this.cliente = cliente);
  }

  public onSubmit(cliente: Cliente) {
    this.atualizarCliente(cliente);
  }

  private atualizarCliente(cliente: Cliente): void{

    this.service.atualizar(cliente).subscribe({
      next: () => this.onUpdateSuccess(),
      error: (error) => this.onUpdateError(error.error.message),
    });

  }

  private onUpdateSuccess(): void{
    alert("cliente atualizado com sucesso!");
    this.form.reset();
    this.router.navigate(["/"]);
  }

  private onUpdateError(message: string): void{
    alert("falha ao atualizar cliente: " + message);
  }

}
