// src/sharedComponents/components/CartSummary.tsx
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContexts';

export const CartSummary: FC = () => {
  const { carrito, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = carrito.reduce((s, c) => s + c.precioHora, 0);

  return (
    <div className="cart-summary" style={{ minWidth: 280 }}>
      <h3>Tu carrito</h3>
      {carrito.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>Sin items aún. Agrega una cancha.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {carrito.map((it, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fff', padding: 8, borderRadius: 8 }}>
              <img src={it.imagenUrl} alt={it.nombre} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.nombre}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>{it.tipo} • {it.capacidad} pers</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>${it.precioHora.toLocaleString('es-CL')}</div>
                <button className="btn secondary small" onClick={() => removeFromCart(idx)}>Quitar</button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <strong>Total</strong>
            <div style={{ fontWeight: 800 }}>${total.toLocaleString('es-CL')}</div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn small" onClick={() => navigate('/carrito')}>Ver carrito</button>
            <button className="btn secondary small" onClick={() => clearCart()}>Vaciar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
