// src/pages/CartPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContexts';

export const CartPage: FC = () => {
  const { carrito, removeFromCart, clearCart } = useCart();

  const total = carrito.reduce((s, c) => s + c.precioHora, 0);

  // local UI state for promo code
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promo.toLowerCase() === 'descuento10') setDiscount(0.1);
    else alert('Código inválido');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <div className="cart-list">
          {carrito.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img src={item.imagenUrl} alt={item.nombre} style={{ width: 84, height: 64, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                <div style={{ color: 'var(--muted)' }}>{item.tipo} • {item.capacidad} personas</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>${item.precioHora.toLocaleString('es-CL')}</div>
                <button className="btn secondary" onClick={() => removeFromCart(idx)}>Eliminar</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Total:</strong>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>${total.toLocaleString('es-CL')}</div>
          </div>

          <div className="cart-actions">
            <button className="btn" onClick={() => alert('Proceso de checkout simulado')}>Pagar</button>
            <button className="btn secondary" onClick={() => clearCart()}>Vaciar carrito</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 18 }}>
        <h3>Resumen de la compra</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <input className="search-input" placeholder="Código promocional" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="btn small" onClick={applyPromo}>Aplicar</button>
        </div>

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
          <div>Subtotal</div>
          <div>${total.toLocaleString('es-CL')}</div>
        </div>
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
          <div>Descuento</div>
          <div>-{(discount * 100).toFixed(0)}%</div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <div>Total estimado</div>
          <div>${(total * (1 - discount)).toLocaleString('es-CL')}</div>
        </div>

        <div className="cart-actions" style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => alert('Checkout simulado — gracias!')}>Proceder al pago</button>
          <button className="btn secondary" onClick={() => clearCart()}>Vaciar carrito</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
