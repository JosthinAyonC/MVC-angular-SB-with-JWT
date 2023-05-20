import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "../models/LoginDto.model";
import { Observable } from "rxjs";
import { JwtTokenDto } from "../models/JwtTokenDto.model";
import { Usuario } from "../models/Usuario.model";
const PERSONA_LOGG = 'logged-persona';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    usuario! : Usuario;

    constructor(private http: HttpClient) {}

    login(dto: LoginDto): Observable<JwtTokenDto> {
        return this.http.post<JwtTokenDto>("http://localhost:8080/api/auth/signin", dto);
    }

    public setPersonaLogeada(usuario: string): void {
        localStorage.setItem(PERSONA_LOGG, usuario);
    }

    public getPersonaLogeada(): string | null {
        return localStorage.getItem(PERSONA_LOGG);
    }

    public traerPersonaLogeada(){
        const persona = this.getPersonaLogeada();
        if(persona != null){
            this.usuario = JSON.parse(persona);
            return this.usuario;
        }
        return null;
    }

}