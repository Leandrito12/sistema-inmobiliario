# Script PowerShell para iniciar el servidor paso a paso

Write-Host "SCRIPT DE INICIO DEL SERVIDOR INMOBILIARIA" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Paso 1: Detener procesos existentes
Write-Host "`nPaso 1: Deteniendo procesos Node.js existentes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"}
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Procesos Node.js detenidos" -ForegroundColor Green
} else {
    Write-Host "No hay procesos Node.js ejecutándose" -ForegroundColor Blue
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
$requiredFiles = @("package.json", "src/index.ts", "tsconfig.json")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "$file existe" -ForegroundColor Green
    } else {
        Write-Host "$file no encontrado" -ForegroundColor Red
    }
}

# Paso 5: Iniciar servidor
Write-Host "`nPaso 5: Iniciando servidor..." -ForegroundColor Yellow
Write-Host "El servidor se iniciará en http://localhost:5001" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

npm run dev
