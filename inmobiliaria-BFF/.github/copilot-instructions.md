<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para el Backend de Inmobiliaria

Este es un proyecto de backend para una aplicación de inmobiliaria construido con:

- Node.js con Express y TypeScript
- MongoDB con Mongoose
- Sistema de autenticación JWT
- Manejo de archivos con Multer
- CRUD completo para propiedades inmobiliarias

## Convenciones del Proyecto

### Estructura de Archivos

- `/src/controllers/` - Controladores de las rutas
- `/src/models/` - Modelos de Mongoose
- `/src/routes/` - Definición de rutas
- `/src/middleware/` - Middleware personalizado
- `/src/config/` - Configuraciones de la aplicación
- `/src/utils/` - Utilidades y helpers
- `/uploads/` - Archivos subidos

### Convenciones de Código

- Usar TypeScript estricto
- Interfaces para tipado fuerte
- Manejo de errores con asyncHandler
- Respuestas consistentes usando ResponseHelper
- Validación de datos con Mongoose schemas
- Autenticación basada en JWT
- Middleware de autorización para rutas admin

### API Design

- Seguir principios REST
- Usar códigos de estado HTTP apropiados
- Respuestas JSON consistentes con formato: `{ success: boolean, message?: string, data?: any }`
- Paginación para listas grandes
- Filtros y búsqueda en endpoints de propiedades

### Base de Datos

- MongoDB con Mongoose ODM
- Modelos: User (admin) y Property
- Índices para optimización de consultas
- Validaciones a nivel de esquema
- Timestamps automáticos

### Seguridad

- Hash de contraseñas con bcryptjs
- JWT para autenticación
- Helmet para headers de seguridad
- CORS configurado apropiadamente
- Validación de archivos en uploads
