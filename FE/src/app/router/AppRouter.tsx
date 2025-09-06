import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/features/home/pages/HomePage.tsx';
import { LoginPage } from '@/features/auth/pages/LoginPage.tsx';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage.tsx';
import { NotFoundPage } from '@/shared/components/NotFoundPage.tsx';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
