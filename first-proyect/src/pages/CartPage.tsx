// src/pages/CartPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContexts';

export const CartPage: FC = () => { // Renombrado de addReservationToCart a addToCart
  const { carrito, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, subtotal } = useCart(); // Ahora usa addToCart
  const navigate = useNavigate();

  // --- Lógica de descuentos ---
  const [promo, setPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const quantityDiscount = carrito.length >= 3 ? 0.2 : 0; // 20% si hay 3 o más reservas

  const applyPromo = () => {
    if (promo.toLowerCase() === 'descuento10') setPromoDiscount(0.1);
    else alert('Código inválido');
  };

  const totalFinal = subtotal * (1 - quantityDiscount) * (1 - promoDiscount);

  // (checkout simulado removido para evitar warnings de TS por variable no usada)

  return (
    <div style={{ padding: 20 }}>
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <div className="cart-list">
          {carrito.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imagenUrl} alt={item.nombre} style={{ width: 84, height: 64, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                <div style={{ color: 'var(--muted)' }}>{item.tipo} • {item.capacidad} personas</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <button className="btn small" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity} hr(s)</span>
                  <button className="btn small" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>
                  {item.enOferta && typeof item.precioOferta === 'number' ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '0.9rem', marginRight: '4px' }}>${(item.precioHora * item.quantity).toLocaleString('es-CL')}</span>
                      <span>${(item.precioOferta * item.quantity).toLocaleString('es-CL')}</span>
                    </>
                  ) : (
                    <span>${(item.precioHora * item.quantity).toLocaleString('es-CL')}</span>
                  )}
                </div>
                <button className="btn secondary small" style={{ fontSize: '0.7rem', padding: '2px 6px', marginTop: '4px' }} onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
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
          <div>${subtotal.toLocaleString('es-CL')}</div>
        </div>
        {quantityDiscount > 0 && (
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
            <div>Descuento por cantidad ({carrito.length} reservas)</div>
            <div>-{(quantityDiscount * 100).toFixed(0)}%</div>
          </div>
        )}
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
          <div>Descuento (código)</div>
          <div>-{(promoDiscount * 100)}%</div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', borderTop: '1px solid #eee', paddingTop: 8 }}>
          <div>Total estimado</div>
          <div>${totalFinal.toLocaleString('es-CL')}</div>
        </div>

        <div className="cart-actions" style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => navigate('/payment')} disabled={carrito.length === 0}>Proceder al pago</button>
          <button className="btn secondary" onClick={() => clearCart()}>Vaciar carrito</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
