import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificar si el usuario está autenticado (simulación)
    const isAuthenticated = this.checkAuthentication();

    if (isAuthenticated) {
      return true; // Permitir acceso a la ruta "usuario"
    } else {
      // Redirigir al componente de inicio de sesión si el usuario no está autenticado
      return this.router.parseUrl('/login');
    }
  }

  checkAuthentication(): boolean {
    // Simulación: Verificar si el usuario está autenticado
    // Aquí puedes implementar tu lógica real para verificar la autenticación del usuario.
    // Por ahora, simularemos que el usuario está autenticado si una variable de sesión llamada "isLoggedIn" es verdadera.
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  }
}