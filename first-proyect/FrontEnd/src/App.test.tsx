import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import App from './App';
import AuthContext from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContexts';

// Helper para envolver el App con un AuthContext y CartProvider simulados
function renderWithAuth(ui: ReactNode, value: any) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <AuthContext.Provider
        value={{
          user: null,
          login: vi.fn(),
          logout: vi.fn(),
          register: vi.fn(),
          isAdmin: () => false,
          loading: false,
          ...value,
        }}
      >
        <CartProvider>{ui}</CartProvider>
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

// Conjunto de pruebas de integración básica para el componente App
describe('App', () => {
  // Verifica que en rutas no admin se vea el topbar con los enlaces principales
  test('muestra el topbar público con links principales cuando no es ruta admin', () => {
    renderWithAuth(<App />, { user: null });

    expect(screen.getByText('TuCancha')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Blog')).toBeTruthy();
    expect(screen.getByText('Quienes somos')).toBeTruthy();
    expect(screen.getByText('Contacto')).toBeTruthy();
  });

  // Verifica que, sin usuario autenticado, se muestren los botones Login y Register
  test('muestra botones de Login y Register cuando el usuario no está autenticado', () => {
    renderWithAuth(<App />, { user: null });

    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
  });

  // Verifica que, con usuario autenticado, se muestre su email y el botón Salir
  test('muestra el email del usuario y botón de salir cuando está autenticado', () => {
    const logout = vi.fn();

    renderWithAuth(<App />, {
      user: { email: 'test@example.com', role: 'USER' } as any,
      logout,
    });

    expect(screen.getByText(/Hola, test@example.com/)).toBeTruthy();
    expect(screen.getByText('Salir')).toBeTruthy();
  });
});


