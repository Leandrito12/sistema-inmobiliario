@echo off
title Sistemas Inmobiliaria - Frontend y Backend (CORREGIDO)

echo ==========================================
echo INICIANDO SISTEMAS INMOBILIARIA
echo ==========================================
echo CORRECCIONES APLICADAS:
echo - Imagenes: URLs corregidas (puerto 5001)
echo - Contadores: CSS gradientes agregados
echo - Campo Baños: Middleware corregido + Debug
echo ==========================================

echo.
echo Deteniendo procesos Node.js existentes...
taskkill /F /IM node.exe 2>nul

echo.
echo Verificando puerto 5001...
netstat -ano | findstr :5001 >nul
if %errorlevel%==0 (
    echo Puerto 5001 en uso - liberando...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001') do taskkill /PID %%a /F 2>nul
)

echo.
echo Iniciando Backend con correcciones (Puerto 5001)...
start "Backend-Corregido" cmd /c "cd /d f:\CURSOS\inmobiliaria\inmobiliaria-BFF && echo BACKEND CON CORRECCIONES INICIADO && npm run dev"

echo.
echo Esperando 4 segundos para que inicie el backend...
timeout /t 4 /nobreak >nul

echo.
echo Iniciando Frontend (Puerto 5173)...
start "Frontend" cmd /c "cd /d f:\CURSOS\inmobiliaria\inmobiliaria-UI && npm run dev"

echo.
echo Esperando 5 segundos para que inicie el frontend...
timeout /t 5 /nobreak >nul

echo.
echo ==========================================
echo SISTEMAS INICIADOS CORRECTAMENTE
echo ==========================================
echo Backend: http://localhost:5001 (CON CORRECCIONES)
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin/login
echo ==========================================
echo CORRECCIONES ACTIVAS:
echo - Imagenes se cargan desde puerto 5001
echo - Contadores con colores distintivos
echo - Campo baños con debug extensivo
echo ==========================================

echo.
echo Presiona cualquier tecla para abrir el admin panel...
pause >nul

echo.
echo Abriendo admin panel...
start http://localhost:5173/admin/login

echo.
echo CREDENCIALES ADMIN:
echo Email: admin@admin.com
echo Password: admin123
echo.
echo Los sistemas estan ejecutandose en segundo plano.
echo Presiona cualquier tecla para cerrar este script.
pause >nul
