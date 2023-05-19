import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private usuarioService: UsuarioServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  @Input() idUsuarioAEditar!: Usuario;

  ngOnInit() {
    this.usuarioService.traerRoles().subscribe((data: Role[]) => {
        this.roles = data;
      });
    this.editar();
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
  editar() {
    let id = localStorage.getItem('idUsuario');
    this.usuarioService.obtenerUnUsuario(+id!).subscribe((data) => {
      this.usuario = data;
    });
  }
  volver() {
    this.router.navigate(['usuario']);
  }
  toJson(value: any) {
    return JSON.stringify(value);
  }
  guardar() {
    if (this.form.valid) {
      const usuario: Usuario = {
        id: this.usuario.id,
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        status: this.form.value.status,
        roles: [JSON.parse(this.form.value.roles)],
      };
      console.log(usuario);
      this.usuarioService
        .updateUsuario(usuario.id!, usuario)
        .subscribe((data) => {
          this.usuario = data;
          alert('Se actualizo con exito');
          this.router.navigate(['usuario']);
        });
    } else {
      alert('Debe completar todos los campos');
    }
  }
}
