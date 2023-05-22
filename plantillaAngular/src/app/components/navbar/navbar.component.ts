import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged : boolean = false;
  usuarioLogged! :Usuario |null ;
  isAdmin: boolean = false;
  isMod: boolean = false;

  constructor(private tokenService:TokenService, private authService: AuthService, private router: Router) { }

  
  ngOnInit(){
    this.isAdmin = this.tokenService.isAdmin();//Cambia la variable para usarla en el html
    this.isMod = this.tokenService.isMod();
    this.isLogged = this.tokenService.islogged();
    this.usuarioLogged = JSON.parse(this.authService.traerPersonaLogeada());
  }

  logout() {
    this.tokenService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
