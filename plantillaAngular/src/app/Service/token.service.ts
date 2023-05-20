import { Injectable } from "@angular/core";

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    roles: string[] = [];

    constructor() { }

    public setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("logged-persona");
        sessionStorage.removeItem("isLoggedIn");
    }

    public islogged(): boolean {
        return this.getToken() != null;
    }

    public isAdmin(): boolean {
        if(!this.islogged()) return false;
        this.verificarRol();
        if(this.roles.includes('ROLE_ADMIN')) return true;
        return false;
    }

    public isMod(): boolean {
        if(!this.islogged()) return false;
        this.verificarRol();
        if(this.roles.includes('ROLE_MODERATOR')) return true;
        return false;
    }
    
    public verificarRol():void{
        const token = this.getToken();
        const payload = token!.split(".")[1];
        const payloadDecoded = atob(payload as string);
        const values = JSON.parse(payloadDecoded);
        this.roles = values.roles;
    }

    

}