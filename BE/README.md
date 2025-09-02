src/
├── main/
│   ├── java/com/example/todolist/
TodoList API - Backend

Dự án TodoList API sử dụng Spring Boot cung cấp các API cho ứng dụng quản lý công việc.

## Yêu cầu
- Java 17+
- Maven

## Cách chạy
```bash
./mvnw spring-boot:run
```
API sẽ chạy tại: `http://localhost:8080`

## Tài liệu
- [HELP.md](HELP.md): Hướng dẫn sử dụng
- [TodoList_API_Tests.postman_collection.json](TodoList_API_Tests.postman_collection.json): Bộ test API

## Tính năng
- Đăng nhập/Đăng ký
- Quản lý công việc (CRUD)
- Bảo vệ API bằng JWT
│   │   ├── TodolistApplication.java          # Main application class
│   │   ├── config/
│   │   │   └── SecurityConfig.java           # Cấu hình Spring Security
│   │   ├── controller/
│   │   │   ├── PageController.java           # Controller cho các trang
│   │   │   └── TodoController.java           # Controller cho Todo CRUD
│   │   ├── model/
│   │   │   └── Todo.java                     # Entity Todo
│   │   ├── repository/
│   │   │   └── TodoRepository.java           # Repository layer
│   │   └── service/
│   │       └── TodoService.java              # Business logic layer
│   └── resources/
│       ├── application.properties            # Cấu hình ứng dụng
│       ├── data.sql                         # Dữ liệu mẫu
│       ├── static/                          # CSS, JS, images
│       │   ├── css/style.css
│       │   └── js/app.js
│       └── templates/                       # Thymeleaf templates
│           ├── index.html                   # Trang chính
│           ├── login.html                   # Trang đăng nhập
│           └── fragments/                   # Fragments tái sử dụng
│               ├── header.html
│               └── footer.html
└── test/
    └── java/com/example/todolist/           # Unit tests
```

## 🚀 Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống

- Java 24 hoặc cao hơn
- Maven 3.6+
- MySQL 8.0+

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd todolist
```

### Bước 2: Cài đặt cơ sở dữ liệu

1. Tạo database MySQL:
```sql
CREATE DATABASE todolist_db;
```

2. Cập nhật cấu hình database trong `src/main/resources/application.properties`:
```properties
spring.application.name=todolist

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/todolist_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=8080
```

### Bước 3: Chạy ứng dụng

#### Sử dụng Maven Wrapper (Linux/Mac):
```bash
./mvnw spring-boot:run
```

#### Sử dụng Maven Wrapper (Windows):
```bash
mvnw.cmd spring-boot:run
```

#### Hoặc sử dụng Maven:
```bash
mvn spring-boot:run
```

### Bước 4: Truy cập ứng dụng

Mở trình duyệt và truy cập: `http://localhost:8080`

## 🔧 Cấu hình

### Security Configuration
Ứng dụng sử dụng Spring Security với OAuth2 client. Cấu hình chi tiết có thể tìm thấy trong `SecurityConfig.java`.

### Database Configuration
- Ứng dụng sử dụng MySQL làm cơ sở dữ liệu chính
- JPA/Hibernate để ORM
- File `data.sql` chứa dữ liệu mẫu sẽ được load khi khởi động

## 🧪 Testing

Chạy tests:
```bash
./mvnw test
```

Ứng dụng sử dụng:
- **Spring Boot Test** - Integration testing
- **Testcontainers** - Container-based testing với MySQL
- **Spring Security Test** - Testing security features

## 📝 API Endpoints

### Web Pages
- `GET /` - Trang chính (danh sách todo)
- `GET /login` - Trang đăng nhập

### Todo Management
- `GET /todos` - Lấy danh sách todos
- `POST /todos` - Tạo todo mới
- `PUT /todos/{id}` - Cập nhật todo
- `DELETE /todos/{id}` - Xóa todo

## 🎨 Frontend

- **Thymeleaf** templates cho server-side rendering
- **CSS** tùy chỉnh trong `static/css/style.css`
- **JavaScript** cho tương tác client-side trong `static/js/app.js`
- Responsive design

## 🔒 Security Features

- Xác thực người dùng
- OAuth2 integration
- CSRF protection
- Session management
- Role-based access control

## 📖 Development

### Thêm feature mới

1. Tạo entity trong `model/`
2. Tạo repository trong `repository/`
3. Implement business logic trong `service/`
4. Tạo controller trong `controller/`
5. Tạo template trong `templates/`
6. Viết tests trong `test/`

### Hot Reload

Ứng dụng sử dụng Spring Boot DevTools để hot reload trong quá trình development.

## 📜 License

Dự án demo cho mục đích học tập.

## 👥 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request