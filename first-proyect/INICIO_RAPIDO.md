# 🚀 Guía Rápida de Inicio - TuCancha

## ⚡ Inicio Rápido (5 minutos)

### Paso 1: Iniciar Base de Datos
```bash
# Iniciar Laragon (MySQL debe estar corriendo)
# Base de datos: tucancha
# Usuario: root
# Password: (vacío)
```

### Paso 2: Iniciar Backend (4 Microservicios)

Abre **4 terminales PowerShell** y ejecuta:

#### Terminal 1 - Auth Service (Puerto 8081)
```powershell
cd "c:\Users\samue\OneDrive\Desktop\TuCanchaFS\first-proyect\BackEnd\Auth _Service\Auth_Service"
.\mvnw spring-boot:run
```

#### Terminal 2 - Canchas Service (Puerto 8082)
```powershell
cd "c:\Users\samue\OneDrive\Desktop\TuCanchaFS\first-proyect\BackEnd\Canchas_Service\Canchas_Service"
.\mvnw spring-boot:run
```

#### Terminal 3 - Reservas Service (Puerto 8083)
```powershell
cd "c:\Users\samue\OneDrive\Desktop\TuCanchaFS\first-proyect\BackEnd\Reservas_Service\Reservas_Service"
.\mvnw spring-boot:run
```

#### Terminal 4 - Pago Service (Puerto 8084)
```powershell
cd "c:\Users\samue\OneDrive\Desktop\TuCanchaFS\first-proyect\BackEnd\Pago_Service\Pago_Service"
.\mvnw spring-boot:run
```

**Espera hasta ver el mensaje:**
```
Started [ServiceName]Application in X.XXX seconds
```

### Paso 3: Iniciar Frontend

Abre una **5ta terminal**:
```powershell
cd "c:\Users\samue\OneDrive\Desktop\TuCanchaFS\first-proyect\FrontEnd"
npm run dev
```

### Paso 4: Abrir en el Navegador

Abre: **http://localhost:5173**

---

## ✅ Verificar que Todo Funciona

### 1. Verificar Backend

Abre en el navegador:
- Auth Swagger: http://localhost:8081/swagger-ui.html
- Canchas Swagger: http://localhost:8082/swagger-ui.html
- Reservas Swagger: http://localhost:8083/swagger-ui.html
- Pagos Swagger: http://localhost:8084/swagger-ui.html

### 2. Verificar Frontend

1. Ir a http://localhost:5173
2. Clic en "Register" (arriba derecha)
3. Crear usuario:
   - Email: `test@tucancha.com`
   - Password: `Test123` (mínimo 6 caracteres, 1 mayúscula)
4. Clic en "Crear cuenta"
5. Deberías ser redirigido a la página principal, autenticado

### 3. Verificar JWT Token

1. Abrir DevTools (F12)
2. Ir a "Application" → "Local Storage" → http://localhost:5173
3. Deberías ver:
   - `auth_token`: Token JWT largo
   - `user_data`: `{"email":"test@tucancha.com","role":"user"}`

---

## 🧪 Probar la Integración

### Prueba 1: Login
```
1. Ir a http://localhost:5173/login
2. Email: test@tucancha.com
3. Password: Test123
4. Clic en "Login"
5. ✅ Debería redirigir a home y mostrar tu email arriba
```

### Prueba 2: Crear Cancha (Admin)
```
1. Registrar usuario admin:
   - Email: admin@tucancha.com
   - Password: Admin123
2. Ir a /admin/canchas
3. Crear nueva cancha
4. ✅ Debería guardarse en la base de datos
```

### Prueba 3: Hacer Reserva
```
1. Login como usuario normal
2. Seleccionar una cancha
3. Hacer reserva
4. Procesar pago
5. ✅ Debería ver confirmación
```

---

## 🔧 Comandos Útiles

### Backend

**Compilar sin ejecutar:**
```powershell
.\mvnw clean compile
```

**Ejecutar tests:**
```powershell
.\mvnw test
```

**Limpiar y recompilar:**
```powershell
.\mvnw clean install
```

### Frontend

**Instalar dependencias:**
```powershell
npm install
```

**Ejecutar en modo desarrollo:**
```powershell
npm run dev
```

**Compilar para producción:**
```powershell
npm run build
```

**Ejecutar tests:**
```powershell
npm run test
```

---

## 🐛 Solución de Problemas Comunes

### Backend no inicia

**Error: Port 808X already in use**
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :8081

