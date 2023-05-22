import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  usuarioLogged! :Usuario |null ;
  constructor(private tokenService:TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.usuarioLogged = JSON.parse(this.authService.traerPersonaLogeada());
  }

  toString(objeto: any){
    return objeto.toString();
  }
}
