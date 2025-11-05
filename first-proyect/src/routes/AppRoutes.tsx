import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CartPage } from '../pages/CartPage';
import { CanchaDetail } from '../pages/CanchaDetail';
import { BlogPage } from '../pages/BlogPage';
import { BlogDetail } from '../pages/BlogDetail';
import { CategoryPage } from '../pages/CategoryPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cancha/:id" element={<CanchaDetail />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
};