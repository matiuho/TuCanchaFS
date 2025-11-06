/* eslint-disable react-refresh/only-export-components */
// Cart context: simple cart stored in memory (React state)
import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode, FC, Dispatch, SetStateAction } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';

export interface CartItem extends CanchaProps {
  quantity: number;
}

interface CartContextType {
  carrito: CartItem[];
  addToCart: (item: CanchaProps, quantity?: number) => void;
  removeFromCart: (canchaId: number) => void;
  clearCart: () => void;
  increaseQuantity: (canchaId: number) => void;
  decreaseQuantity: (canchaId: number) => void;
  totalItems: number;
  subtotal: number;
  setCarrito: Dispatch<SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const addToCart = (item: CanchaProps, quantity: number = 1) => {
    setCarrito(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeFromCart = (canchaId: number) => {
    setCarrito(prevItems => prevItems.filter(item => item.id !== canchaId));
  };

  const increaseQuantity = (canchaId: number) => {
    setCarrito(prevItems =>
      prevItems.map(item => (item.id === canchaId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (canchaId: number) => {
    setCarrito(prevItems =>
      prevItems.map(item => (item.id === canchaId ? { ...item, quantity: item.quantity - 1 } : item)).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCarrito([]);

  const { totalItems, subtotal } = useMemo(() => {
    return carrito.reduce(
      (acc, item) => {
        const pricePerHour = item.enOferta && item.precioOferta ? item.precioOferta : item.precioHora;
        acc.totalItems += item.quantity;
        acc.subtotal += pricePerHour * item.quantity;
        return acc;
      },
      { totalItems: 0, subtotal: 0 }
    );
  }, [carrito]);

  const value: CartContextType = {
    carrito,
    setCarrito,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    subtotal,
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