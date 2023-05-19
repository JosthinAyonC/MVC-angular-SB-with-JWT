import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit() {
    
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }
  guardar() {
    if (this.form.valid) {
      const usuario: Usuario = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname
      };
      this.usuarioService.registrarse(usuario).subscribe(
        {
          next: () => {
            alert('Usuario creado');
            this.router.navigate(['/login']);
            this.form.reset();
          },
          error: (error) => {
            if (error.status === 400) {
            alert(error.error.message);
            } else {
              alert('Ocurrió un error en el servidor');
            }
          },
          complete: () => {
            console.log('Observable completed');
          }
        });
    } else {
      alert('Debe completar todos los campos');
    }
  }
}
