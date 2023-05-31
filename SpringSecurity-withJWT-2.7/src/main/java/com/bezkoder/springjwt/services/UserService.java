package com.bezkoder.springjwt.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.response.MessageResponse;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository usuarioRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;

    //Post que se encarga de verificar que no existan datos duplicados y nulos, y posterior a eso inserta el dato.
    public ResponseEntity<?>  insertar(User userNew) {
        if(camposUnicosYnoNulos(userNew).getStatusCode().is4xxClientError()){
            return camposUnicosYnoNulos(userNew);
        }
        userNew.setPassword(encoder.encode(userNew.getPassword()));
        usuarioRepository.save(userNew);
        return ResponseEntity.ok(userNew);
    }

    //Put que se encarga de actualizar los campos de los datos, solo los que vengan en el requestBody.
    public ResponseEntity<?> actualizar(User user) {
        Optional<User> optionalUsuario = usuarioRepository.findById(user.getId());
        if (optionalUsuario.isEmpty()) {
          return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: El usuario no ha sido encontrado"));
        }
        User usuarioEditado = optionalUsuario.get();
        copiarCamposNoNulos(user, usuarioEditado);
        return ResponseEntity.ok(usuarioRepository.save(usuarioEditado));
    }

    //Get que trae los datos paginagos
    public ResponseEntity<?> listarTodos(Pageable pageable) {
        Page<User> usersPage = usuarioRepository.findByEstado(pageable);
        return ResponseEntity.ok(usersPage);
    }

    //Get que trae todos los roles para asi guardarlo en un usuario al crear uno nuevo.
    public ResponseEntity<?> listarAllRoles() {
        List<Role> roles = roleRepository.findAllRoles();
        return ResponseEntity.ok(roles);
    }

    //Get que trae los datos por id
    public ResponseEntity<?> listarById(Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: El usuario no ha sido encontrado"));
        }
        return ResponseEntity.ok(usuarioRepository.findById(id).get());
    }

    //Put que elimnado logico del dato al recibir el id por pathVariable
    public ResponseEntity<?> eliminar(Long id, Pageable pageable) {
        usuarioRepository.deleteById(id);
        Page<User> usersPage = usuarioRepository.findByEstado(pageable);
        return ResponseEntity.ok(usersPage);
    }
    
    //Get que devuelve usuarios que contengan el rol que se pasa como string en un pathVariable
    public ResponseEntity<?> listarUsuariosPorRoles(String roles) {
        List<User> usuarios = usuarioRepository.findByRoles(roles);
        if (usuarios.isEmpty()) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: No se encontraron usuarios con el rol: " + roles));
        }
        return ResponseEntity.ok(usuarios);
    }

    //en la ruta /api/auth/signup va a guardar nuevo usuario
    public ResponseEntity<?> registrar(@Valid User signUpRequest) {
            
        if(camposUnicosYnoNulos(signUpRequest).getStatusCode().is4xxClientError()){
            return camposUnicosYnoNulos(signUpRequest);
        }
        Set<Role> strRoles = roleRepository.getRoleUser();
        signUpRequest.setRoles(strRoles);
        signUpRequest.setStatus("A");
        signUpRequest.setPassword(encoder.encode(signUpRequest.getPassword()));
        
        usuarioRepository.save(signUpRequest);
        
        return ResponseEntity.ok(new MessageResponse("Usuario registrado satisfactoriamente!"));
    }

    // metodo para cambiar la clave
    public ResponseEntity<?> editarContrasenia(Long id, Map<String, String> data) {
        Optional<User> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            User usuario = usuarioOptional.get();
            String clave = data.get("lastpassword");
            String claveNueva = data.get("newpassword");
            if (encoder.matches(clave, usuario.getPassword())) {
                usuario.setPassword(encoder.encode(claveNueva));
                usuarioRepository.save(usuario);
                return ResponseEntity.ok(new MessageResponse("Contraseña actualizada satisfactoriamente!"));
            } else {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Contraseña incorrecta!"));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Usuario no encontrado!"));
    }

    //Metodo para copiar campos no nulos
    private void copiarCamposNoNulos(User fuente, User destino) {
        if (fuente.getFirstname() != null) {
            destino.setFirstname(fuente.getFirstname());
        }
        if (fuente.getLastname() != null) {
            destino.setLastname(fuente.getLastname());
        }
        if (fuente.getEmail() != null) {
            destino.setEmail(fuente.getEmail());
        }
        if (fuente.getPassword() != null) {
            destino.setPassword(encoder.encode(fuente.getPassword()));
        }
        if (fuente.getRoles().size() > 0) {
        destino.setRoles(fuente.getRoles());
        }
        if (fuente.getStatus() != null) {
            destino.setStatus(fuente.getStatus());
        }
    }

    //Metodo para verificar email, usuario existente y campos vacios
    private ResponseEntity<?> camposUnicosYnoNulos(User user) {
        if (usuarioRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Usuario utilizado anteriormente!, prueba con otro nombre de usuario."));
        }
        if (usuarioRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Email ya utilizado anteriormente! prueba con otro email."));
        }
        if (user.getUsername() == null || user.getEmail() == null || 
        user.getLastname() == null || user.getFirstname() == null || 
        user.getPassword() == null) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Campos vacios!"));
        }
        return ResponseEntity.ok(user);
    }

}
