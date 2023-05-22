import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { Role } from '../models/Role.model';

const jwt = localStorage.getItem('auth-token');
const baseUrl: string = 'http://localhost:8080/api';
const headers = new HttpHeaders({
  'Authorization': `Bearer ${jwt}`
});
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }


  listar() {
    return this.http.get<Usuario[]>(`${baseUrl}/usuario`, {headers});
  }
  eliminar(id: number) {
    return this.http.put<Usuario[]>(`${baseUrl}/usuario/eliminar/${id}`, null, {headers});
  }
  crearNuevoUsuario(usuario: Usuario){
    return this.http.post<Usuario>(`${baseUrl}/usuario`, usuario,  {headers});
  }
  registrarse(usuario: Usuario){
    return this.http.post<Usuario>(`${baseUrl}/auth/signup`, usuario,  {headers});
  }
  obtenerUnUsuario(id: number){
    return this.http.get<Usuario>(`${baseUrl}/usuario/${id}`,  {headers});
  }
  updateUsuario(id:number ,usuario: Usuario){
    return this.http.put<Usuario>(`${baseUrl}/usuario/editar/${id}`, usuario,  {headers});
  }
  traerRoles(){
    return this.http.get<Role[]>(`${baseUrl}/usuario/roles`,  {headers});
  }

  actualizarClave(id: number, lastpassword: string, newpassword: string){
    return this.http.put<Usuario>(`${baseUrl}/usuario/changepass/${id}`, {lastpassword, newpassword},  {headers});
  }
}
