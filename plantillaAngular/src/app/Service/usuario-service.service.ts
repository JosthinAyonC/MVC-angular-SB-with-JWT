import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(`http://localhost:8080/api/usuario`);
  }
  eliminar(id: number){
    return this.http.put<Usuario[]>(`http://localhost:8080/api/usuario/eliminar/${id}`, null);
  }
}
