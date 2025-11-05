// ===================================
// src/contexts/CartContexts.tsx (CORREGIDO)
// ===================================
import { createContext, useContext, useState } from 'react';
import type { ReactNode, FC } from 'react'; // tipos
import type { CanchaProps } from '../interfaces/cancha.interface';

interface CartContextType {
  carrito: CanchaProps[];
  addToCart: (cancha: CanchaProps) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CanchaProps[]>([]);

  const addToCart = (cancha: CanchaProps) => {
    setCarrito(prev => [...prev, cancha]);
  };

  const removeFromCart = (index: number) => {
    setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCarrito([]);

  const value: CartContextType = {
    carrito,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems: carrito.length,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};