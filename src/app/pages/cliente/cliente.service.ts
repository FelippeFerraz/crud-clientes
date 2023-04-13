import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cliente } from "../../model/cliente.model";
import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/producao";

@Injectable({ providedIn: 'root' })
export class ClienteService{
  private API = environment.API + "/clientes";
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {

  }

  public consultar(cpf: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.API}/${cpf}`);
  }

  public listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.API);
  }

  public deletar(cpf: string): Observable<any>{
    return this.http.delete(`${this.API}/${cpf}`);
  }

  public incluir(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API, JSON.stringify(cliente), {headers: this.headers});
  }

  public atualizar(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.API}/${cliente.cpf}`, JSON.stringify(cliente), {headers: this.headers});
  }

}
