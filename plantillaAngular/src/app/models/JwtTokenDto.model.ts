export class JwtTokenDto {
    username: string;
    password: string;
    id: number;
    firstname: string;
    lastname: string;
    status: string;
    roles: string[];
    tokenType: string;
    accessToken: string;

    constructor(username: string, password: string, id: number, firstname: string, lastname: string, status: string, roles: string[], tokenType: string, accessToken: string) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.status = status;
        this.roles = roles;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
    }

}