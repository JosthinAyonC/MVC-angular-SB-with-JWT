# Spring Boot JWT Authentication example with Spring Security & Spring Data JPA, SpringV 2.7

Cosas a considerar al manipular la plantilla backend: 

1. Agregar rutas de acceso en WebSecurityConfig.java
2. Agregar en la db en inserto de roles.

## Run Spring Boot application
```
mvn spring-boot:run
```

## Run following SQL insert statements
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```
## Info de como enviar el body para creacion, registro y edicion de usuario.
```
{
        "username": "josthin24",
        "email": "jayonss@hotmail.com",
        "password": "lokoloko21",
        "firstname": "Josthin",
        "lastname": "Ayon",
        "status": "A",
        "roles": [
            {
                "id": 2
            }
        ]
    }
```
## Info de firma y duracion de token
```
La informacion que se encuentra en application.properties es la firma y la duracion del token.
bezkoder.app.jwtSecret= bezKoderSecretKey
bezkoder.app.jwtExpirationMs= 86400000
```
