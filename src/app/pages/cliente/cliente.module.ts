import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ListaClientesComponent} from "./lista/lista-clientes.component";
import {CadastroClienteComponent} from "./cadastro/cadastro-cliente.component";
import {AppUiModule} from "../../ui/app-ui.module";
import {ClienteFormComponent} from "./shared/form/cliente-form.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EdicaoClienteComponent} from "./edicao/edicao-cliente.component";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  declarations: [
    ListaClientesComponent,
    CadastroClienteComponent,
    ClienteFormComponent,
    EdicaoClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppUiModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: []
})
export class ClienteModule{ }
