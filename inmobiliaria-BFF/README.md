# Inmobiliaria Backend (BFF)

Backend para la aplicación de inmobiliaria construido con Node.js, Express, TypeScript y MongoDB.

## 🚀 Características

- **Autenticación JWT** para administradores
- **CRUD completo** de propiedades inmobiliarias
- **Manejo avanzado de imágenes** (hasta 50MB) con optimización automática
- **API REST** con paginación y filtros
- **Base de datos MongoDB** con Mongoose
- **TypeScript** para type safety
- **Middleware de seguridad** con Helmet y CORS
- **Transformación de datos** para estructura anidada de propiedades

## 📋 Prerequisitos

- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Crea el archivo `.env` con las variables de entorno:

```env
# Base de datos
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inmobiliaria

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRES_IN=7d

# Servidor
PORT=5001
NODE_ENV=development

# Uploads
MAX_FILE_SIZE=52428800
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp

# Admin por defecto
ADMIN_EMAIL=admin@inmobiliaria.com
ADMIN_PASSWORD=admin123
```

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

### Script PowerShell (Windows)

```powershell
# Ejecutar el script completo de inicio
.\start-complete.ps1
```

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Lógica de negocio
│   ├── authController.ts
│   ├── propertyController.ts
│   └── imageController.ts
├── middleware/           # Middlewares personalizados
│   ├── auth.ts
│   ├── upload.ts
│   ├── imageOptimization.ts
│   ├── propertyTransform.ts
│   └── errorHandler.ts
├── models/              # Modelos de MongoDB
│   ├── Property.ts
│   └── User.ts
├── routes/              # Definición de rutas
│   ├── auth.ts
│   └── properties.ts
├── config/              # Configuración
│   └── database.ts
├── utils/               # Utilidades
│   └── responseHelper.ts
└── index.ts             # Punto de entrada
```

## 🧪 Testing

Los archivos de prueba están en la carpeta `tests/`:

```bash
# Verificar conexión a la base de datos
node tests/verify-database.js

# Probar mapeo de datos frontend-backend
node tests/test-frontend-mapping.js

# Validar estructura de propiedades
node tests/test-property-structure.js
```

Ver `tests/README.md` para más detalles sobre las pruebas.

## 📖 Documentación

La documentación completa está disponible en:

- `../DOCUMENTACION_COMPLETA.md` - Documentación completa del sistema

## 🔐 Credenciales por Defecto

- **Email**: admin@inmobiliaria.com
- **Password**: admin123

## 🌐 Endpoints API

### Autenticación

- `POST /api/auth/login` - Login de administrador
- `POST /api/auth/register` - Registro de administrador
- `GET /api/auth/me` - Obtener datos del usuario actual

### Propiedades

- `GET /api/properties` - Obtener todas las propiedades (paginado)
- `GET /api/properties/:id` - Obtener propiedad por ID
- `POST /api/properties` - Crear nueva propiedad (Admin)
- `PUT /api/properties/:id` - Actualizar propiedad (Admin)
- `DELETE /api/properties/:id` - Eliminar propiedad (Admin)
- `GET /api/properties/featured` - Obtener propiedades destacadas
- `GET /api/properties/search` - Buscar propiedades

## 📸 Manejo de Imágenes

- **Tamaño máximo**: 50MB por imagen
- **Formatos soportados**: JPG, JPEG, PNG, WebP
- **Optimización automática**: Compresión con Sharp
- **Thumbnails**: Generación automática
- **Almacenamiento**: Sistema de archivos local (`uploads/properties/`)

## 🔧 Troubleshooting

### Puerto en uso

```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Verificar procesos Node.js
Get-Process | Where-Object {$_.ProcessName -eq "node"}
```

### Limpiar instalación

```bash
rm -rf node_modules
npm install
```

## 📝 Notas de Desarrollo

- El middleware `transformPropertyData` convierte datos planos de FormData a estructura anidada
- Las imágenes se procesan automáticamente con optimización
- El sistema soporta CORS para desarrollo con frontend en puerto 5173

**Última actualización**: Julio 2025

```bash
npm install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/inmobiliaria
JWT_SECRET=tu_jwt_secret_aqui
ADMIN_EMAIL=admin@inmobiliaria.com
ADMIN_PASSWORD=admin123
```

4. Inicia MongoDB (si es local):

```bash
mongod
```

5. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Controladores de las rutas
├── models/              # Modelos de Mongoose
├── routes/              # Definición de rutas
├── middleware/          # Middleware personalizado
├── config/              # Configuraciones
├── utils/               # Utilidades
└── index.ts             # Punto de entrada
uploads/                 # Archivos subidos
```

## 🔐 API Endpoints

### Autenticación

- `POST /api/auth/login` - Login de administrador
- `GET /api/auth/profile` - Obtener perfil (requiere auth)
- `GET /api/auth/verify` - Verificar token (requiere auth)
- `PUT /api/auth/change-password` - Cambiar contraseña (requiere auth)

### Propiedades

- `GET /api/properties` - Obtener todas las propiedades (público)
- `GET /api/properties/:id` - Obtener propiedad por ID (público)
- `GET /api/properties/featured` - Propiedades destacadas (público)
- `GET /api/properties/search` - Buscar propiedades (público)
- `POST /api/properties` - Crear propiedad (requiere auth admin)
- `PUT /api/properties/:id` - Actualizar propiedad (requiere auth admin)
- `DELETE /api/properties/:id` - Eliminar propiedad (requiere auth admin)

## 📊 Modelos de Datos

### Usuario (Admin)

```typescript
{
  email: string;
  password: string; // hasheada
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}
```

### Propiedad

```typescript
{
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: 'casa' | 'apartamento' | 'oficina' | 'local' | 'terreno';
  operacion: 'venta' | 'alquiler';
  ubicacion: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    coordenadas?: { lat: number; lng: number; };
  };
  caracteristicas: {
    habitaciones?: number;
    baños?: number;
    area: number;
    estacionamientos?: number;
    antiguedad?: number;
  };
  imagenes: Array<{
    url: string;
    alt: string;
    orden: number;
  }>;
  amenidades: string[];
  estado: 'disponible' | 'vendido' | 'alquilado' | 'reservado';
  destacado: boolean;
  fechaPublicacion: Date;
  fechaActualizacion: Date;
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar versión compilada
- `npm test` - Ejecutar tests (por implementar)

## 🚦 Estados de la API

- `200` - Éxito
- `201` - Creado
- `400` - Error de validación
- `401` - No autorizado
- `403` - Prohibido
- `404` - No encontrado
- `500` - Error del servidor

## 🔒 Seguridad

- Contraseñas hasheadas con bcryptjs
- JWT para autenticación
- Helmet para headers de seguridad
- CORS configurado
- Validación de archivos en uploads

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.
