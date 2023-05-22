import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './app/Service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.islogged()){
      return true;
    } else {
      // Redirigir al componente de inicio de sesión si el usuario no está autenticado
      return this.router.parseUrl('/login');
    }
  }


}