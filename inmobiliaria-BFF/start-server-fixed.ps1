# Script PowerShell para reiniciar el backend con la corrección de baños aplicada

Write-Host "🔄 REINICIANDO BACKEND CON CORRECCIÓN DE BAÑOS" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Paso 1: Detener procesos Node.js existentes
Write-Host "`n🛑 Paso 1: Deteniendo procesos Node.js existentes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"} -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Procesos Node.js detenidos" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No hay procesos Node.js ejecutándose" -ForegroundColor Blue
}

# Paso 2: Verificar puerto 5001
Write-Host "`n🔍 Paso 2: Verificando puerto 5001..." -ForegroundColor Yellow
$portCheck = netstat -ano | findstr :5001
if ($portCheck) {
    Write-Host "⚠️  Puerto 5001 en uso - intentando liberar..." -ForegroundColor Yellow
    $portCheck | ForEach-Object {
        if ($_ -match ":5001.*LISTENING.*?(\d+)") {
            $pid = $matches[1]
            taskkill /PID $pid /F 2>$null
        }
    }
    Start-Sleep -Seconds 2
    Write-Host "✅ Puerto 5001 liberado" -ForegroundColor Green
} else {
    Write-Host "✅ Puerto 5001 libre" -ForegroundColor Green
}

# Paso 3: Navegar al directorio
Write-Host "`n📂 Paso 3: Navegando al directorio del backend..." -ForegroundColor Yellow
Set-Location "f:\CURSOS\inmobiliaria\inmobiliaria-BFF"
Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Green

# Paso 4: Verificar middleware corregido
Write-Host "`n🔧 Paso 4: Verificando middleware corregido..." -ForegroundColor Yellow
$middlewareFile = "src\middleware\propertyTransform.ts"
if (Test-Path $middlewareFile) {
    $middlewareContent = Get-Content $middlewareFile -Raw
    if ($middlewareContent -match 'req\.body\["caracteristicas\.baños"\] !== undefined') {
        Write-Host "✅ Middleware corregido encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ Middleware NO corregido - revisar archivo" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Archivo de middleware no encontrado" -ForegroundColor Red
}

# Paso 5: Iniciar servidor
Write-Host "`n🚀 Paso 5: Iniciando servidor con corrección..." -ForegroundColor Yellow
Write-Host "📡 El servidor se iniciará en http://localhost:5001" -ForegroundColor Cyan
Write-Host "🔧 Corrección aplicada: Campo baños ahora se guarda correctamente" -ForegroundColor Magenta
Write-Host "💡 Prueba creando una nueva propiedad con baños > 0" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

# Iniciar el servidor
npm run dev
