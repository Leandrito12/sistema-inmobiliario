# 🏠 Sistema Inmobiliario - Backend + Frontend

Un sistema completo de gestión inmobiliaria desarrollado con **Node.js/Express** (backend) y **React/TypeScript** (frontend).

## 🚀 Características

- ✅ **CRUD completo de propiedades**
- ✅ **Gestión de imágenes** con upload y optimización
- ✅ **Panel de administración** completo
- ✅ **Autenticación JWT** para administradores
- ✅ **Base de datos MongoDB** con Mongoose
- ✅ **Frontend responsive** con React y Bootstrap
- ✅ **TypeScript** en backend y frontend
- ✅ **Validación de datos** en ambos extremos

## 🛠️ Tecnologías

### Backend (inmobiliaria-BFF)

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Multer** para upload de imágenes

### Frontend (inmobiliaria-UI)

- **React 18** + **TypeScript**
- **Vite** como bundler
- **Bootstrap** para estilos

## 🚀 Inicio Rápido

### Opción 1: Usar Script Automático (Recomendado)

```bash
# Desde la carpeta raíz del proyecto
.\start-both.bat
```

### Opción 2: Inicio Manual

**Backend (Puerto 5001):**

```bash
cd inmobiliaria-BFF
npm install
npm run dev
```

**Frontend (Puerto 5173):**

```bash
cd inmobiliaria-UI
npm install
npm run dev
```

## 📦 Estructura del Proyecto

```
inmobiliaria/
├── inmobiliaria-BFF/          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/       # Controladores
│   │   ├── models/           # Modelos MongoDB
│   │   ├── routes/           # Rutas API
│   │   ├── middleware/       # Middlewares
│   │   └── config/           # Configuración
│   ├── uploads/              # Archivos subidos
│   └── tests/                # Tests del backend
├── inmobiliaria-UI/           # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── config/           # Configuración API
│   │   └── assets/           # Recursos estáticos
│   └── public/               # Archivos públicos
└── start-both.bat            # Script de inicio automático
```

## 🔧 Configuración

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inmobiliaria
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRES_IN=7d
PORT=5001
NODE_ENV=development
MAX_FILE_SIZE=52428800
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp
ADMIN_EMAIL=admin@inmobiliaria.com
ADMIN_PASSWORD=admin123
```

### Frontend

Las configuraciones del frontend se encuentran en `inmobiliaria-UI/src/config/api.ts`

## 🌐 Acceso al Sistema

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api
- **Admin Panel**: http://localhost:5173/admin/login

### Credenciales por defecto

- **Email**: admin@admin.com
- **Password**: admin123

## 🛠️ Características

### Backend

- ✅ API RESTful con Express
- ✅ Autenticación JWT
- ✅ Upload de imágenes
- ✅ Base de datos MongoDB
- ✅ Middleware de seguridad
- ✅ Validación de datos

### Frontend

- ✅ Interfaz React moderna
- ✅ Dashboard administrativo
- ✅ Gestión de propiedades
- ✅ Visualización de imágenes
- ✅ Responsive design
- ✅ Navegación con React Router

## 📋 Requisitos

- Node.js 16+
- npm 7+
- MongoDB (local o Atlas)
- Navegador moderno

## 🔍 Resolución de Problemas

### Puerto en uso

```bash
# Verificar puertos
netstat -ano | findstr :5001
netstat -ano | findstr :5173

# Matar proceso si es necesario
taskkill /PID <PID> /F
```

### Reinstalar dependencias

```bash
# Backend
cd inmobiliaria-BFF
rm -rf node_modules package-lock.json
npm install

# Frontend
cd inmobiliaria-UI
rm -rf node_modules package-lock.json
npm install
```

## 📚 Historial de Cambios y Mejoras

### ✅ Alineación Frontend-Backend (v1.2.0)

**Problema resuelto**: Eliminación de transformaciones complejas en el backend

**Cambios implementados**:

#### Frontend (`inmobiliaria-UI/src/components/AdminPropertyForm.tsx`)
- ✅ Los datos ahora se envían en la estructura exacta que espera el backend
- ✅ Ubicación y características se envían como objetos JSON
- ✅ Eliminada dependencia de transformaciones en el backend

```javascript
// ANTES (complejo)
formData.append('caracteristicas.baños', formData.bathrooms.toString());

// AHORA (simple y directo)
const caracteristicas = {
  habitaciones: formData.bedrooms,
  baños: formData.bathrooms,
  area: formData.area
};
formData.append('caracteristicas', JSON.stringify(caracteristicas));
```

#### Backend (`inmobiliaria-BFF/src/middleware/propertyTransform.ts`)
- ✅ Middleware simplificado
- ✅ Solo parsea objetos JSON que llegan como strings
- ✅ Eliminada lógica compleja de transformación de campos planos

```typescript
// Proceso simplificado: solo parsing de JSON
if (req.body.caracteristicas && typeof req.body.caracteristicas === "string") {
  req.body.caracteristicas = JSON.parse(req.body.caracteristicas);
}
```

**Beneficios obtenidos**:
- 🎯 **Simplicidad**: Código más limpio y mantenible
- 🚀 **Menos errores**: Eliminadas transformaciones complejas
- 📊 **Coherencia**: Frontend y backend hablan el mismo "idioma"
- ⚡ **Rendimiento**: Menos procesamiento en el servidor

### ✅ Corrección Campo Baños (v1.1.0)

**Problemas resueltos**:
- ✅ Campo `baños` ahora aparece correctamente en el dashboard
- ✅ URLs de imágenes corregidas (puerto 5001)
- ✅ Estilos CSS para contadores agregados
- ✅ Middleware de debug implementado

### ✅ Sistema Base (v1.0.0)

**Funcionalidades implementadas**:
- ✅ CRUD completo de propiedades
- ✅ Sistema de autenticación JWT
- ✅ Upload y gestión de imágenes
- ✅ Panel de administración React
- ✅ Base de datos MongoDB

## 🧪 Testing

Los tests se encuentran organizados en:
- `./tests/` - Tests principales del proyecto
- `./inmobiliaria-BFF/tests/` - Tests específicos del backend

### Ejecutar Tests

```bash
# Tests del proyecto (desde raíz)
cd tests
node <nombre-test>.js

# Tests del backend
cd inmobiliaria-BFF/tests
npm test
```

## 🚀 Scripts de Desarrollo

### Script de Inicio Automático
```bash
.\start-both.bat
```

**Funcionalidades del script**:
- ✅ Detiene procesos Node.js existentes
- ✅ Libera puertos 5001 y 5173
- ✅ Inicia backend con correcciones
- ✅ Inicia frontend
- ✅ Abre automáticamente el admin panel
- ✅ Muestra estado de servicios

---

## 📝 Notas de Desarrollo

- Las imágenes se almacenan en `inmobiliaria-BFF/uploads/properties/`
- Las URLs de imágenes se construyen automáticamente para apuntar al backend
- El sistema soporta múltiples formatos de imagen (JPG, PNG, WebP)
- La autenticación se maneja mediante JWT tokens

---

**Desarrollado con ❤️ usando Node.js, Express, React y MongoDB**
