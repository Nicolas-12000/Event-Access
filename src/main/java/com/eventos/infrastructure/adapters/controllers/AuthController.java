package com.eventos.infrastructure.adapters.controllers;

import com.eventos.infrastructure.adapters.controllers.dto.AdminLoginRequest;
import com.eventos.model.Admin;
import com.eventos.infrastructure.adapters.output.persistence.AdminRepository;
import com.eventos.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername());
        if (admin != null && passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            String token = JwtUtil.generateToken(admin.getUsername());
            return ResponseEntity.ok().body(java.util.Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AdminLoginRequest request) {
        if (adminRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

          Admin admin = new Admin();
        admin.setUsername(request.getUsername());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        
        Admin savedAdmin = adminRepository.save(admin);

        String token = JwtUtil.generateToken(savedAdmin.getUsername());
        
        return ResponseEntity.ok().body(java.util.Map.of(
            "token", token,
            "username", savedAdmin.getUsername()
        ));
    }
}