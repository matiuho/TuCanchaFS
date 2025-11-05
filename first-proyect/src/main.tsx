// src/main.tsx (Punto de Entrada)
// =============================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Importa el contenedor App

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* Envuelve toda la aplicación en el BrowserRouter */}
    </BrowserRouter>
  </StrictMode>,
);