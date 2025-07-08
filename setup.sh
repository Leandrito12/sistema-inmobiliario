#!/bin/bash
# Script de setup para desarrolladores

echo "🚀 Configurando Sistema Inmobiliario..."
echo "======================================"

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd inmobiliaria-BFF
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cat > .env << EOL
PORT=5001
MONGODB_URI=mongodb://localhost:27017/inmobiliaria
JWT_SECRET=tu_jwt_secret_super_secreto_aqui
NODE_ENV=development
EOL
    echo "⚠️  IMPORTANTE: Configura tu MONGODB_URI y JWT_SECRET en el archivo .env"
fi

# Volver a la raíz e instalar dependencias del frontend
cd ../inmobiliaria-UI
echo "📦 Instalando dependencias del frontend..."
npm install

# Volver a la raíz
cd ..

echo ""
echo "✅ Setup completado!"
echo "==================="
echo "Para iniciar el sistema:"
echo "  Windows: ./start-both.bat"
echo "  Linux/Mac: chmod +x setup.sh && ./start-both.sh"
echo ""
echo "URLs del sistema:"
echo "  Frontend: http://localhost:5173"
echo "  Admin: http://localhost:5173/admin/login"
echo "  API: http://localhost:5001"
echo ""
echo "Credenciales admin:"
echo "  Email: admin@admin.com"
echo "  Password: admin123"
