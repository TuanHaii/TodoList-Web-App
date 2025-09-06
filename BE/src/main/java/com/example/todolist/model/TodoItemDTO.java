//Entity Todo ánh xạ với bảng todo trong cơ sở dữ liệu
package com.example.todolist.model;

public class TodoItemDTO {
    // DTO này sẽ ẩn chi tiết entity chỉ trả về thông tin cần thiết cho client
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private String username;
    private String category;

    // Constructors
    public TodoItemDTO() {}

    public TodoItemDTO(Long id, String title, String description, boolean completed, String username, String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.username = username;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}