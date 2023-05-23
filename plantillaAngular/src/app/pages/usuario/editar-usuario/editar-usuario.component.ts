import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Service/token.service';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Role } from 'src/app/models/Role.model';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  usuario!: Usuario;//Usuario recuperado para editar
  form!: FormGroup;
  roles: Role[] = [];
  @Input() idUsuarioAEditar!: Usuario;
  id = localStorage.getItem('idUsuario');

  constructor(
    private usuarioService: UsuarioServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }


  readonlyMode: boolean = true;

  ngOnInit() {    
    if (this.tokenService.isAdmin()) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        status: ['', Validators.required],
        roles: ['', Validators.required],
      });
      //Traer los roles para el select
      this.usuarioService.traerRoles().subscribe({
        next: (data: Role[]) => {
          this.roles = data;
        },
        error: (error) => { console.log(`Ocurrió un error al traer los roles ${error.status}`); },
        complete: () => { }
      });
      //Obtener el usuario y setear los valores iniciales
      this.usuarioService.obtenerUnUsuario(+this.id!).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (error) => { console.log(`Ocurrió un error al traer el usuario ${error.status}`); },
        complete: () => {
          this.form.patchValue({
            username: this.usuario.username,
            email: this.usuario.email,
            firstname: this.usuario.firstname,
            lastname: this.usuario.lastname,
            status: this.usuario.status,
            roles: this.toJson(this.usuario.roles?.[0]),
          });
        }
      });
    }else{
      this.router.navigate(['/unauthorize']);
    }
  }

  volver() {
    localStorage.removeItem('idUsuario');//a mejorar
    this.router.navigate(['usuario']);
  }
  toJson(value: any) {
    return JSON.stringify(value);
  }
  guardar() {
    if (this.form.valid) {
      const usuario: Usuario = {
        id: this.usuario.id,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        status: this.form.value.status,
        roles: [JSON.parse(this.form.value.roles)],
      };
      console.log(this.form.value.roles);
      this.usuarioService
        .updateUsuario(usuario.id!, usuario)
        .subscribe({
          next:(data) => {
            this.usuario = data;
            alert('Se actualizo con exito');
            this.router.navigate(['usuario']);
          },
          error: (error) => { console.log(`Ocurrió un error al actualizar el usuario ${error.status}`); },
          complete: () => {
            localStorage.removeItem('idUsuario');
           }
        });
    } else {
      alert('Debe completar todos los campos');
    }
  }
}
