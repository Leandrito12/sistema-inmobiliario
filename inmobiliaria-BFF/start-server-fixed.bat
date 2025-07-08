@echo off
echo ===================================================
echo REINICIANDO BACKEND CON CORRECCION DE BAÑOS
echo ===================================================

echo.
echo Matando procesos Node.js...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Esperando 2 segundos...
timeout /t 2 /nobreak >nul

echo.
echo Iniciando servidor con correccion aplicada...
echo El servidor se iniciara en http://localhost:5001
echo.
echo CORRECCION APLICADA: El campo baños ahora se guarda correctamente
echo Prueba creando una nueva propiedad con baños > 0
echo.
echo ===================================================

npm run dev
