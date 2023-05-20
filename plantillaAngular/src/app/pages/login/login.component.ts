import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { LoginDto } from 'src/app/models/LoginDto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit() {
    
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  guardar():void {
    if (this.form.valid) {
      const dto = new LoginDto(this.form.value.username, this.form.value.password);
      this.authService.login(dto).subscribe({
        next: (data) => {
          this.tokenService.setToken(data.accessToken);
          this.authService.setPersonaLogeada(JSON.stringify(data));
        },
        error: (error) => { alert(`error ${error.status}: Usuario o contrasnia incorrectas`); },
        complete: () => {
          sessionStorage.setItem("isLoggedIn", 'true');
          window.location.replace('/');
        }
      });
    }else{
      alert('Debe completar todos los campos');
    }
  }
}
