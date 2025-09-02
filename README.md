# TodoList Web App

Đây là dự án TodoList Web App gồm 2 phần:
- **BE**: Backend API sử dụng Spring Boot
- **FE**: Frontend ứng dụng web sử dụng React + Vite

## Cấu trúc thư mục

```
BE/        # Backend Spring Boot
FE/        # Frontend React Vite
```

## Hướng dẫn chạy dự án

### 1. Backend (BE)
- Yêu cầu: Java 17+, Maven
- Di chuyển vào thư mục `BE/`
- Chạy lệnh:
  ```bash
  ./mvnw spring-boot:run
  ```
- API sẽ chạy tại: `http://localhost:8080`

### 2. Frontend (FE)
- Yêu cầu: Node.js 18+, pnpm
- Di chuyển vào thư mục `FE/`
- Cài đặt dependencies:
  ```bash
  pnpm install
  ```
- Chạy ứng dụng:
  ```bash
  pnpm dev
  ```
- Ứng dụng sẽ chạy tại: `http://localhost:5173`

## Tính năng chính
- Đăng nhập/Đăng ký
- Quản lý công việc (CRUD)
- Bảo vệ route (AuthGuard)
- Giao diện hiện đại với TailwindCSS

## Tài liệu
- [API_INTEGRATION.md](FE/API_INTEGRATION.md): Tích hợp API FE-BE
- [PROJECT_STRUCTURE.md](FE/PROJECT_STRUCTURE.md): Cấu trúc FE
- [HELP.md](BE/HELP.md): Hướng dẫn BE

## Tác giả
- TuanHaii
