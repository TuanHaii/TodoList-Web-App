import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/features/home/pages/HomePage.tsx';
import { LoginPageSimple } from '@/features/auth/pages/LoginPageSimple.tsx';
import { DashboardPageSimple } from '@/features/dashboard/pages/DashboardPageSimple.tsx';
import { NotFoundPage } from '@/shared/components/NotFoundPage.tsx';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPageSimple />} />
        <Route path="/dashboard" element={<DashboardPageSimple />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
