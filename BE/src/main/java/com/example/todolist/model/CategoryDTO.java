package com.example.todolist.model;
import java.time.LocalDateTime;

public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt; // Thời gian tạo category
    private String color; // Hex color code for the category

    // Constructors
    public CategoryDTO() {}

    public CategoryDTO(Long id, String name, String description, LocalDateTime createdAt, String color) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.color = color;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
