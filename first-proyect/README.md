# 🏟️ TuCancha - Plataforma de Reserva de Canchas

Una plataforma moderna para reservar canchas deportivas en línea. Construida con microservicios en Spring Boot y React.

## 🌟 Características

- ✅ Autenticación segura con JWT
- ✅ Catálogo de canchas con filtros
- ✅ Sistema de reservas con calendario
- ✅ Procesamiento de pagos integrado
- ✅ Panel de administrador
- ✅ Interfaz responsive
- ✅ Tests automatizados (Frontend + Backend)

---

## 📋 Requisitos Previos

- **Node.js** 18+ y npm
- **Java** 21+
- **MySQL** 8.0+
- **Maven** 3.9+

---

## ⚡ Inicio Rápido

### 1. Preparar la Base de Datos

```bash
# Verificar que MySQL está corriendo
# Crear la BD (se crea automáticamente al iniciar los servicios)
```

### 2. Iniciar Servicios Backend

**Terminal 1 - Auth Service (Puerto 8081)**
```bash
cd BackEnd/Auth\ _Service/Auth_Service
mvnw.cmd clean package -DskipTests
java -jar target/Auth_Service-0.0.1-SNAPSHOT.jar
```

**Terminal 2 - Canchas Service (Puerto 8082)**
```bash
cd BackEnd/Canchas_Service/Canchas_Service
mvnw.cmd clean package -DskipTests
java -jar target/Canchas_Service-0.0.1-SNAPSHOT.jar
```

**Terminal 3 - Reservas Service (Puerto 8083)**
```bash
cd BackEnd/Reservas_Service/Reservas_Service
mvnw.cmd clean package -DskipTests
java -jar target/Reservas_Service-0.0.1-SNAPSHOT.jar
```

**Terminal 4 - Pago Service (Puerto 8084)**
```bash
cd BackEnd/Pago_Service/Pago_Service
mvnw.cmd clean package -DskipTests
java -jar target/Pago_Service-0.0.1-SNAPSHOT.jar
```

### 3. Iniciar Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

Accede a **http://localhost:5173** en tu navegador.

---

## 🔗 Enlaces Importantes

### APIs Swagger
- 🔐 Auth Service: http://localhost:8081/swagger-ui.html
- 🏟️ Canchas Service: http://localhost:8082/swagger-ui.html
- 📅 Reservas Service: http://localhost:8083/swagger-ui.html
- 💳 Pago Service: http://localhost:8084/swagger-ui.html

### Frontend
- 🌐 Aplicación: http://localhost:5173

### Base de Datos
- 📊 MySQL: localhost:3306
- 📁 Base de datos: `tucancha`

---

## 📂 Estructura del Proyecto

```
TuCanchaFS/
├── BackEnd/
│   ├── Auth_Service/              # Autenticación y usuarios
│   ├── Canchas_Service/           # Catálogo de canchas
│   ├── Reservas_Service/          # Gestión de reservas
│   └── Pago_Service/              # Procesamiento de pagos
│
├── FrontEnd/                       # Aplicación React
│   ├── src/
│   │   ├── pages/                 # Páginas principales
│   │   ├── components/            # Componentes reutilizables
│   │   ├── services/              # Integración con APIs
│   │   ├── contexts/              # Estado global (Auth, Cart)
│   │   ├── hooks/                 # Hooks personalizados
│   │   └── utils/                 # Funciones utilitarias
│   └── package.json
│
└── API_DOCUMENTATION.md           # Documentación detallada de APIs
```

---

## 🧪 Testing

### Frontend
```bash
cd FrontEnd
npm run test          # Ejecutar tests
npm run test -- --ui  # Con interfaz visual
```

### Backend (por servicio)
```bash
cd BackEnd/<Servicio>/<Servicio>
mvnw.cmd test
```

---

## 🔐 Credenciales Predeterminadas

Las siguientes cuentas se crean automáticamente:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@tucancha.com | Admin123 | ADMIN |
| usuario@tucancha.com | User123 | USER |

---

## 🛠️ Desarrollo

### Agregar Nueva Funcionalidad

1. **Backend:** Crear controller + service + repository en el servicio correspondiente
2. **Frontend:** Crear componente + servicio API + rutas
3. **Tests:** Agregar tests unitarios y de integración
4. **Documentación:** Actualizar Swagger annotations y README

### Convenciones de Código

- **Java:** Seguir estándar Google Java Style Guide
- **TypeScript/React:** Usar ESLint + Prettier
- **Git:** Commits descriptivos (feat:, fix:, docs:, test:)

---

## 📝 Variables de Entorno

### Backend (en `application.properties` de cada servicio)

```properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/tucancha
spring.datasource.username=root
spring.datasource.password=

# JWT
jwt.secret=tu-clave-secreta
jwt.expiration=86400000

# Swagger
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

### Frontend (en `.env` si es necesario)

```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🐛 Troubleshooting

### Problema: "Failed to load remote configuration" en Swagger
```bash
# Solución: Verificar que springdoc.api-docs.path=/v3/api-docs
# esté en todos los application.properties
```

### Problema: Puerto en uso
```bash
# Solución (PowerShell):
Get-Process | Where-Object {$_.ProcessName -like "*java*"} | Stop-Process -Force
```

### Problema: Conexión rechazada a MySQL
```bash
# Solución: Iniciar MySQL
# En Windows con MySQL Service: services.msc
# En Laragon: Hacer click en "Start"
```

---

## 🚀 Deployment en Producción

### Compilar para Producción

**Frontend:**
```bash
cd FrontEnd
npm run build
# Esto genera la carpeta 'dist/' lista para servir
```

**Backend:**
```bash
# Para cada servicio
cd BackEnd/<Servicio>/<Servicio>
mvnw.cmd clean package -P production
```

### Opciones de Hosting

- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Backend:** AWS EC2, Google Cloud Run, Azure Container Apps
- **BD:** AWS RDS, Google Cloud SQL, Azure Database for MySQL

---

## 📚 Documentación Adicional

- [Documentación Completa de APIs](./API_DOCUMENTATION.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Reporte de Bugs](./issues)

---

## 👥 Equipo

- **Backend:** Desarrollo de microservicios en Spring Boot
- **Frontend:** UI/UX con React + TypeScript
- **DevOps:** Deployment y CI/CD

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

## 💬 Soporte

¿Tienes preguntas o problemas?

- 📧 Email: support@tucancha.com
- 💬 Discord: [TuCancha Community](https://discord.gg/tucancha)
- 🐛 Issues: [GitHub Issues](./issues)

---

**Última actualización:** 15 de Diciembre, 2025

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
