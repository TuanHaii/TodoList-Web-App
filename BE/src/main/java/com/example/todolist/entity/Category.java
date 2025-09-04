package com.example.todolist.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID định danh duy nhất cho mỗi category

    @Column(nullable = false, unique = true)
    private String name; // Tên category (Work, Personal, Shopping...)

    private String description; // Mô tả về category

    private String color; // Màu sắc đại diện (hex code: #FF5733)

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Thời gian tạo category

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TodoItem> todoItems; // Danh sách todo items thuộc category này

    // Constructors
    public Category() {}

    public Category(String name, String description, String color) {
        this.name = name;
        this.description = description;
        this.color = color;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<TodoItem> getTodoItems() { return todoItems; }
    public void setTodoItems(List<TodoItem> todoItems) { this.todoItems = todoItems; }
}