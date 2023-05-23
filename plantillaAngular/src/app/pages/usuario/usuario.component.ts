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
  role?: Role;
  isAdmin: boolean = false;
  page!: number ;
  // usuarios: Observable<Usuario[]> = new Observable<Usuario[]>();
  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  //funcion lista para ser exportada
  obtenerUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }
  obtenerUsuarioId(usuario: Usuario) {
    localStorage.setItem('idUsuario', usuario.id!.toString());
    this.router.navigate(['usuario/editar']);
  }
  usuarios: Usuario[] = [];
  ngOnInit() {
    if (this.tokenService.isAdmin() || this.tokenService.isMod()) {
      this.isAdmin = this.tokenService.isAdmin(); //Cambia el valor de admin para usarlo en el html
      this.usuarioService.listar().subscribe({
        next: (data: Usuario[]) => {
          this.usuarios = data.filter((usuario: Usuario) => usuario.status);
        },
        error: (error) => {
          console.log(`Ocurrió un error al traer los usuarios ${error.status}`);
          this.tokenService.logout();
          window.location.replace('/login');
        },
        complete: () => {},
      });
    }else{
      this.router.navigate(['/unauthorize']);
    }
  }
  delete(id: number) {
    this.usuarioService.eliminar(id).subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data.filter((usuario: Usuario) => usuario.status);
      },
      error: (error) => {
        console.log(`Ocurrió un error al eliminar el usuario ${error.status}`);
      },
      complete: () => {},
    });
  }
  onUsuarioGuardado(usuario: Usuario) {
    this.usuarios.push(usuario);
  }
}
