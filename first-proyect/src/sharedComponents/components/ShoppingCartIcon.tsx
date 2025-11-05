// ===================================
// src/sharedComponents/components/ShoppingCartIcon.tsx
// ===================================
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContexts';
import type { FC } from 'react';

export const ShoppingCartIcon: FC = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', cursor: 'pointer', fontSize: '24px', color: 'white' }}>
        🛒
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute', top: '-8px', right: '-10px',
              backgroundColor: 'white', color: 'var(--topbar)', borderRadius: '50%',
              padding: '1px 6px', fontSize: '11px', fontWeight: 'bold',
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};