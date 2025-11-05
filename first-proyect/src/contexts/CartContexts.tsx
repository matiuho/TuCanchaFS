// Cart context: simple cart stored in memory (React state)
import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode, FC, Dispatch, SetStateAction } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';

export interface CartItem extends CanchaProps {
  quantity: number;
}

interface CartContextType {
  carrito: CartItem[];
  addToCart: (cancha: CanchaProps | CartItem) => void;
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

  const addToCart = (cancha: CanchaProps | CartItem) => {
    setCarrito(prev => {
      const existingItem = prev.find(item => item.id === cancha.id);
      if (existingItem) {
        // Si ya existe, actualiza la cantidad.
        // Si el item que llega ya tiene cantidad, la usa, si no, la incrementa en 1.
        const newQuantity = 'quantity' in cancha ? existingItem.quantity + cancha.quantity : existingItem.quantity + 1;
        return prev.map(item =>
          item.id === cancha.id ? { ...item, quantity: newQuantity } : item
        );
      }
      // Si es nuevo, lo añade. Si ya tiene cantidad, la respeta, si no, la pone en 1.
      const newItem = 'quantity' in cancha ? cancha as CartItem : { ...cancha, quantity: 1 };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (canchaId: number) => {
    setCarrito(prev => prev.filter(item => item.id !== canchaId));
  };

  const increaseQuantity = (canchaId: number) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === canchaId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (canchaId: number) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === canchaId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0) // Opcional: eliminar si la cantidad es 0
    );
  };

  const clearCart = () => setCarrito([]);

  const { totalItems, subtotal } = useMemo(() => {
    return carrito.reduce((acc, item) => {
      const price = item.enOferta && item.precioOferta ? item.precioOferta : item.precioHora;
      acc.totalItems += item.quantity;
      acc.subtotal += price * item.quantity;
      return acc;
    }, { totalItems: 0, subtotal: 0 });
  }, [carrito]);

  const value: CartContextType = {
    carrito,
    setCarrito,
    addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity,
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