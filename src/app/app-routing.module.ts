import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListaClientesComponent} from "./pages/cliente/lista/lista-clientes.component";
import {CadastroClienteComponent} from "./pages/cliente/cadastro/cadastro-cliente.component";
import {EdicaoClienteComponent} from "./pages/cliente/edicao/edicao-cliente.component";

const routes: Routes = [
  {path: '', component: ListaClientesComponent},
  {path: 'clientes', component: ListaClientesComponent},
  {path: 'clientes/cadastro', component: CadastroClienteComponent},
  {path: 'clientes/:cpf', component: EdicaoClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
