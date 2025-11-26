# 🔄 Guía de Migración de Componentes Mock a API Real

Esta guía muestra cómo actualizar los componentes existentes que usan datos mock para que usen los servicios API reales.

---

## 📋 Componentes a Actualizar

1. HomePage - Lista de canchas
2. CanchaDetail - Detalle de cancha individual
3. BookingModal - Crear reserva
4. PaymentPage - Procesar pago
5. AdminCourtsPage - CRUD de canchas (Admin)

---

## 1️⃣ HomePage - Actualizar Lista de Canchas

### Antes (con mock data):
```typescript
import { canchasMock } from '../mock-data/canchas.mock';

export const HomePage = () => {
  const [canchas] = useState(canchasMock);
  
  return (
    <div>
      {canchas.map(cancha => (
        <CourtCard key={cancha.id} cancha={cancha} />
      ))}
    </div>
  );
};
```

### Después (con API real):
```typescript
import { useState, useEffect } from 'react';
import { getAllCanchas, getCanchasConOfertas } from '../services/canchasService';
import type { CanchaProps } from '../interfaces/cancha.interface';

export const HomePage = () => {
  const [canchas, setCanchas] = useState<CanchaProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCanchas();
  }, []);

  const loadCanchas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCanchas();
      setCanchas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar canchas');
      console.error('Error loading canchas:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadOfertas = async () => {
    try {
      setLoading(true);
      const data = await getCanchasConOfertas();
      setCanchas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar ofertas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando canchas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={loadCanchas}>Todas</button>
      <button onClick={loadOfertas}>Ofertas</button>
      
      {canchas.map(cancha => (
        <CourtCard key={cancha.id} cancha={cancha} />
      ))}
    </div>
  );
};
```

---

## 2️⃣ CanchaDetail - Detalle de Cancha

### Antes:
```typescript
const cancha = canchasMock.find(c => c.id === Number(id));
```

### Después:
```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCanchaById } from '../services/canchasService';
import type { CanchaProps } from '../interfaces/cancha.interface';

export const CanchaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cancha, setCancha] = useState<CanchaProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCancha();
  }, [id]);

  const loadCancha = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getCanchaById(Number(id));
      setCancha(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la cancha');
      console.error('Error loading cancha:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cancha) return <div>Cancha no encontrada</div>;

  return (
    <div>
      <h1>{cancha.nombre}</h1>
      <p>{cancha.descripcion}</p>
      <p>Precio: ${cancha.precioHora}/hora</p>
      {/* ... resto del componente */}
    </div>
  );
};
```

---

## 3️⃣ BookingModal - Crear Reserva

### Antes (con localStorage):
```typescript
const handleSubmit = () => {
  const reserva = { /* ... */ };
  localStorage.setItem('pendingReservation', JSON.stringify(reserva));
  navigate('/payment');
};
```

### Después (con API):
```typescript
import { useState } from 'react';
import { createReserva } from '../services/reservasService';
import { useAuth } from '../contexts/AuthContext';
import type { Reservation } from '../interfaces/reservation.interface';

export const BookingModal = ({ cancha, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    if (!user) {
      setError('Debes iniciar sesión para hacer una reserva');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const reservaData: Omit<Reservation, 'id'> = {
        nombre: formData.nombre,
        email: user.email,
        fecha: formData.fecha,
        hora: formData.hora,
        cancha: cancha.nombre,
        canchaId: cancha.id,
        cantidadHoras: formData.cantidadHoras,
        precioTotal: cancha.precioHora * formData.cantidadHoras,
        estado: 'PENDIENTE',
      };

      const reserva = await createReserva(reservaData);
      
      // Guardar ID de reserva para el pago
      localStorage.setItem('pendingReservationId', String(reserva.id));
      
      navigate('/payment');
    } catch (err: any) {
      setError(err.message || 'Error al crear la reserva');
      console.error('Error creating reservation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulario */}
      {error && <div className="error">{error}</div>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Procesando...' : 'Confirmar Reserva'}
      </button>
    </div>
  );
};
```

