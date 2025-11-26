// ===================================
// src/sharedComponents/components/ShoppingCartIcon.tsx
// ===================================
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContexts';
import type { FC } from 'react';
import '../../styles/components/ShoppingCartIcon.css';

export const ShoppingCartIcon: FC = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-icon-link">
      <div className="cart-icon">
        🛒
        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};