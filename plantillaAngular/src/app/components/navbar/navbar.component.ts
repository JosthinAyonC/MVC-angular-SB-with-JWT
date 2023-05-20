import { Component, Input, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isLoggedIn!: boolean ;
  isLogged : boolean = false;
  usuarioLogged? :Usuario |null;
  isAdmin: boolean = false;

  constructor(private tokenService:TokenService, private authService: AuthService) { }

  
  ngOnInit(){
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.islogged();
    this.usuarioLogged = this.authService.traerPersonaLogeada();
  }

  logout() {
    this.tokenService.logout();
    window.location.reload();
  }

}
