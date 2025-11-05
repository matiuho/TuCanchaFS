// ===================================
// src/sharedComponents/components/ShoppingCartIcon.tsx
// ===================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContexts'; 

export const ShoppingCartIcon: React.FC = () => {
  // Accede al ESTADO GLOBAL del carrito
  const { totalItems } = useCart(); 

  return (
    <Link to="/carrito" style={{ textDecoration: 'none', color: 'inherit' }}> 
      <div style={{ position: 'relative', cursor: 'pointer', fontSize: '24px' }}>
        🛒
        {totalItems > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </Link> 
  );
};