package com.eventos.infrastructure.adapters.controllers;

import com.eventos.infrastructure.adapters.controllers.dto.AdminLoginRequest;
import com.eventos.model.Admin;
import com.eventos.infrastructure.adapters.output.persistence.AdminRepository;
import com.eventos.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername());
        if (admin != null && admin.getPassword().equals(request.getPassword())) {
            String token = JwtUtil.generateToken(admin.getUsername());
            return ResponseEntity.ok().body(java.util.Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }
}