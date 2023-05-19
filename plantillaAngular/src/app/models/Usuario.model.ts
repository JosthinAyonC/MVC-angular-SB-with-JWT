export interface Usuario {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    clave: string,
    roles: string[],
    estado: string
}