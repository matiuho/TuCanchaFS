// src/main.tsx (Punto de Entrada)
// =============================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Importa el contenedor App
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContexts';
import { ToastProvider } from './sharedComponents/components/ToastProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);