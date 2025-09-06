package com.example.todolist.service;

import com.example.todolist.entity.User;
import com.example.todolist.entity.Role;
import com.example.todolist.model.UserDTO;
import com.example.todolist.repository.UserRepository;
import com.example.todolist.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Tim kiem user theo username
    public UserDTO findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    // Kiem tra user da ton tai theo username
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    // Liet ke tat ca user
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Add user moi - Sửa logic role assignment
    public String addUser(UserDTO userDTO) {
        // Tạo User entity từ DTO
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFullName(userDTO.getFullName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Tìm và set role (mặc định là USER nếu không có)
        String roleName = userDTO.getRole() != null ? userDTO.getRole() : "USER";
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.findByName("USER")
                        .orElseThrow(() -> new RuntimeException("Default USER role not found")));
        user.setRole(role);

        userRepository.save(user);
        return "User registered successfully";
    }

    // Xác thực user (kiểm tra đăng nhập)
    public boolean validateUser(String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(false);
    }

    // Method chuyển đổi từ User entity sang UserDTO
    private UserDTO mapToDTO(User user) {
        // Kiểm tra null để tránh NullPointerException
        if (user == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setFullName(user.getFullName());

        // Chuyển Role entity thành String cho DTO
        if (user.getRole() != null) {
            dto.setRole(user.getRole().getName());
        }

        return dto;
    }
}
