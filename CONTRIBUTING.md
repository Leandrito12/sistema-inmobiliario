# Guía de Contribución

## 🛠️ Configuración del Entorno de Desarrollo

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o remoto)
- Git

### Setup Inicial
```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]
cd inmobiliaria

# Ejecutar script de setup
chmod +x setup.sh
./setup.sh
```

## 📝 Estándares de Código

### Backend (TypeScript)
- Usar TypeScript strict mode
- Validación de tipos completa
- Middlewares modulares
- Manejo de errores consistente

### Frontend (React + TypeScript)
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Estados locales mínimos
- Responsive design

## 🔄 Flujo de Trabajo

### 1. Crear rama para feature
```bash
git checkout -b feature/nueva-funcionalidad
```

### 2. Desarrollo
- Escribir código siguiendo los estándares
- Probar localmente
- Commit frecuente con mensajes descriptivos

### 3. Pull Request
- Descripción clara de los cambios
- Screenshots si aplica
- Tests pasando

## 🧪 Testing

### Backend
```bash
cd inmobiliaria-BFF
npm test
```

### Frontend
```bash
cd inmobiliaria-UI
npm test
```

## 📚 Estructura de Commits

```
tipo(alcance): descripción corta

- feat: nueva funcionalidad
- fix: corrección de bug
- docs: cambios en documentación
- style: cambios de formato
- refactor: refactoring de código
- test: agregar o modificar tests
```

### Ejemplos:
```
feat(auth): agregar autenticación con JWT
fix(properties): corregir campo baños en actualización
docs(readme): actualizar instrucciones de instalación
```

## 🐛 Reportar Bugs

### Información a incluir:
1. **Descripción**: Qué pasó vs qué esperabas
2. **Pasos para reproducir**: Lista detallada
3. **Entorno**: OS, versión de Node, etc.
4. **Screenshots**: Si aplica
5. **Logs**: Errores de consola

## 🔍 Debug

### Backend
Los logs están configurados en el middleware. Para debug adicional:
```bash
DEBUG=inmobiliaria:* npm run dev
```

### Frontend
Usar React Developer Tools y console.log

## 📋 Checklist para PRs

- [ ] Código compilable sin errores
- [ ] Tests pasando
- [ ] Sin console.log en producción
- [ ] Documentación actualizada
- [ ] Variables de entorno documentadas
- [ ] Responsive design verificado

## 🚀 Deploy

### Variables de Entorno Producción
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://servidor/inmobiliaria
JWT_SECRET=secret_super_seguro
```

## 🤝 Código de Conducta

- Ser respetuoso con otros contribuidores
- Proporcionar feedback constructivo
- Seguir las mejores prácticas
- Documentar cambios importantes

## 📞 Contacto

Para preguntas sobre desarrollo:
- Crear issue en GitHub
- Contactar al maintainer principal
