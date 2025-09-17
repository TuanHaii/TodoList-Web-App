package com.example.todolist.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID định danh duy nhất cho mỗi notification

    @Column(name = "user_id", nullable = false)
    private Long userId; // ID của user nhận thông báo

    @Column(name = "title", nullable = false, length = 255)
    private String title; // Tiêu đề thông báo

    @Column(unique = true,nullable = false, length = 255, columnDefinition = "TEXT")
    private String message; // Nội dung thông báo

    @Column(name = "is_read", nullable = false)
    private boolean isRead = false; // Trạng thái đã đọc (true = đã đọc)

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt; // Thời gian cập nhật thông báo

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Thời gian tạo thông báo





}