---

## 4️⃣ PaymentPage - Procesar Pago

### Antes:
```typescript
const handlePayment = () => {
  // Simulación de pago
  alert('Pago procesado');
};
```

### Después:
```typescript
import { useState, useEffect } from 'react';
import { procesarPago } from '../services/pagosService';
import { getReservaById } from '../services/reservasService';
import { useAuth } from '../contexts/AuthContext';
import { isValidCardNumber } from '../utils/validation';

export const PaymentPage = () => {
  const { user } = useAuth();
  const [reserva, setReserva] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadReserva();
  }, []);

  const loadReserva = async () => {
    const reservaId = localStorage.getItem('pendingReservationId');
    if (!reservaId) {
      navigate('/');
      return;
    }

    try {
      const data = await getReservaById(Number(reservaId));
      setReserva(data);
    } catch (err: any) {
      setError('Error al cargar la reserva');
      console.error(err);
    }
  };

  const handlePayment = async () => {
    if (!user || !reserva) return;

    // Validar tarjeta
    if (!isValidCardNumber(cardNumber)) {
      setError('Número de tarjeta inválido');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const pagoData = {
        nombre: user.email.split('@')[0],
        email: user.email,
        cardNumber: cardNumber,
        monto: reserva.precioTotal,
        reservaId: reserva.id,
        estado: 'PENDIENTE',
      };

      const pago = await procesarPago(pagoData);

      if (pago.estado === 'APROBADO') {
        localStorage.removeItem('pendingReservationId');
        navigate('/confirmation', { 
          state: { reserva, pago } 
        });
      } else {
        setError('Pago rechazado. Intenta con otra tarjeta.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al procesar el pago');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!reserva) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Pagar Reserva</h2>
      <p>Total: ${reserva.precioTotal}</p>
      
      <input
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        maxLength={16}
      />
      
      {error && <div className="error">{error}</div>}
      
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar'}
      </button>

      <p>Tarjeta de prueba: 1234123412341234</p>
    </div>
  );
};
```

---

## 5️⃣ AdminCourtsPage - CRUD de Canchas

### Después (completo con CRUD):
```typescript
import { useState, useEffect } from 'react';
import { 
  getAllCanchas, 
  createCancha, 
  updateCancha, 
  deleteCancha 
} from '../services/canchasService';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { useAuth } from '../contexts/AuthContext';

export const AdminCourtsPage = () => {
  const { user, isAdmin } = useAuth();
  const [canchas, setCanchas] = useState<CanchaProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCancha, setEditingCancha] = useState<CanchaProps | null>(null);

  useEffect(() => {
    loadCanchas();
  }, []);

  const loadCanchas = async () => {
    try {
      setLoading(true);
      const data = await getAllCanchas();
      setCanchas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: Omit<CanchaProps, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newCancha = await createCancha(formData);
      setCanchas([...canchas, newCancha]);
      alert('Cancha creada exitosamente');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, formData: Partial<CanchaProps>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updateCancha(id, formData);
      setCanchas(canchas.map(c => c.id === id ? updated : c));
      setEditingCancha(null);
      alert('Cancha actualizada exitosamente');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta cancha?')) return;

    try {
      setLoading(true);
      setError(null);
      await deleteCancha(id);
      setCanchas(canchas.filter(c => c.id !== id));
      alert('Cancha eliminada exitosamente');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) {
    return <div>No tienes permisos para acceder a esta página</div>;
  }

  return (
    <div>
      <h1>Administrar Canchas</h1>
      
      {error && <div className="error">{error}</div>}
      
      <button onClick={() => setEditingCancha({} as CanchaProps)}>
        + Nueva Cancha
      </button>

      {loading && <div>Cargando...</div>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio/Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canchas.map(cancha => (
            <tr key={cancha.id}>
              <td>{cancha.id}</td>
              <td>{cancha.nombre}</td>
              <td>{cancha.tipo}</td>
              <td>${cancha.precioHora}</td>
              <td>
                <button onClick={() => setEditingCancha(cancha)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(cancha.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCancha && (
        <CourtForm
          cancha={editingCancha}
          onSubmit={editingCancha.id ? handleUpdate : handleCreate}
          onCancel={() => setEditingCancha(null)}
        />
      )}
    </div>
  );
};
```

