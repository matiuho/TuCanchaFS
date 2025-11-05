// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
import { HomePage } from '../pages/HomePage';
import { CanchaDetail } from '../pages/CanchaDetail';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detalle-cancha" element={<CanchaDetail />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
      <Route path="/carrito" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
