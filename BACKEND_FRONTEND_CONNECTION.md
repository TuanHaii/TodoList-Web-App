# 🔗 Hướng dẫn kết nối Backend và Frontend

## 📋 Cấu hình đã thực hiện

### Backend (Spring Boot)
1. ✅ **CORS Configuration**: Cho phép frontend truy cập API
   - File: `BE/src/main/java/com/example/todolist/config/CorsConfig.java`
   - Allowed Origins: `http://localhost:5173` (Vite dev server)

2. ✅ **Security Configuration**: Cập nhật để hỗ trợ CORS
   - File: `BE/src/main/java/com/example/todolist/config/SecurityConfig.java`
   - Enabled CORS với custom configuration

3. ✅ **Server Port**: Backend chạy trên port `8080`
   - File: `BE/src/main/resources/application.properties`

### Frontend (React + Vite)
1. ✅ **API URL Configuration**: Trỏ đến backend
   - File: `FE/src/shared/services/api.ts`
   - Base URL: `http://localhost:8080/api`

2. ✅ **Environment Variables**: 
   - File: `FE/.env`
   - `VITE_API_URL=http://localhost:8080/api`

## 🚀 Cách chạy dự án

### 1. Chạy Backend
```bash
cd BE/
./mvnw spring-boot:run
```
- Backend sẽ chạy tại: `http://localhost:8080`
- API endpoints: `http://localhost:8080/api/*`

### 2. Chạy Frontend
```bash
cd FE/
pnpm install
pnpm dev
```
- Frontend sẽ chạy tại: `http://localhost:5173`

## 🔧 API Endpoints có sẵn

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/refresh` - Refresh token

### Todo Management
- `GET /api/todos` - Lấy danh sách todos
- `POST /api/todos` - Tạo todo mới
- `PUT /api/todos/{id}` - Cập nhật todo
- `DELETE /api/todos/{id}` - Xóa todo

### User Management
- `GET /api/users/profile` - Lấy thông tin user
- `PUT /api/users/profile` - Cập nhật thông tin user

## 🛠️ Kiểm tra kết nối

### 1. Kiểm tra Backend API
```bash
curl http://localhost:8080/api/health
```

### 2. Kiểm tra CORS
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8080/api/todos
```

### 3. Test API từ Frontend
Mở Developer Tools (F12) và kiểm tra Network tab khi thực hiện các action.

## ⚡ Troubleshooting

### CORS Error
- Kiểm tra Frontend URL trong `CorsConfig.java`
- Đảm bảo Backend đang chạy trước khi start Frontend

### Connection Refused
- Kiểm tra Backend có chạy trên port 8080 không
- Kiểm tra `VITE_API_URL` trong file `.env`

### JWT Token Issues
- Kiểm tra token được lưu trong localStorage
- Kiểm tra Authorization header trong API requests

## 📝 Next Steps

1. **Implement Authentication Flow**
   - Login/Register pages
   - Token management
   - Protected routes

2. **Implement Todo CRUD**
   - Todo list component
   - Add/Edit todo forms
   - Delete confirmation

3. **Error Handling**
   - API error responses
   - Loading states
   - User feedback

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
