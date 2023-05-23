import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { UsuarioServiceService } from 'src/app/Service/usuario-service.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {
  form!: FormGroup;

  usuarioLogged! :Usuario |null ;
  id!:number;

  constructor(private tokenService:TokenService, 
    private authService: AuthService, 
    private router: Router,
    private usuarioService: UsuarioServiceService,
    private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.usuarioLogged = JSON.parse(this.authService.traerPersonaLogeada());
    this.id = this.usuarioLogged?.id || 0;
    this.form = this.formBuilder.group({
      lastpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      cnewpassword: ['', Validators.required],
    });
  }

  actualizarClave(){
    if (this.form.valid){
      if (this.form.value.newpassword == this.form.value.cnewpassword){
        this.usuarioService.actualizarClave(this.id, this.form.value.lastpassword, this.form.value.newpassword).subscribe({
          next:() => {
            alert('Contraseña actualizada');
          },
          error:(error) => {
            if (error.status === 400) {
            alert(error.error.message);
            } else {
              alert('Ocurrió un error en el servidor');
            }
          },
          complete:() => {
          this.router.navigate(['/usuario/myprofile']);
          }
        });
    }else{
      alert('Las contraseñas no coinciden');
    }
  }else{
    alert('Complete los campos');
  }

}
}
