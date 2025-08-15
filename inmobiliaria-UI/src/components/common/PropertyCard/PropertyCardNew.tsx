/**
 * PropertyCardNew - Versión modular y componentizada de PropertyCard
 * Utiliza componentes internos para máxima reutilización
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import {
  PropertyImage,
  PropertyHeader,
  PropertyLocation,
  PropertyFeatures,
  PropertyAmenities,
  PropertyActions
} from './components';
import type { PropertyCardProps } from './types';
import './PropertyCard.styles.css';

const PropertyCardNew: React.FC<PropertyCardProps> = ({
  id,
  titulo,
  precio,
  moneda,
  ubicacion,
  caracteristicas,
  imagenes,
  tipo,
  estado,
  destacado = false,
  animationDelay = 0,
  getImageUrl = (path) => path,
  className = '',
  onCameraClick,
  onHeartClick,
  amenidades = [],
  operacion = 'venta'
}) => {
  const cardClasses = [
    'property-card',
    'h-100',
    'border-0',
    'shadow-sm',
    className
  ].filter(Boolean).join(' ');

  return (
    <Card 
      className={cardClasses}
      style={{ 
        borderRadius: '15px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      data-aos="fade-up"
      data-aos-delay={animationDelay}
    >
      {/* Imagen de la propiedad */}
      <PropertyImage
        imagenes={imagenes}
        estado={estado}
        tipo={tipo}
        destacado={destacado}
        getImageUrl={getImageUrl}
        onCameraClick={onCameraClick}
        onHeartClick={onHeartClick}
      />

      {/* Contenido de la tarjeta */}
      <Card.Body className="p-4">
        {/* Título y precio */}
        <PropertyHeader
          titulo={titulo}
          precio={precio}
          moneda={moneda}
          operacion={operacion}
        />

        {/* Ubicación */}
        <PropertyLocation
          ubicacion={ubicacion}
        />

        {/* Características (habitaciones, baños, área) */}
        <PropertyFeatures
          caracteristicas={caracteristicas}
        />

        {/* Amenidades */}
        <PropertyAmenities
          amenidades={amenidades}
          maxVisible={3}
        />

        {/* Acciones (botón de ver detalles) */}
        <PropertyActions
          propertyId={id}
          buttonText="Ver Detalles"
          showAsLink={true}
        />
      </Card.Body>
    </Card>
  );
};

export default PropertyCardNew;
