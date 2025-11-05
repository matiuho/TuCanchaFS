// ===================================
// src/contexts/CartContexts.tsx
// ===================================
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CanchaProps } from '../interfaces/cancha.interface';

interface CartContextType {
  carrito: CanchaProps[];
  addToCart: (cancha: CanchaProps) => void;
  totalItems: number;
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

  const totalItems = carrito.length;

  return (
    <CartContext.Provider value={{ carrito, addToCart, totalItems }}>
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