# Matar proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F
```

**Error: Could not connect to MySQL**
```
1. Verificar que Laragon esté corriendo
2. Verificar que MySQL esté activo
3. Verificar que la base de datos "tucancha" exista
4. En phpMyAdmin: CREATE DATABASE tucancha;
```

### Frontend no conecta con backend

**Error: Failed to fetch**
```
1. Verificar que los 4 microservicios estén corriendo
2. Abrir DevTools → Network
3. Ver qué endpoints fallan
4. Verificar URLs en src/services/api.config.ts
```

**CORS Error**
```
✅ Ya está configurado en backend (@CrossOrigin)
Si persiste:
1. Reiniciar todos los servicios
2. Limpiar caché del navegador
3. Abrir en modo incógnito
```

### Error 401 Unauthorized

**Token expirado:**
```
1. Ir a /logout
2. Login nuevamente
3. Token JWT dura 24 horas
```

### Error 403 Forbidden

**Sin permisos de admin:**
```
1. Verificar rol en localStorage
2. Crear usuario con rol ADMIN en backend
3. O usar endpoint /admin desde Swagger
```

---

## 📊 Endpoints Principales

### Auth Service (8081)
```
POST /api/v1/auth/register  - Registrar usuario
POST /api/v1/auth/login     - Iniciar sesión
POST /api/v1/auth/logout    - Cerrar sesión
GET  /api/v1/auth/users     - Listar usuarios (Admin)
```

### Canchas Service (8082)
```
GET    /api/v1/canchas             - Listar canchas
GET    /api/v1/canchas/{id}        - Obtener cancha
GET    /api/v1/canchas/tipo/{tipo} - Filtrar por tipo
GET    /api/v1/canchas/ofertas     - Ver ofertas
POST   /api/v1/canchas             - Crear cancha (Admin)
PUT    /api/v1/canchas/{id}        - Actualizar (Admin)
DELETE /api/v1/canchas/{id}        - Eliminar (Admin)
```

### Reservas Service (8083)
```
GET    /api/v1/reservas                    - Listar reservas
GET    /api/v1/reservas/{id}               - Obtener reserva
GET    /api/v1/reservas/email/{email}      - Mis reservas
GET    /api/v1/reservas/cancha/{canchaId}  - Reservas de cancha
POST   /api/v1/reservas                    - Crear reserva
PUT    /api/v1/reservas/{id}               - Actualizar reserva
DELETE /api/v1/reservas/{id}               - Cancelar reserva
```

### Pagos Service (8084)
```
POST /api/v1/pagos/procesar         - Procesar pago
GET  /api/v1/pagos/email/{email}    - Mis pagos
GET  /api/v1/pagos/reserva/{id}     - Pagos de reserva
GET  /api/v1/pagos                  - Listar pagos
```

---

## 📱 Usuarios de Prueba

Después del primer registro, puedes usar:

### Usuario Normal
```
Email: test@tucancha.com
Password: Test123
Rol: USER
```

### Usuario Admin
```
Email: admin@tucancha.com
Password: Admin123
Rol: ADMIN (crear manualmente en DB o desde Swagger)
```

### Tarjeta de Prueba
```
Número: 1234123412341234
Nombre: Test User
CVV: 123
```

---

## 🎯 Checklist de Inicio

- [ ] Laragon iniciado (MySQL corriendo)
- [ ] Base de datos "tucancha" creada
- [ ] Auth Service corriendo en puerto 8081
- [ ] Canchas Service corriendo en puerto 8082
- [ ] Reservas Service corriendo en puerto 8083
- [ ] Pago Service corriendo en puerto 8084
- [ ] Frontend corriendo en puerto 5173
- [ ] Swagger UIs accesibles (todos los puertos 808X)
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Token JWT se guarda en localStorage
- [ ] Redirección según rol funciona

---

## 📚 Recursos Adicionales

- **Documentación completa**: Ver `INTEGRACION_API.md`
- **Resumen ejecutivo**: Ver `INTEGRACION_RESUMEN.md`
- **Ejemplos de código**: Ver `src/examples/`

---

## 🎉 ¡Listo para Desarrollar!

Una vez que todos los servicios estén corriendo y las pruebas básicas funcionen, puedes comenzar a:

1. Actualizar componentes existentes con servicios reales
2. Implementar nuevas funcionalidades
3. Crear tests automatizados
4. Optimizar el rendimiento
5. Agregar más validaciones

**¡Éxito con tu proyecto TuCancha! ⚽🏟️**
