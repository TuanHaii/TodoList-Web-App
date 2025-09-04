// ánh xạ DB với table todo_items
package com.example.todolist.entity; // Khai báo package chứa các entity (thực thể) của ứng dụng todolist

import jakarta.persistence.*; // Import các annotation của JPA để làm việc với database
// import lombok.*; // Import tất cả annotation của Lombok để tự động tạo getter, setter, constructor

@Entity // Annotation đánh dấu class này là một entity JPA, ánh xạ với bảng trong database
@Table(name = "todo_items") // Sửa thành "todo_item" để khớp với bảng có sẵn
public class TodoItem { // Khai báo class TodoItem đại diện cho một nhiệm vụ trong danh sách todo

    @Id // Đánh dấu thuộc tính này là khóa chính (primary key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động sinh giá trị ID, sử dụng auto-increment của database
    private Long id; // Thuộc tính ID kiểu Long, định danh duy nhất cho mỗi todo item

    private String title; // Tiêu đề của todo item
    private boolean completed; // Trạng thái hoàn thành của todo item (true = đã hoàn thành, false = chưa hoàn thành)
    private String description; // Mô tả chi tiết về todo item

    @ManyToOne // Quan hệ nhiều-một: nhiều todo items có thể thuộc về một user
    @JoinColumn(name = "user_id") // Chỉ định cột foreign key trong bảng todo_items để liên kết với bảng users
    private User user; // Thuộc tính user - chủ sở hữu của todo item

    @ManyToOne // Quan hệ nhiều-một: nhiều todo items có thể thuộc về một category
    @JoinColumn(name = "category_id") // Chỉ định cột foreign key trong bảng todo_items để liên kết với bảng categories
    private Category category; // Thuộc tính category - danh mục của todo item

    // Constructors
    public TodoItem() {}

    public TodoItem(String title, String description, boolean completed, User user, Category category) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.user = user;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
