package com.example.todolist.controller;

import com.example.todolist.model.UserDTO;
import com.example.todolist.service.JwtService;
import com.example.todolist.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.example.todolist.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    
    // POST /api/auth/login - Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Username và password không được để trống"
            ));
        }
        boolean isValid = userService.validateUser(username, password);
        
        if (isValid) {
            // Generate JWT token
            String token = jwtService.generateToken(username);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                    "user", Map.of(
                        "username", username,
                        "email", userService.findByUsername(username).getEmail()
                    ),
                    "token", token
                ),
                "message", "Đăng nhập thành công"
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "error", "Tên đăng nhập hoặc mật khẩu không đúng"
            ));
        }
    }
    // POST /api/auth/register - Đăng ký
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody UserDTO userDTO) {
        try {
            // Kiểm tra các trường bắt buộc
            if (userDTO.getUsername() == null || userDTO.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Username không được để trống"
                ));
            }

            if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Password không được để trống"
                ));
            }

            if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Email không được để trống"
                ));
            }

            // Kiểm tra username đã tồn tại chưa
            try {
                userService.findByUsername(userDTO.getUsername());
                // Nếu tìm thấy user thì username đã tồn tại
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Username đã tồn tại"
                ));
            } catch (RuntimeException e) {
                // Username chưa tồn tại, tiếp tục đăng ký
            }

            // Đăng ký user mới
            String result = userService.addUser(userDTO);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", result,
                "data", Map.of(
                    "username", userDTO.getUsername(),
                    "email", userDTO.getEmail(),
                    "fullName", userDTO.getFullName() != null ? userDTO.getFullName() : ""
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "Đăng ký thất bại: " + e.getMessage()
            ));
        }
    }
    // POST /api/auth/generateToken - Generate JWT Token
    @PostMapping("/generateToken")
    public ResponseEntity<Map<String, String>> authenticateAndGetToken(@RequestBody User authRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            if(authentication.isAuthenticated()){
                String token = jwtService.generateToken(authRequest.getUsername());
                return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", authRequest.getUsername(),
                    "message", "Token generated successfully"
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Authentication failed"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
    }
    @GetMapping("/check")
    public ResponseEntity<Map<String, String>> checkAuth() {
        return ResponseEntity.ok(Map.of(
            "status", "authenticated",
            "message", "API đang hoạt động"
        ));
    }
}
