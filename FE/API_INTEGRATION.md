# API Integration Guide

## Tổng quan

Ứng dụng đã được cấu trúc lại để sử dụng API thực từ Backend thay vì mock data. Tất cả dữ liệu người dùng và tasks đều được gọi từ API.

## Cấu hình API

### 1. Environment Variables

Tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật `VITE_API_URL` trong `.env.local`:

```
VITE_API_URL=http://localhost:3000/api
```

### 2. API Endpoints

Ứng dụng expect các endpoint sau:

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

#### Users  
- `GET /api/users/profile` - Lấy thông tin user
- `PUT /api/users/update` - Cập nhật profile

#### Tasks
- `GET /api/tasks` - Lấy danh sách tasks
- `GET /api/tasks/:id` - Lấy task theo ID
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks/:id` - Cập nhật task
- `DELETE /api/tasks/:id` - Xóa task

### 3. API Response Format

Tất cả API responses phải follow format:

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
}
```

### 4. Authentication

- Sử dụng Bearer token trong header: `Authorization: Bearer <token>`
- Token được lưu trong localStorage
- Auto redirect về `/login` nếu token expired (401)

## Data Types

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed' | 'Urgent';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
```

## Features Implemented

### 1. Authentication
- ✅ Login với email/password
- ✅ Register với name/email/password  
- ✅ Auto logout khi token expired
- ✅ Auth guard cho protected routes
- ✅ Loading states và error handling

### 2. Tasks Management
- ✅ Hiển thị danh sách tasks từ API
- ✅ Real-time search tasks
- ✅ Update task status
- ✅ Delete tasks
- ✅ Task statistics
- ✅ Loading skeletons
- ✅ Error handling

### 3. User Profile
- ✅ Hiển thị thông tin user trong sidebar
- ✅ Avatar fallback với initials
- ✅ User data từ API

## React Query Integration

Sử dụng TanStack Query cho:
- ✅ Caching API responses
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Loading và error states
- ✅ Query invalidation

## Error Handling

- ✅ Network errors
- ✅ Authentication errors (401)
- ✅ Validation errors
- ✅ User-friendly error messages
- ✅ Toast notifications

## Security

- ✅ Token-based authentication
- ✅ Auto logout on token expiry
- ✅ Protected routes with AuthGuard
- ✅ Secure API requests

## Chạy ứng dụng

1. Install dependencies:
```bash
npm install
```

2. Cấu hình environment:
```bash
cp .env.example .env.local
# Cập nhật VITE_API_URL
```

3. Start development server:
```bash
npm run dev
```

## Backend Requirements

Backend cần implement:
1. JWT authentication
2. CRUD operations cho Users và Tasks
3. Proper error handling và status codes
4. CORS configuration cho frontend domain
5. Rate limiting và security headers

## Testing với Mock API

Nếu chưa có Backend, có thể sử dụng tools như:
- JSON Server
- MSW (Mock Service Worker)  
- Mockoon
- Postman Mock Server
