# Scripts de Inicio del Servidor

Este directorio contiene varios scripts para iniciar el servidor backend de forma fácil y con verificaciones automáticas.

## 🚀 Scripts Disponibles

### 1. `start-server.bat` (Recomendado para Windows)

**Archivo**: Batch script para Windows
**Uso**: Doble clic o ejecutar desde cmd/PowerShell

```cmd
.\start-server.bat
```

### 2. `start-server-simple.ps1` (PowerShell Simple)

**Archivo**: Script PowerShell básico
**Uso**: Desde PowerShell

```powershell
.\start-server-simple.ps1
```

### 3. `start-server-complete.ps1` (PowerShell Completo)

**Archivo**: Script PowerShell con verificaciones adicionales
**Uso**: Desde PowerShell

```powershell
.\start-server-complete.ps1
```

## 🔧 Qué Hacen los Scripts

Todos los scripts realizan las siguientes verificaciones y acciones:

1. **Detener procesos existentes**: Mata procesos Node.js que puedan estar corriendo
2. **Verificar puerto**: Comprueba si el puerto 5001 está libre
3. **Navegar al directorio**: Se posiciona en el directorio del backend
4. **Verificar archivos**: Comprueba que existan los archivos necesarios
5. **Verificar .env**: Comprueba las variables de entorno (solo script completo)
6. **Iniciar servidor**: Ejecuta `npm run dev`

## 📋 Archivos Verificados

- `package.json`
- `src/index.ts`
- `tsconfig.json`
- `src/middleware/propertyTransform.ts`
- `.env` (solo script completo)

## ⚠️ Prerequisitos

1. **Node.js**: Debe estar instalado
2. **npm**: Debe estar instalado
3. **Dependencias**: `npm install` debe haber sido ejecutado
4. **Variables de entorno**: Archivo `.env` configurado

## 🛠️ Configuración Inicial

Si es la primera vez que ejecutas el proyecto:

1. Ejecuta: `npm install`
2. Crea el archivo `.env` con las variables necesarias
3. Ejecuta cualquiera de los scripts

## 💡 Ejemplo de Archivo .env

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

## 🔍 Resolución de Problemas

### Script PowerShell no se ejecuta

```powershell
# Cambiar política de ejecución
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Usar el script .bat como alternativa
.\start-server.bat
```

### Puerto 5001 en uso

```powershell
# Encontrar proceso que usa el puerto
netstat -ano | findstr :5001

# Matar proceso (cambiar PID por el número mostrado)
taskkill /PID <PID> /F
```

### Error: Cannot find module

```bash
# Reinstalar dependencias
npm install
```

### Error de conexión a MongoDB

- Verificar que `MONGODB_URI` esté correctamente configurado en `.env`
- Verificar conectividad a internet
- Verificar credenciales de MongoDB Atlas

## 🎯 Uso Recomendado

Para desarrollo diario, usa:

```cmd
.\start-server.bat
```

Para debugging detallado:

```powershell
.\start-server-complete.ps1
```

**Nota**: Los scripts están configurados para el directorio `f:\CURSOS\inmobiliaria\inmobiliaria-BFF`. Si tu proyecto está en otra ubicación, edita la ruta en el script.
