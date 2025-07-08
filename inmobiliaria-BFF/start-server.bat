@echo off
title Servidor Inmobiliaria Backend

echo ==========================================
echo SCRIPT DE INICIO DEL SERVIDOR INMOBILIARIA
echo ==========================================

echo.
echo Paso 1: Deteniendo procesos Node.js existentes...
taskkill /F /IM node.exe 2>nul
if errorlevel 1 (
    echo No hay procesos Node.js ejecutandose
) else (
    echo Procesos Node.js detenidos
)

echo.
echo Paso 2: Verificando puerto 5001...
netstat -ano | findstr :5001 >nul
if errorlevel 1 (
    echo Puerto 5001 libre
) else (
    echo Puerto 5001 en uso
    netstat -ano | findstr :5001
)

echo.
echo Paso 3: Navegando al directorio del backend...
cd /d "f:\CURSOS\inmobiliaria\inmobiliaria-BFF"
echo Directorio actual: %CD%

echo.
echo Paso 4: Verificando archivos necesarios...
if exist "package.json" (echo package.json existe) else (echo package.json no encontrado)
if exist "src\index.ts" (echo src\index.ts existe) else (echo src\index.ts no encontrado)
if exist "tsconfig.json" (echo tsconfig.json existe) else (echo tsconfig.json no encontrado)
if exist "src\middleware\propertyTransform.ts" (echo src\middleware\propertyTransform.ts existe) else (echo src\middleware\propertyTransform.ts no encontrado)

echo.
echo Paso 5: Verificando archivo .env...
if exist ".env" (
    echo .env existe
) else (
    echo .env no encontrado - Es necesario configurar las variables de entorno
)

echo.
echo Paso 6: Iniciando servidor...
echo El servidor se iniciara en http://localhost:5001
echo Presiona Ctrl+C para detener el servidor
echo ==========================================

npm run dev

pause
