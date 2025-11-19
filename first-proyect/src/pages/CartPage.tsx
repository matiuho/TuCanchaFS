// src/pages/CartPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContexts';
import '../styles/pages/CartPage.css';

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
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <div className="cart-list">
          {carrito.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imagenUrl} alt={item.nombre} />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.nombre}</div>
                <div className="cart-item-details">{item.tipo} • {item.capacidad} personas</div>
                <div className="cart-item-quantity">
                  <button className="btn small" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity} hr(s)</span>
                  <button className="btn small" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              <div className="cart-item-price">
                <div>
                  {item.enOferta && typeof item.precioOferta === 'number' ? (
                    <>
                      <span className="price-original">${(item.precioHora * item.quantity).toLocaleString('es-CL')}</span>
                      <span>${(item.precioOferta * item.quantity).toLocaleString('es-CL')}</span>
                    </>
                  ) : (
                    <span>${(item.precioHora * item.quantity).toLocaleString('es-CL')}</span>
                  )}
                </div>
                <button className="btn secondary small cart-item-remove" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h3>Resumen de la compra</h3>
        <div className="cart-promo-input">
          <input className="search-input" placeholder="Código promocional" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="btn small" onClick={applyPromo}>Aplicar</button>
        </div>

        <div className="cart-summary-row">
          <div>Subtotal</div>
          <div>${subtotal.toLocaleString('es-CL')}</div>
        </div>
        {quantityDiscount > 0 && (
          <div className="cart-discount-row">
            <div>Descuento por cantidad ({carrito.length} reservas)</div>
            <div>-{(quantityDiscount * 100).toFixed(0)}%</div>
          </div>
        )}
        <div className="cart-discount-code">
          <div>Descuento (código)</div>
          <div>-{(promoDiscount * 100)}%</div>
        </div>
        <div className="cart-total">
          <div>Total estimado</div>
          <div>${totalFinal.toLocaleString('es-CL')}</div>
        </div>

        <div className="cart-actions">
          <button className="btn" onClick={() => navigate('/payment')} disabled={carrito.length === 0}>Proceder al pago</button>
          <button className="btn secondary" onClick={() => clearCart()}>Vaciar carrito</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
