import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }


  listar() {
    return this.http.get<Usuario[]>(`http://localhost:8080/api/usuario`);
  }
  eliminar(id: number) {
    return this.http.put<Usuario[]>(`http://localhost:8080/api/usuario/eliminar/${id}`, null);
  }
  crearNuevoUsuario(usuario: Usuario){
    return this.http.post<Usuario>(`http://localhost:8080/api/usuario`, usuario);
  }
  obtenerUnUsuario(id: number){
    return this.http.get<Usuario>(`http://localhost:8080/api/usuario/${id}`);
  }
  updateUsuario(id:number ,usuario: Usuario){
    return this.http.put<Usuario>(`http://localhost:8080/api/usuario/editar/${id}`, usuario);
  }
  traerRoles(){
    return this.http.get<Role[]>(`http://localhost:8080/api/usuario/roles`);
  }
}
