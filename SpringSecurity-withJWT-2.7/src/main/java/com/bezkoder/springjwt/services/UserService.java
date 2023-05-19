package com.bezkoder.springjwt.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

    public ResponseEntity<?>  insertar(User user) {
        if(camposUnicosYnoNulos(user).getStatusCode().is4xxClientError()){
            return camposUnicosYnoNulos(user);
        }
        user.setPassword(encoder.encode(user.getPassword()));
        usuarioRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Usuario registrado satisfactoriamente!"));
    }

    public User actualizar(User user) {
        Optional<User> optionalUsuario = usuarioRepository.findById(user.getId());
        if (optionalUsuario.isEmpty()) {
            return null;
        }
        User usuarioEditado = optionalUsuario.get();
        copiarCamposNoNulos(user, usuarioEditado);
        return usuarioRepository.save(usuarioEditado);
    }

    public List<User> listarTodos() {
        return usuarioRepository.findByEstado();
    }
    public List<Role> listarAllRoles() {
        return roleRepository.findAllRoles();
    }

    public User listarById(Long id) {
        return usuarioRepository.findById(id).get();
    }

    public List<User> eliminar(Long id) {
        usuarioRepository.deleteById(id);
        return usuarioRepository.findByEstado();
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
            .body(new MessageResponse("Error: Usuario utilizado anteriormente!"));
        }
        if (usuarioRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Email ya utilizado anteriormente!"));
        }
        if (user.getUsername() == null || user.getEmail() == null || 
        user.getLastname() == null || user.getFirstname() == null || 
        user.getPassword() == null) {
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Campos vacios!"));
        }
        return ResponseEntity.ok(new MessageResponse("Usuario registrado satisfactoriamente!"));
    }

    

}
