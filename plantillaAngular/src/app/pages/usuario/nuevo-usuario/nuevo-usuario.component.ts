import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Role } from 'src/app/models/Role.model';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  @Output() usuarioGuardado = new EventEmitter<Usuario>();

  form!: FormGroup;
  roles: Role[] = [];

  constructor(
    private usuarioService: UsuarioServiceService,
    private formBuilder: FormBuilder
  ) {}
  
  toJson(value: any) {
    return JSON.stringify(value);
  }
  
  
  ngOnInit() {
    this.usuarioService.traerRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
      },
      error:()=>{console.log('Ocurrió un error en el servidor');},
      complete:() => {}
    });
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      status: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }
  guardar() {
    if (this.form.valid) {
      const usuario: Usuario = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        status: this.form.value.status,
        roles: [JSON.parse(this.form.value.roles)] ,
      };
      this.usuarioService.crearNuevoUsuario(usuario).subscribe({
        next:() => {
          this.usuarioGuardado.emit(usuario);
          alert('Usuario creado');
        },
        error:()=>{
          alert('Ocurrió un error en el servidor');
        },
        complete:() => {
          this.form.reset();
        }
      });
    } else {
      alert('Debe completar todos los campos');
    }
  }
  emitirEventoUsuarioGuardado(usuario: Usuario) {
    this.usuarioGuardado.emit(usuario);
  }
}
