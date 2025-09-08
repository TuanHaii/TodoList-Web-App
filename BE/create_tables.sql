-- Script tạo bảng cho TodoList Application
-- Chạy script này trong MySQL để tạo tất cả bảng cần thiết

-- Tạo database (nếu chưa có)
CREATE DATABASE IF NOT EXISTS todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todo_db;

-- Xóa bảng cũ nếu tồn tại (theo thứ tự dependency)
DROP TABLE IF EXISTS todo_items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS roles;

-- 1. Tạo bảng roles
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tạo bảng categories
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    color VARCHAR(7), -- Hex color code (#FF5733)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tạo bảng users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id BIGINT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- 4. Tạo bảng todo_items
CREATE TABLE todo_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Thêm indexes để tối ưu performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_todo_items_user_id ON todo_items(user_id);
CREATE INDEX idx_todo_items_category_id ON todo_items(category_id);
CREATE INDEX idx_todo_items_completed ON todo_items(completed);

-- Thêm dữ liệu mẫu
-- Roles
INSERT INTO roles (name, description) VALUES
('USER', 'Người dùng thông thường'),
('ADMIN', 'Quản trị viên hệ thống'),
('MODERATOR', 'Người kiểm duyệt');

-- Categories
INSERT INTO categories (name, description, color) VALUES
('Work', 'Công việc', '#FF5733'),
('Personal', 'Cá nhân', '#33FF57'),
('Study', 'Học tập', '#3357FF'),
('Shopping', 'Mua sắm', '#FF33F5');

-- Users (mật khẩu đã được mã hóa BCrypt)
-- password123 -> $2a$10$8u7KgtNkrAk1ZvqYk/I9O.6JBslxmwjBvRUKBOYDkPHWvttqWkDkO
-- admin123 -> $2a$10$/MJsUcuAQoaZVVhNnkDAtepokVm0J8K8bTxlc/1Sl8ctLikMVjPrW
-- john123 -> $2a$10$OSJYxN1CC5eMsmce3ENS2eGtjEEWrghcist8bS9D28yqL1BteOeOq
INSERT INTO users (username, email, password, full_name, role_id) VALUES
('testuser', 'test@example.com', '$2a$10$8u7KgtNkrAk1ZvqYk/I9O.6JBslxmwjBvRUKBOYDkPHWvttqWkDkO', 'Test User', 1),
('admin', 'admin@example.com', '$2a$10$/MJsUcuAQoaZVVhNnkDAtepokVm0J8K8bTxlc/1Sl8ctLikMVjPrW', 'Administrator', 2),
('john', 'john@example.com', '$2a$10$OSJYxN1CC5eMsmce3ENS2eGtjEEWrghcist8bS9D28yqL1BteOeOq', 'John Doe', 1);

-- Todo Items
INSERT INTO todo_items (title, description, completed, user_id, category_id) VALUES
('Hoàn thành dự án', 'Hoàn thành dự án todolist Spring Boot', FALSE, 1, 1),
('Mua sữa', 'Mua sữa về nhà cho cả tuần', FALSE, 1, 4),
('Học Spring Boot', 'Đọc tài liệu và làm bài tập Spring Boot', TRUE, 2, 3),
('Meeting với team', 'Họp review dự án lúc 2pm', FALSE, 2, 1),
('Làm bài tập', 'Hoàn thành bài tập Java', FALSE, 3, 3);

-- Hiển thị thông tin các bảng đã tạo
SHOW TABLES;
SELECT 'Roles created:' as Info;
SELECT * FROM roles;
SELECT 'Categories created:' as Info;
SELECT * FROM categories;
SELECT 'Users created:' as Info;
SELECT * FROM users;
SELECT 'Todo items created:' as Info;
SELECT * FROM todo_items;
