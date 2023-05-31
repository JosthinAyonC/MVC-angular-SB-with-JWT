import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/Service/token.service';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Role } from 'src/app/models/Role.model';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  //usuario que va a ser obtenido para extraer el id cuando presione el boton eliminar/editar
  usuarioSeleccionado!: Usuario;
  usuarioIdSeleccionado!: number;
  usuarios: Usuario[] = [];
  role?: Role;
  isAdmin: boolean = false;
  page: number = 0 ;
  totalPages?: Array<number>;
  
  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  obtenerUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  obtenerUsuarioId(usuario: Usuario) {
    localStorage.setItem('idUsuario', usuario.id!.toString());
    this.router.navigate(['usuario/editar']);
  }

  ngOnInit() {
    if (this.tokenService.isAdmin() || this.tokenService.isMod()) {
      this.isAdmin = this.tokenService.isAdmin(); //Cambia el valor de admin para usarlo en el html
      this.listarUsuarios();
    }else{
      this.router.navigate(['/unauthorize']);
    }
  }

  lastPage(){
      this.page--;
      this.listarUsuarios();
  }

  nextPage(){
      this.page++;
      this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listar(this.page).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPages = new Array(data['totalPages']);
        this.usuarios = data.content;
      },
      error: (error) => {
        console.log(`Ocurrió un error al traer los usuarios ${error.status}`);
        this.tokenService.logout();
        window.location.replace('/login');
      },
      complete: () => {},
    });
  }

  delete(id: number) {
    this.usuarioService.eliminar(id).subscribe({
      next: (data: any) => {
        this.totalPages = data.totalPages;
        this.usuarios = data.content;
      },
      error: (error) => {
        console.log(`Ocurrió un error al eliminar al usuario ${error.status}`);
      },
      complete: () => {},
    });
  }

  onUsuarioGuardado(usuario: Usuario) {
    this.usuarios.unshift(usuario);
  }

  setpage(page:number): void{
    this.page = page;
    this.listarUsuarios();
  }
}
