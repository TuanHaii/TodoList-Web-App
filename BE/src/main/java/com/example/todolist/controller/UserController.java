package com.example.todolist.controller;

import com.example.todolist.model.UserDTO;
import com.example.todolist.service.JwtService;
import com.example.todolist.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    // Constructor thủ công thay vì @AllArgsConstructor
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // Get/api/user/profile - Lấy thông tin user từ token
    @GetMapping("/profile")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        try {
            String username = authentication.getName();
            UserDTO userDTO = userService.findByUsername(username);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", userDTO,
                    "message", "Lấy thông tin user thành công"
            ));
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));

        }

    }
}
