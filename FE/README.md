
# TodoList Frontend

Ứng dụng web TodoList được xây dựng với React, TypeScript, Vite và TailwindCSS, cung cấp giao diện người dùng hiện đại cho việc quản lý công việc.

## 📋 Mô tả

Frontend TodoList cung cấp giao diện thân thiện với các tính năng:
- Đăng nhập/Đăng ký người dùng
- Quản lý danh sách công việc (Thêm, sửa, xóa, hoàn thành)
- Bảo vệ route yêu cầu xác thực
- Responsive design trên mọi thiết bị
- Giao diện hiện đại với shadcn/ui components

## 🛠️ Công nghệ sử dụng

- **React 18** - Thư viện UI
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool nhanh
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **React Router** - Routing
- **React Query/SWR** - State management cho API
- **Axios** - HTTP client

## 📋 Yêu cầu hệ thống

- Node.js 18.0.0 hoặc cao hơn
- pnpm (khuyên dùng) hoặc npm/yarn

## 🚀 Cài đặt và chạy

### Cài đặt dependencies
```bash
pnpm install
```

### Chạy ở chế độ development
```bash
pnpm dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build cho production
```bash
pnpm build
```

### Preview build
```bash
pnpm preview
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App configuration
│   ├── App.tsx            # Root component
│   ├── providers/         # Context providers
│   └── router/            # App routing
├── features/              # Feature modules
│   ├── auth/              # Authentication
│   ├── dashboard/         # Dashboard
│   └── home/              # Home page
├── shared/                # Shared resources
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   └── types/             # TypeScript types
└── index.css              # Global styles
```

## 🔗 Tính năng chính

### Xác thực (Auth)
- Đăng nhập với email/password
- Đăng ký tài khoản mới
- Quản lý session và token
- Bảo vệ route với AuthGuard

### Quản lý công việc (Tasks)
- Tạo công việc mới
- Chỉnh sửa công việc
- Xóa công việc
- Đánh dấu hoàn thành
- Lọc và tìm kiếm công việc

### Giao diện (UI/UX)
- Responsive design
- Dark/Light mode
- Loading states
- Error handling
- Toast notifications

## 📖 Tài liệu

- [API_INTEGRATION.md](API_INTEGRATION.md) - Hướng dẫn tích hợp API
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Chi tiết cấu trúc dự án

## 🎨 Styling

Dự án sử dụng TailwindCSS với:
- Tất cả shadcn/ui components có sẵn tại `@/components/ui`
- Path alias `@/` trỏ đến thư mục `src/`
- Custom styles trong `src/index.css`
- Theme configuration trong `tailwind.config.ts`

## 🔧 Scripts có sẵn

```bash
pnpm dev          # Chạy development server
pnpm build        # Build cho production  
pnpm preview      # Preview production build
pnpm lint         # Chạy ESLint
pnpm type-check   # Kiểm tra TypeScript
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát triển cho mục đích học tập.