---

## 6️⃣ Patrón con useApi Hook (Alternativa)

Para simplificar aún más, puedes usar el hook `useApi`:

```typescript
import { useApi } from '../hooks/useApi';
import { getAllCanchas } from '../services/canchasService';

export const HomePage = () => {
  const { 
    data: canchas, 
    loading, 
    error, 
    execute 
  } = useApi(getAllCanchas, {
    onSuccess: (data) => console.log('Canchas cargadas:', data.length),
    onError: (error) => console.error('Error:', error.message),
  });

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {canchas?.map(cancha => (
        <CourtCard key={cancha.id} cancha={cancha} />
      ))}
    </div>
  );
};
```

---

## 🎯 Checklist de Migración

Para cada componente:

- [ ] Eliminar imports de mock data
- [ ] Agregar imports de servicios API
- [ ] Agregar estados: `loading`, `error`, `data`
- [ ] Crear función `load` para cargar datos
- [ ] Llamar `load` en `useEffect`
- [ ] Agregar manejo de errores con try/catch
- [ ] Mostrar estados de loading y error en UI
- [ ] Usar `useAuth` para obtener usuario actual
- [ ] Validar permisos (admin vs user)
- [ ] Agregar feedback al usuario (alerts, toasts)
- [ ] Limpiar datos temporales de localStorage
- [ ] Actualizar interfaces TypeScript si es necesario

---

## 🚀 Orden Recomendado de Migración

1. **HomePage** (más sencillo, solo lectura)
2. **CanchaDetail** (similar a HomePage)
3. **BookingModal** (crear reserva)
4. **PaymentPage** (procesar pago)
5. **AdminCourtsPage** (CRUD completo)
6. Componentes restantes según necesidad

---

## 💡 Tips Importantes

### 1. Siempre verificar autenticación:
```typescript
const { user } = useAuth();

if (!user) {
  return <Navigate to="/login" />;
}
```

### 2. Validar datos antes de enviar:
```typescript
import { isValidEmail, isValidCardNumber } from '../utils/validation';

if (!isValidEmail(email)) {
  setError('Email inválido');
  return;
}
```

### 3. Feedback al usuario:
```typescript
// Success
alert('¡Operación exitosa!');
// o usar toast del proyecto
showToast({ type: 'success', message: '¡Guardado!' });

// Error
setError('Ocurrió un error');
```

### 4. Cleanup en logout:
```typescript
const handleLogout = async () => {
  await logout(); // Limpia token
  localStorage.clear(); // Limpia todo
  navigate('/login');
};
```

### 5. Manejar estados de carga:
```typescript
{loading && <Spinner />}
{!loading && !error && data && (
  // Render data
)}
{error && <ErrorMessage message={error} />}
```

---

## 🧪 Testing Después de Migración

Para cada componente migrado:

1. **Verificar que carga los datos:**
   - Abrir DevTools → Network
   - Ver requests a API
   - Verificar respuestas 200 OK

2. **Verificar que maneja errores:**
   - Apagar backend
   - Ver mensaje de error en UI
   - Verificar console.error()

3. **Verificar autenticación:**
   - Hacer logout
   - Intentar acceder al componente
   - Debería redirigir a /login

4. **Verificar permisos:**
   - Login como user normal
   - Intentar acceder a rutas admin
   - Debería denegar acceso

---

## ✅ Resultado Final

Después de migrar todos los componentes:

- ✅ Sin datos mock en el código
- ✅ Todas las peticiones van al backend real
- ✅ JWT incluido automáticamente
- ✅ Manejo de errores consistente
- ✅ Loading states en todas las operaciones
- ✅ Validaciones de datos
- ✅ Feedback al usuario
- ✅ Persistencia real en base de datos

**¡Tu aplicación está completamente integrada con el backend! 🎉**
