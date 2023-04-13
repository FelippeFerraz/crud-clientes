import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../cliente.service";
import {Cliente} from "../../../model/cliente.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit{
  public clientes: Cliente[] = [];
  public linkTelaCadastro = "/clientes/cadastro/";

  constructor(private service: ClienteService, private router: Router) {

  }

  ngOnInit(): void {
    this.consultarClientes();
  }

  private consultarClientes(): void{

    this.service.listar().subscribe({
      next: (clientes) => this.onGetSuccess(clientes),
      error: (error) => this.onGetError(error),
    })

  }

  private onGetSuccess(clientes: Cliente[]): void{
    this.clientes = clientes;
  }

  private onGetError(error: any): void{
    this.clientes = [];
    console.log(error);
  }

  public editarCliente(cpf: string): void{
    this.router.navigate(["/clientes/", cpf]);
  }

  public excluirCliente(cpf: string): void{

    this.service.deletar(cpf).subscribe({
      next: () => this.onDeleteSuccess(),
      error: (error) => this.onDeleteError()
    });

  }

  public onDeleteSuccess(): void{
    this.consultarClientes()
  }

  public onDeleteError(): void{
    alert("Falha ao excluir cliente");
  }
}
