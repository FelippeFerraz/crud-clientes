import { Endereco } from "./endereco.model";
import {NivelRecionamentoEnum} from "./enums/nivel-recionamento.enum";

export interface Cliente{
  nome: string;
  cpf: string;
  telefone: string;
  rendimentoMensal: number,
  relacionamento: NivelRecionamentoEnum,
  endereco: Endereco;
}
