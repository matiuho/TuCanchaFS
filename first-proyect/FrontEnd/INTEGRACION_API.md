# Integración Frontend-Backend - TuCancha

## ✅ Integración Completada

La integración entre el frontend React/TypeScript y el backend Spring Boot con JWT está completa.

## 📁 Estructura de Servicios

```
src/services/
├── api.config.ts          # Configuración de URLs y manejo de tokens JWT
├── authService.ts         # Autenticación (login, register, logout)
├── canchasService.ts      # Gestión de canchas/campos deportivos
├── reservasService.ts     # Gestión de reservas
└── pagosService.ts        # Procesamiento de pagos
```

## 🔐 Autenticación JWT

### Configuración de APIs (api.config.ts)

```typescript
export const API_CONFIG = {
  AUTH_SERVICE: 'http://localhost:8081/api/v1/auth',
  CANCHAS_SERVICE: 'http://localhost:8082/api/v1/canchas',
  RESERVAS_SERVICE: 'http://localhost:8083/api/v1/reservas',
  PAGOS_SERVICE: 'http://localhost:8084/api/v1/pagos',
};
```

### Manejo de Tokens

El token JWT se almacena automáticamente en `localStorage` después del login:
- **Token key**: `auth_token`
- **User data key**: `user_data`

Todas las peticiones incluyen automáticamente el header:
```typescript
'Authorization': `Bearer ${token}`
```

### AuthContext Actualizado

El `AuthContext` ahora usa la API real del backend:

```typescript
// Login
const result = await auth.login(email, password);
if (result.success) {
  // Usuario autenticado con JWT
}

// Register
const result = await auth.register(email, password);
if (result.success) {
  // Usuario creado y autenticado
}

// Logout
await auth.logout(); // Limpia el token y sesión
```

## 📡 Servicios de API

### 1. AuthService

**Login**
```typescript
import { login } from '../services/authService';

const response = await login('user@example.com', 'password');
// response: { email, role, token, message, success }
```

**Register**
```typescript
import { register } from '../services/authService';

const response = await register('user@example.com', 'Password123', 'user');
// Auto-login después del registro
```

**Logout**
```typescript
import { logout } from '../services/authService';

await logout();
// Limpia el token JWT del localStorage
```

### 2. CanchasService

**Obtener todas las canchas**
```typescript
import { getAllCanchas } from '../services/canchasService';

const canchas = await getAllCanchas();
```

**Filtrar por tipo**
```typescript
import { getCanchasByTipo } from '../services/canchasService';

const futbolCanchas = await getCanchasByTipo('FUTBOL');
const futsalCanchas = await getCanchasByTipo('FUTSAL');
```

**Buscar por nombre**
```typescript
import { searchCanchas } from '../services/canchasService';

const results = await searchCanchas('nombre cancha');
```

**Obtener ofertas**
```typescript
import { getCanchasConOfertas } from '../services/canchasService';

const ofertas = await getCanchasConOfertas();
```

**Crear cancha (Admin)**
```typescript
import { createCancha } from '../services/canchasService';

const newCancha = await createCancha({
  nombre: 'Nueva Cancha',
  tipo: 'FUTBOL',
  precioHora: 50.0,
  capacidad: 22,
  imagenUrl: 'https://...',
  descripcion: 'Descripción...',
  enOferta: false,
});
```

**Actualizar cancha (Admin)**
```typescript
import { updateCancha } from '../services/canchasService';

const updated = await updateCancha(1, {
  precioHora: 60.0,
  enOferta: true,
  precioOferta: 45.0,
});
```

**Eliminar cancha (Admin)**
```typescript
import { deleteCancha } from '../services/canchasService';

await deleteCancha(1);
```

### 3. ReservasService

**Crear reserva**
```typescript
import { createReserva } from '../services/reservasService';

const reserva = await createReserva({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  fecha: '2024-01-15',
  hora: '18:00',
  cancha: 'Cancha Principal',
  canchaId: 1,
  cantidadHoras: 2,
  precioTotal: 100.0,
  estado: 'PENDIENTE',
});
```

**Obtener reservas por email**
```typescript
import { getReservasByEmail } from '../services/reservasService';

const misReservas = await getReservasByEmail('user@example.com');
```

**Obtener reservas por cancha**
```typescript
import { getReservasByCanchaId } from '../services/reservasService';

const reservas = await getReservasByCanchaId(1);
```

**Obtener reservas por fecha**
```typescript
import { getReservasByFecha } from '../services/reservasService';

const reservas = await getReservasByFecha('2024-01-15');
```

