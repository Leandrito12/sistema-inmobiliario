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
formData.append("caracteristicas.baños", formData.bathrooms.toString());

// AHORA (simple y directo)
const caracteristicas = {
  habitaciones: formData.bedrooms,
  baños: formData.bathrooms,
  area: formData.area,
};
formData.append("caracteristicas", JSON.stringify(caracteristicas));
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

### ✅ Corrección URLs de Imágenes en Edición (v1.3.0)

**Problema resuelto**: Las imágenes existentes aparecían rotas al editar propiedades

**Descripción del problema**:

- Al editar una propiedad, las imágenes ya cargadas mostraban URLs relativas (`/uploads/properties/...`)
- Las URLs no incluían el dominio completo, causando imágenes rotas
- Era necesario eliminar y volver a cargar todas las imágenes para actualizar

**Solución implementada**:

#### Frontend (`inmobiliaria-UI/src/components/AdminPropertyForm.tsx`)

- ✅ Agregada función `getImageUrl()` para normalizar URLs de imágenes
- ✅ Corrección automática de URLs relativas a URLs completas
- ✅ Manejo de casos edge (URLs con doble slash, puertos incorrectos)

```javascript
// Nueva función para corregir URLs
const getImageUrl = (imagePath: string) => {
  // Normaliza cualquier formato de URL a la estructura correcta
  // /uploads/properties/... → http://localhost:5001/uploads/properties/...
};

// Aplicación en el procesamiento de imágenes existentes
const correctedImages = property.imagenes.map((img: any) => {
  const imagePath = img.url || img;
  return getImageUrl(imagePath); // URLs ahora son completas y válidas
});
```

**Beneficios obtenidos**:

- 🖼️ **Imágenes visibles**: Las imágenes existentes se muestran correctamente al editar
- ⚡ **Eficiencia**: No es necesario recargar imágenes si no se desean cambiar
- 🔧 **Mantenimiento**: Las URLs se normalizan automáticamente
- 🎯 **UX mejorada**: Flujo de edición más intuitivo y eficiente

**Tests implementados**:

- `tests/image-url-edit.test.js` - Diagnóstico del problema
- `tests/image-url-fix-verification.test.js` - Verificación de la solución

### ✅ Corrección Persistencia de Imágenes en Actualización (v1.4.0)

**Problema resuelto**: Las imágenes desaparecían del dashboard tras actualizar propiedades

**Descripción del problema**:
- Al actualizar una propiedad manteniendo las imágenes existentes, estas desaparecían del dashboard
- El backend ignoraba el campo `existingImages` enviado por el frontend  
- Solo procesaba nuevas imágenes subidas, perdiendo las existentes
- Aparecía "Sin imagen disponible" en propiedades que sí tenían imágenes

**Solución implementada**:

#### Backend (`inmobiliaria-BFF/src/middleware/upload.ts`)
- ✅ Modificado middleware `processUploadedImages` para procesar `existingImages`
- ✅ Combina imágenes existentes + nuevas en un solo array
- ✅ Mantiene orden y configuración de portada
- ✅ Convierte URLs completas a formato interno consistente

```typescript
// Nuevo procesamiento: combina existentes + nuevas
if (req.body.existingImages) {
  const existingImages = JSON.parse(req.body.existingImages);
  // Procesa imágenes existentes con estructura completa
  const processedExisting = existingImages.map((imageUrl, index) => {
    let url = imageUrl.replace('http://localhost:5001', ''); // Normalizar URL
    return {
      _id: new mongoose.Types.ObjectId(),
      url: url, // URL relativa para consistencia
      alt: `${req.body.titulo} - Imagen ${index + 1}`,
      orden: index + 1,
      // ...resto de propiedades
    };
  });
  allImages = [...processedExisting];
}

// Luego agrega nuevas imágenes si las hay
if (req.files && Array.isArray(req.files)) {
  // Procesa nuevas imágenes y las combina
  allImages = [...allImages, ...processedImages];
}
```

**Casos manejados**:
- 🖼️ **Solo imágenes existentes**: Se mantienen al actualizar otros campos
- 📸 **Existentes + nuevas**: Se combinan correctamente
- 🆕 **Solo nuevas**: Funciona como antes (creación)
- 🔗 **URLs mixtas**: Normaliza diferentes formatos de URL

**Beneficios obtenidos**:
- 🔄 **Persistencia**: Las imágenes se mantienen tras actualización
- 🖼️ **Visibilidad**: Aparecen correctamente en el dashboard
- ⚡ **Eficiencia**: No necesita recargar imágenes innecesariamente
- 🎯 **UX consistente**: Comportamiento predecible en edición

**Tests implementados**:
- `tests/dashboard-images-after-update.test.js` - Diagnóstico del problema en dashboard
- `tests/existing-images-update.test.js` - Identificación del problema en backend
- `tests/existing-images-fix-verification.test.js` - Verificación de la solución (100% exitoso)

---

## 📝 Notas de Desarrollo

- Las imágenes se almacenan en `inmobiliaria-BFF/uploads/properties/`
- Las URLs de imágenes se construyen automáticamente para apuntar al backend
- El sistema soporta múltiples formatos de imagen (JPG, PNG, WebP)
- La autenticación se maneja mediante JWT tokens

---

**Desarrollado con ❤️ usando Node.js, Express, React y MongoDB**
