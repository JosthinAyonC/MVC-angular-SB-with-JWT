import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  // usuarios: Observable<Usuario[]> = new Observable<Usuario[]>();
  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    // this.usuarios = this.usuarioService.listar();

    this.usuarioService.listar().subscribe((data: Usuario[]) => {
      this.usuarios = data.filter((usuario: Usuario) => usuario.estado);
    });
  }
  delete(id: number) {
    this.usuarioService.eliminar(id).subscribe((data: Usuario[]) => {
      this.usuarios = data.filter((usuario: Usuario) => usuario.estado);
    });
  }
}
