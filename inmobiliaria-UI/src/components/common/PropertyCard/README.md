# PropertyCard - Sistema de Componentes Modulares

El PropertyCard ha sido completamente refactorizado en un sistema modular y componentizado que permite máxima reutilización y flexibilidad.

## 🏗️ Arquitectura de Componentes

### Componente Principal
- **`PropertyCardNew`**: Versión completa y moderna del PropertyCard

### Componentes Modulares
- **`PropertyImage`**: Imagen con overlays, badges y botones de acción
- **`PropertyHeader`**: Título y precio de la propiedad
- **`PropertyLocation`**: Ubicación con icono de mapa
- **`PropertyFeatures`**: Características (habitaciones, baños, área)
- **`PropertyAmenities`**: Lista de amenidades con badges
- **`PropertyActions`**: Botones de acción (ver detalles, etc.)

## 📦 Importaciones

```typescript
// Importar el componente completo
import { PropertyCardNew } from './common/PropertyCard';

// Importar componentes individuales
import {
  PropertyImage,
  PropertyHeader,
  PropertyLocation,
  PropertyFeatures,
  PropertyAmenities,
  PropertyActions
} from './common/PropertyCard';

// Importar tipos y utilidades
import type { PropertyCardProps } from './common/PropertyCard';
import { formatPrice, getMainImage } from './common/PropertyCard';
```

## 🚀 Uso Básico

### PropertyCard Completo

```tsx
<PropertyCardNew
  id={property._id}
  titulo={property.titulo}
  precio={property.precio}
  moneda={property.moneda}
  ubicacion={property.ubicacion}
  caracteristicas={property.caracteristicas}
  imagenes={property.imagenes}
  tipo={property.tipo}
  estado={property.estado}
  destacado={property.destacado}
  amenidades={property.amenidades}
  operacion={property.operacion}
  getImageUrl={getImageUrl}
  animationDelay={100}
  onCameraClick={() => console.log('Ver galería')}
  onHeartClick={() => console.log('Agregar a favoritos')}
/>
```

## 🎨 Layouts Personalizados

### Layout Horizontal

```tsx
<Card>
  <Row className="g-0">
    <Col md={6}>
      <PropertyImage
        imagenes={property.imagenes}
        estado={property.estado}
        tipo={property.tipo}
        destacado={property.destacado}
        getImageUrl={getImageUrl}
        height="300px"
      />
    </Col>
    <Col md={6}>
      <Card.Body>
        <PropertyHeader
          titulo={property.titulo}
          precio={property.precio}
          moneda={property.moneda}
          operacion={property.operacion}
        />
        <PropertyLocation ubicacion={property.ubicacion} />
        <PropertyFeatures caracteristicas={property.caracteristicas} />
        <PropertyAmenities amenidades={property.amenidades} />
        <PropertyActions propertyId={property._id} />
      </Card.Body>
    </Col>
  </Row>
</Card>
```

### Layout Compacto

```tsx
<Card className="property-card-compact">
  <PropertyImage
    imagenes={property.imagenes}
    estado={property.estado}
    tipo={property.tipo}
    destacado={property.destacado}
    getImageUrl={getImageUrl}
    height="150px"
  />
  <Card.Body className="p-2">
    <PropertyHeader
      titulo={property.titulo}
      precio={property.precio}
      moneda={property.moneda}
    />
    <PropertyFeatures caracteristicas={property.caracteristicas} />
  </Card.Body>
</Card>
```

## 🔧 Propiedades de los Componentes

### PropertyImage
```typescript
interface PropertyImageProps {
  imagenes: PropertyImage[];
  estado: PropertyStatus;
  tipo: string;
  destacado: boolean;
  getImageUrl: (path: string) => string;
  onCameraClick?: () => void;
  onHeartClick?: () => void;
  height?: string; // default: '250px'
}
```

### PropertyHeader
```typescript
interface PropertyHeaderProps {
  titulo: string;
  precio: number;
  moneda: string;
  operacion?: 'venta' | 'alquiler';
}
```

### PropertyLocation
```typescript
interface PropertyLocationProps {
  ubicacion: PropertyLocation;
}
```

### PropertyFeatures
```typescript
interface PropertyFeaturesProps {
  caracteristicas: PropertyCharacteristics;
}
```

### PropertyAmenities
```typescript
interface PropertyAmenitiesProps {
  amenidades: string[];
  maxVisible?: number; // default: 3
}
```

### PropertyActions
```typescript
interface PropertyActionsProps {
  propertyId: string;
  buttonText?: string; // default: 'Ver Detalles'
  onButtonClick?: () => void;
  showAsLink?: boolean; // default: true
}
```

## ✨ Beneficios de la Componentización

### 🔄 **Reutilización**
- Cada componente puede usarse independientemente
- Consistencia visual en toda la aplicación
- Reducción de código duplicado

### 🎯 **Flexibilidad**
- Layouts completamente personalizables
- Combinaciones infinitas de componentes
- Adaptable a diferentes necesidades de UI

### 🛠️ **Mantenibilidad**
- Cambios aislados en cada componente
- Fácil debugging y testing
- Actualizaciones granulares

### ⚡ **Performance**
- Optimizaciones específicas por componente
- Lazy loading posible a nivel de componente
- Bundle splitting más eficiente

### 🧪 **Testing**
- Pruebas unitarias específicas por componente
- Mocking más sencillo
- Cobertura de código más precisa

## 📋 Casos de Uso

### 1. **Lista de Propiedades** (PropertiesView)
```tsx
{properties.map((property, index) => (
  <Col lg={4} md={6} key={property._id}>
    <PropertyCardNew {...property} animationDelay={index * 100} />
  </Col>
))}
```

### 2. **Propiedades Destacadas** (Hero/Landing)
```tsx
{featuredProperties.map(property => (
  <PropertyCardNew 
    {...property} 
    className="featured-property"
  />
))}
```

### 3. **Comparación de Propiedades**
```tsx
<Row>
  {comparisonProperties.map(property => (
    <Col md={6}>
      <Card>
        <PropertyImage {...property} height="200px" />
        <PropertyHeader {...property} />
        <PropertyFeatures {...property} />
        <PropertyActions {...property} buttonText="Comparar" />
      </Card>
    </Col>
  ))}
</Row>
```

### 4. **Resultado de Búsqueda Rápida**
```tsx
<Card className="search-result">
  <Row className="g-0">
    <Col xs={4}>
      <PropertyImage {...property} height="100px" />
    </Col>
    <Col xs={8}>
      <PropertyHeader {...property} />
      <PropertyLocation {...property} />
    </Col>
  </Row>
</Card>
```

## 🎨 Personalización de Estilos

Los componentes utilizan clases CSS modulares que puedes personalizar:

```css
.property-card__image-container { /* Contenedor de imagen */ }
.property-card__badge { /* Badges de estado */ }
.property-card__feature { /* Características individuales */ }
.property-card__amenity { /* Amenidades */ }
```

## 🔄 Migración desde PropertyCard Anterior

El `PropertyCardNew` es completamente compatible con las props del `PropertyCard` anterior, solo agrega nuevas funcionalidades opcionales:

```tsx
// ❌ Anterior
<PropertyCard {...props} onCameraClick={handler} />

// ✅ Nuevo
<PropertyCardNew {...props} onCameraClick={handler} onHeartClick={handler} />
```

## 📝 Notas de Desarrollo

- Todos los componentes son tipados con TypeScript
- Compatibilidad con React 18+
- Optimizados para SSR
- Accesibilidad incluida (ARIA labels, roles)
- Responsive design por defecto
