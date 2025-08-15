/**
 * PropertyImage - Componente para la imagen de la propiedad con overlays
 */

import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaCamera, FaHeart } from 'react-icons/fa';
import Button from '../../Button';
import { capitalizeStatus, getStatusBadgeColor, getMainImage } from '../utils';
import type { PropertyStatus, PropertyImage as PropertyImageType } from '../types';

interface PropertyImageProps {
  /** Array de imágenes de la propiedad */
  imagenes: PropertyImageType[];
  /** Estado de la propiedad */
  estado: PropertyStatus;
  /** Tipo de propiedad */
  tipo: string;
  /** Si es destacada */
  destacado: boolean;
  /** Función para obtener URL de imagen */
  getImageUrl: (path: string) => string;
  /** Callback para el botón de cámara */
  onCameraClick?: () => void;
  /** Callback para el botón de favoritos */
  onHeartClick?: () => void;
  /** Altura de la imagen */
  height?: string;
}

const PropertyImage: React.FC<PropertyImageProps> = ({
  imagenes,
  estado,
  tipo,
  destacado,
  getImageUrl,
  onCameraClick,
  onHeartClick,
  height = '250px'
}) => {
  return (
    <div className="property-card__image-container">
      <div
        className="property-card__image"
        style={{
          height,
          backgroundImage: `url(${getMainImage(imagenes, getImageUrl)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay para propiedades no disponibles */}
      {(estado === 'vendido' || estado === 'alquilado' || estado === 'reservado') && (
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(128, 128, 128, 0.7)',
            zIndex: 2
          }}
        >
          <div
            className="text-white fw-bold text-center px-4 py-2"
            style={{
              backgroundColor: estado === 'vendido' ? 'rgba(220, 53, 69, 0.9)' : 
                             estado === 'alquilado' ? 'rgba(40, 167, 69, 0.9)' : 
                             'rgba(255, 193, 7, 0.9)',
              borderRadius: '25px',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '2px solid white',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          >
            {capitalizeStatus(estado)}
          </div>
        </div>
      )}
      
      {/* Badges superiores izquierda */}
      <div className="position-absolute top-0 start-0 p-3" style={{ zIndex: 3 }}>
        <Badge 
          bg={getStatusBadgeColor(estado)}
          className="fw-bold me-2"
          style={{
            fontSize: '0.8rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px'
          }}
        >
          {capitalizeStatus(estado)}
        </Badge>
        {destacado && (
          <Badge 
            className="fw-bold"
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
              fontSize: '0.8rem',
              padding: '0.5rem 1rem',
              borderRadius: '20px'
            }}
          >
            Destacado
          </Badge>
        )}
      </div>

      {/* Botones superiores derecha */}
      <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 3 }}>
        <Button 
          variant="light" 
          size="sm" 
          className="rounded-circle me-2"
          style={{ width: '40px', height: '40px' }}
          onClick={onHeartClick}
        >
          <FaHeart />
        </Button>
        <Button 
          variant="light" 
          size="sm" 
          className="rounded-circle"
          style={{ width: '40px', height: '40px' }}
          onClick={onCameraClick}
        >
          <FaCamera />
        </Button>
      </div>

      {/* Tipo de propiedad */}
      <div className="position-absolute bottom-0 start-0 p-3" style={{ zIndex: 3 }}>
        <Badge 
          bg="dark" 
          className="fw-bold"
          style={{
            fontSize: '0.8rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(0,0,0,0.7) !important'
          }}
        >
          {tipo}
        </Badge>
      </div>
    </div>
  );
};

export default PropertyImage;
