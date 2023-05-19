import { Role } from './Role.model';

export interface Usuario {
    id?: number,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roles: Role[],
    status: string
}