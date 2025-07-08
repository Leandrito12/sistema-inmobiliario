# Script PowerShell para iniciar el servidor paso a paso

Write-Host "SCRIPT DE INICIO DEL SERVIDOR INMOBILIARIA" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Paso 1: Detener procesos existentes
Write-Host "`nPaso 1: Deteniendo procesos Node.js existentes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"} -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Procesos Node.js detenidos" -ForegroundColor Green
} else {
    Write-Host "No hay procesos Node.js ejecutandose" -ForegroundColor Blue
}

# Paso 2: Verificar puerto 5001
Write-Host "`nPaso 2: Verificando puerto 5001..." -ForegroundColor Yellow
$portCheck = netstat -ano | findstr :5001
if ($portCheck) {
    Write-Host "Puerto 5001 en uso:" -ForegroundColor Yellow
    Write-Host $portCheck
} else {
    Write-Host "Puerto 5001 libre" -ForegroundColor Green
}

# Paso 3: Navegar al directorio
Write-Host "`nPaso 3: Navegando al directorio del backend..." -ForegroundColor Yellow
Set-Location "f:\CURSOS\inmobiliaria\inmobiliaria-BFF"
Write-Host "Directorio actual: $(Get-Location)" -ForegroundColor Green

# Paso 4: Verificar archivos
Write-Host "`nPaso 4: Verificando archivos necesarios..." -ForegroundColor Yellow
$requiredFiles = @("package.json", "src/index.ts", "tsconfig.json", "src/middleware/propertyTransform.ts")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "$file existe" -ForegroundColor Green
    } else {
        Write-Host "$file no encontrado" -ForegroundColor Red
    }
}

# Paso 5: Verificar variables de entorno
Write-Host "`nPaso 5: Verificando archivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host ".env existe" -ForegroundColor Green
} else {
    Write-Host ".env no encontrado - Creando archivo de ejemplo..." -ForegroundColor Yellow
    $envContent = @"
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
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "Archivo .env creado - Por favor configura tus variables" -ForegroundColor Yellow
}

# Paso 6: Iniciar servidor
Write-Host "`nPaso 6: Iniciando servidor..." -ForegroundColor Yellow
Write-Host "El servidor se iniciara en http://localhost:5001" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

# Iniciar el servidor
npm run dev
