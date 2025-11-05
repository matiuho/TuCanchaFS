// ===================================
// src/contexts/CartContexts.tsx
// ===================================
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';

interface CartContextType {
  carrito: CanchaProps[];
  addToCart: (cancha: CanchaProps) => void;
  removeFromCart: (canchaId: number) => void;
  clearCart: () => void;
  totalItems: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// El componente Provider que manejará el estado
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CanchaProps[]>([]);

  const addToCart = (cancha: CanchaProps) => {
    if (carrito.some(item => item.id === cancha.id)) {
      alert(`${cancha.nombre} ya está en el carrito.`);
      return;
    }
    setCarrito(prev => [...prev, cancha]);
  };

  const removeFromCart = (canchaId: number) => {
    setCarrito(prev => prev.filter(item => item.id !== canchaId));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const totalItems = carrito.length;
  const total = carrito.reduce((sum, item) => sum + item.precioHora, 0);

  return (
    <CartContext.Provider value={{ 
      carrito, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      totalItems, 
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};