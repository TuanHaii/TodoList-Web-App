-- Reset AUTO_INCREMENT
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE todo_items AUTO_INCREMENT = 1;

-- Tạo bảng roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm cột role_id vào bảng users (nếu chưa có)
ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id BIGINT DEFAULT 1;

-- Thêm foreign key constraint
ALTER TABLE users ADD CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles(id);

-- Xóa cột role cũ nếu tồn tại
ALTER TABLE users DROP COLUMN IF EXISTS role;

-- Tạo dữ liệu mẫu cho roles
INSERT INTO roles (id, name, description, created_at) VALUES
(1, 'USER', 'Người dùng thông thường', '2025-08-20 10:00:00'),
(2, 'ADMIN', 'Quản trị viên hệ thống', '2025-08-20 10:00:00'),
(3, 'MODERATOR', 'Người kiểm duyệt', '2025-08-20 10:00:00');

-- Tạo dữ liệu mẫu cho users (mật khẩu đã được mã hóa BCrypt)
-- password123 -> $2a$10$8u7KgtNkrAk1ZvqYk/I9O.6JBslxmwjBvRUKBOYDkPHWvttqWkDkO
-- admin123 -> $2a$10$/MJsUcuAQoaZVVhNnkDAtepokVm0J8K8bTxlc/1Sl8ctLikMVjPrW
-- john123 -> $2a$10$OSJYxN1CC5eMsmce3ENS2eGtjEEWrghcist8bS9D28yqL1BteOeOq
INSERT INTO users (id, username, email, password, full_name, created_at, role_id) VALUES
(1, 'testuser', 'test@example.com', '$2a$10$8u7KgtNkrAk1ZvqYk/I9O.6JBslxmwjBvRUKBOYDkPHWvttqWkDkO', 'Test User', '2025-08-20 10:00:00', 1),
(2, 'admin', 'admin@example.com', '$2a$10$/MJsUcuAQoaZVVhNnkDAtepokVm0J8K8bTxlc/1Sl8ctLikMVjPrW', 'Administrator', '2025-08-20 10:00:00', 2),
(3, 'john', 'john@example.com', '$2a$10$OSJYxN1CC5eMsmce3ENS2eGtjEEWrghcist8bS9D28yqL1BteOeOq', 'John Doe', '2025-08-20 10:00:00', 1);

-- Tạo dữ liệu mẫu cho categories (sử dụng tên bảng số nhiều và bao gồm created_at)
INSERT INTO categories (id, name, description, color, created_at) VALUES
(1, 'Work', 'Công việc', '#FF5733', '2025-08-20 10:00:00'),
(2, 'Personal', 'Cá nhân', '#33FF57', '2025-08-20 10:00:00'),
(3, 'Study', 'Học tập', '#3357FF', '2025-08-20 10:00:00'),
(4, 'Shopping', 'Mua sắm', '#FF33F5', '2025-08-20 10:00:00');

-- Tạo một số todo items mẫu (sử dụng tên bảng "todo_items" và bao gồm description)
INSERT INTO todo_items (id, title, description, completed, user_id, category_id) VALUES
(1, 'Hoàn thành dự án', 'Hoàn thành dự án todolist Spring Boot', false, 1, 1),
(2, 'Mua sữa', 'Mua sữa về nhà cho cả tuần', false, 1, 4),
(3, 'Học Spring Boot', 'Đọc tài liệu và làm bài tập Spring Boot', true, 2, 3),
(4, 'Meeting với team', 'Họp review dự án lúc 2pm', false, 2, 1),
(5, 'Tập thể dục', 'Chạy bộ 30 phút ở công viên', false, 3, 2);
