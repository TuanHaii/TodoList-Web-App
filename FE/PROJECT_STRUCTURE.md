# Project Structure

Cấu trúc dự án đã được tối ưu hóa theo mô hình **feature-based architecture**:

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # Application layer
│   ├── providers/          # Global providers (QueryClient, Theme, etc.)
│   └── router/             # Application routing configuration
├── features/               # Feature modules
│   ├── auth/               # Authentication feature
│   │   ├── components/     # Auth-specific components
│   │   ├── hooks/          # Auth-specific hooks
│   │   └── pages/          # Auth pages (Login, Register, etc.)
│   ├── dashboard/          # Dashboard feature
│   │   ├── components/     # Dashboard components
│   │   ├── hooks/          # Dashboard hooks
│   │   └── pages/          # Dashboard pages
│   └── home/               # Home feature
│       └── pages/          # Home pages
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Global hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # Application constants
│   └── services/           # API services and external integrations
└── styles/                 # Global styles
```

## 🎯 Nguyên tắc tổ chức

### 1. **Feature-Based Organization**
- Mỗi feature là một module độc lập
- Chứa tất cả components, hooks, pages liên quan
- Dễ dàng scale và maintain

### 2. **Separation of Concerns**
- `app/`: Cấu hình ứng dụng (providers, router)
- `features/`: Logic nghiệp vụ theo tính năng
- `shared/`: Tài nguyên dùng chung

### 3. **Clear Import Paths**
```tsx
// Feature components
import { LoginPage } from '@/features/auth';

// Shared components
import { Button } from '@/shared/components/ui/button';

// Types and constants
import { User } from '@/shared/types';
import { API_ENDPOINTS } from '@/shared/constants';
```

## 🚀 Lợi ích

1. **Scalability**: Dễ dàng thêm features mới
2. **Maintainability**: Code được tổ chức rõ ràng theo chức năng
3. **Reusability**: Components và hooks được tái sử dụng hiệu quả
4. **Team Collaboration**: Nhiều dev có thể làm việc parallel trên các features khác nhau
5. **Performance**: Tree-shaking tốt hơn, bundle size nhỏ hơn

## 📋 Import Guidelines

### Absolute imports (Preferred)
```tsx
import { Button } from '@/shared/components/ui/button';
import { LoginPage } from '@/features/auth/pages/LoginPage';
```

### Feature exports
```tsx
// features/auth/index.ts
export * from './pages';
export * from './components';
export * from './hooks';
```

## 🔧 Development Guidelines

1. **Creating new features**: Tạo thư mục trong `src/features/`
2. **Shared components**: Đặt trong `src/shared/components/`
3. **Types**: Định nghĩa trong `src/shared/types/`
4. **Constants**: Định nghĩa trong `src/shared/constants/`
5. **API calls**: Sử dụng services trong `src/shared/services/`
