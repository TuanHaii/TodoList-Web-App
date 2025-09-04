package com.example.todolist.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID định danh duy nhất cho mỗi User

    @Column(unique = true, nullable = false)
    private String username; // Tên đăng nhập (phải unique)

    @Column(nullable = false)
    private String password; // Mật khẩu

    @Column(unique = true, nullable = false)
    private String email; // Email (phải unique)

    private String fullName; // Họ tên đầy đủ

    @CreationTimestamp // Tự động set thời gian tạo khi insert record mới
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Thời gian tạo user

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role; // Reference đến bảng roles

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TodoItem> todoItems; // Danh sách todo items thuộc user này

    // Constructors
    public User() {}

    public User(String username, String password, String email, String fullName, Role role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public List<TodoItem> getTodoItems() { return todoItems; }
    public void setTodoItems(List<TodoItem> todoItems) { this.todoItems = todoItems; }
}
