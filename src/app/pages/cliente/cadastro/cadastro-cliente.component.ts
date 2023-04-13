import { Component } from '@angular/core';
import {Cliente} from "../../../model/cliente.model";
import {ClienteService} from "../cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {

  constructor(private service: ClienteService, private router: Router) {

  }

  public onSubmit(cliente: Cliente) {
    this.cadastrarCliente(cliente);
  }

  private cadastrarCliente(cliente: Cliente): void{
    this.service.incluir(cliente).subscribe({
      next: () => this.onCreateSuccess(),
      error: (error) => this.onCreateError(error.error.message),
    });
  }

  private onCreateSuccess(): void{
    alert("cliente cadastrado com sucesso!");
    this.router.navigate(["/"]);
  }

  private onCreateError(message: string): void{
    console.log(message);
    alert("falha ao cadastrar cliente: " + message);
  }
}