**Actualizar estado de reserva**
```typescript
import { updateReserva } from '../services/reservasService';

await updateReserva(1, { estado: 'CONFIRMADA' });
```

### 4. PagosService

**Procesar pago**
```typescript
import { procesarPago } from '../services/pagosService';

const pago = await procesarPago({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  cardNumber: '1234123412341234', // Tarjeta de prueba
  monto: 100.0,
  reservaId: 1,
  estado: 'PENDIENTE',
});
```

**Obtener pagos por email**
```typescript
import { getPagosByEmail } from '../services/pagosService';

const misPagos = await getPagosByEmail('user@example.com');
```

**Obtener pagos por reserva**
```typescript
import { getPagosByReservaId } from '../services/pagosService';

const pagos = await getPagosByReservaId(1);
```

## 🎣 Custom Hooks

### useAuth Hook

```typescript
import { useAuth } from '../hooks/useAuth';

const { isLoggedIn, user, token, loading, updateAuthStatus } = useAuth();

// isLoggedIn: boolean
// user: { email: string, role: string } | null
// token: string | null
// loading: boolean
// updateAuthStatus: () => void
```

### useApi Hook

```typescript
import { useApi } from '../hooks/useApi';
import { getAllCanchas } from '../services/canchasService';

const { data, loading, error, execute } = useApi(getAllCanchas, {
  onSuccess: (data) => console.log('Success!', data),
  onError: (error) => console.error('Error!', error),
});

// Ejecutar
await execute();
```

## 🚨 Manejo de Errores

Todos los servicios incluyen manejo de errores:

```typescript
try {
  const canchas = await getAllCanchas();
} catch (error: any) {
  console.error('Error:', error.message);
  // Mostrar mensaje al usuario
}
```

Los errores comunes incluyen:
- **401 Unauthorized**: Token JWT inválido o expirado
- **403 Forbidden**: Sin permisos (requiere rol ADMIN)
- **404 Not Found**: Recurso no encontrado
- **500 Server Error**: Error del servidor

## 🔄 Flujo de Autenticación

1. **Usuario hace login** → Backend valida credenciales
2. **Backend genera JWT** → Incluye email y rol (USER/ADMIN)
3. **Frontend guarda token** → localStorage: `auth_token`
4. **Peticiones subsecuentes** → Incluyen header `Authorization: Bearer {token}`
5. **Backend valida token** → En cada request con `JwtAuthenticationFilter`
6. **Token expira (24h)** → Usuario debe hacer login nuevamente

## 🧪 Testing

### Ejemplo de componente con API

Ver: `src/examples/CanchasExample.tsx` y `src/examples/ReservationExample.tsx`

### Probar autenticación

1. Iniciar backend (4 microservicios en puertos 8081-8084)
2. Iniciar frontend: `npm run dev`
3. Ir a `/login`
4. Crear nuevo usuario o usar credenciales de prueba
5. Las peticiones ahora incluyen JWT automáticamente

## 🎯 Próximos Pasos

1. ✅ **Integración completada**
2. 🔄 **Iniciar microservicios**
   ```bash
   cd BackEnd/Auth_Service/Auth_Service
   .\mvnw spring-boot:run
   
   cd BackEnd/Canchas_Service/Canchas_Service
   .\mvnw spring-boot:run
   
   cd BackEnd/Reservas_Service/Reservas_Service
   .\mvnw spring-boot:run
   
   cd BackEnd/Pago_Service/Pago_Service
   .\mvnw spring-boot:run
   ```

3. 🔄 **Actualizar componentes existentes** para usar los nuevos servicios
4. ✅ **Validar comunicación** frontend-backend
5. 📝 **Testing end-to-end**

## 📝 Notas Importantes

- **CORS**: Asegúrate de que los microservicios tengan CORS configurado para `http://localhost:5173`
- **JWT Secret**: Todos los servicios comparten la misma secret key
- **Tarjeta de prueba**: `1234123412341234` (acepta en backend)
- **Token expira**: 24 horas (configurado en `JwtUtil.java`)
- **Roles**: `USER` (usuario normal) y `ADMIN` (administrador)

## 🐛 Troubleshooting

**Error: Failed to fetch**
- Verifica que los microservicios estén corriendo
- Revisa las URLs en `api.config.ts`

**Error: 401 Unauthorized**
- Token JWT expiró → Hacer login nuevamente
- Token no enviado → Verifica que el usuario esté autenticado

**Error: 403 Forbidden**
- Usuario no tiene permisos → Requiere rol ADMIN
- Verifica el rol del usuario en localStorage

**CORS Error**
- Backend debe permitir `http://localhost:5173`
- Agrega `@CrossOrigin` en los controllers
