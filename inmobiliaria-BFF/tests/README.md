# Tests y Archivos de Verificación

Esta carpeta contiene los archivos de prueba y verificación del sistema inmobiliario.

## 📋 Archivos Disponibles

### `test-frontend-mapping.js`

**Propósito**: Verifica que el mapeo de datos del frontend al backend funcione correctamente.
**Uso**:

```bash
node tests/test-frontend-mapping.js
```

**Descripción**: Simula cómo el formulario del frontend (`AdminPropertyForm`) mapea los datos planos a la estructura anidada que espera el backend.

### `test-property-structure.js`

**Propósito**: Valida la estructura de datos de las propiedades.
**Uso**:

```bash
node tests/test-property-structure.js
```

**Descripción**: Muestra la estructura completa de una propiedad y cómo se envía al backend.

### `verify-database.js`

**Propósito**: Verifica la conexión a MongoDB y muestra las propiedades existentes.
**Uso**:

```bash
node tests/verify-database.js
```

**Descripción**: Conecta a la base de datos y lista todas las propiedades almacenadas.

### `debug-localstorage.js`

**Propósito**: Script de debugging para verificar el localStorage del frontend.
**Uso**: Ejecutar en la consola del navegador
**Descripción**: Muestra el contenido del localStorage y ayuda a debuggear problemas de autenticación.

## 🚀 Cómo Ejecutar los Tests

### Prerequisitos

- Node.js instalado
- Variables de entorno configuradas (especialmente `MONGODB_URI`)
- Backend ejecutándose (para algunos tests)

### Ejecutar Tests Individuales

```bash
# Desde el directorio inmobiliaria-BFF
cd f:\CURSOS\inmobiliaria\inmobiliaria-BFF

# Verificar conexión a la base de datos
node tests/verify-database.js

# Probar mapeo de datos frontend-backend
node tests/test-frontend-mapping.js

# Validar estructura de propiedades
node tests/test-property-structure.js
```

### Ejecutar Todos los Tests

```bash
# Ejecutar todos los tests de una vez
node tests/test-property-structure.js && node tests/test-frontend-mapping.js && node tests/verify-database.js
```

## 📊 Salida Esperada

### test-frontend-mapping.js

```
Frontend form data:
{
  "title": "Casa de prueba frontend",
  "price": 150000,
  ...
}

Mapped form data for backend:
titulo: Casa de prueba frontend
precio: 150000
...

After transformation:
{
  "titulo": "Casa de prueba frontend",
  "precio": 150000,
  "ubicacion": {
    "direccion": "Calle Falsa 123",
    "ciudad": "Buenos Aires",
    ...
  },
  ...
}
```

### verify-database.js

```
🔍 Conectando a MongoDB...
✅ Conexión exitosa a MongoDB
📊 Propiedades encontradas: 5
📋 Propiedades en la base de datos:
1. Casa moderna - $250,000 (Buenos Aires)
2. Departamento céntrico - $180,000 (Córdoba)
...
```

## 🔧 Troubleshooting

### Error: Cannot find module

**Problema**: El script no puede encontrar módulos de Node.js
**Solución**: Ejecutar desde el directorio raíz del backend (`inmobiliaria-BFF`)

### Error: MongoServerError

**Problema**: No se puede conectar a MongoDB
**Solución**: Verificar que `MONGODB_URI` esté configurado correctamente en `.env`

### Error: FormData is not defined

**Problema**: FormData no está disponible en Node.js
**Solución**: Normal, el test simula FormData. El error es esperado y se maneja en el código.

## 📝 Notas

- Estos scripts son para testing y debugging únicamente
- No modifican datos de producción
- Seguros para ejecutar en cualquier momento
- Ayudan a verificar que las integraciones funcionen correctamente

**Última actualización**: Julio 2025
