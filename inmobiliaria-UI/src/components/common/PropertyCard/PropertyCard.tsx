import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import Button from '../Button';
import type { PropertyCardProps } from './types';
import { formatPrice, capitalizeStatus, getStatusBadgeColor, getMainImage } from './utils';
import './PropertyCard.styles.css';

/**
 * PropertyCard - Componente reutilizable para mostrar propiedades
 * Usado en listas de propiedades, propiedades destacadas, etc.
 */
const PropertyCard: React.FC<PropertyCardProps> = ({
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
  onCameraClick
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
      data-aos="fade-up"
      data-aos-delay={animationDelay}
    >
      <div className="property-card__image-container">
        <div
          className="property-card__image"
          style={{
            backgroundImage: `url(${getMainImage(imagenes, getImageUrl)})`
          }}
        />
        
        {/* Overlay para propiedades no disponibles */}
        {(estado === 'vendido' || estado === 'alquilado' || estado === 'reservado') && (
          <div className="property-card__overlay">
            <div className="property-card__status-overlay">
              {capitalizeStatus(estado)}
            </div>
          </div>
        )}
        
        {/* Badges superiores */}
        <div className="property-card__badges property-card__badges--top-left">
          <Badge 
            bg={getStatusBadgeColor(estado)}
            className="property-card__badge"
          >
            {capitalizeStatus(estado)}
          </Badge>
          {destacado && (
            <Badge className="property-card__badge property-card__badge--featured">
              Destacado
            </Badge>
          )}
        </div>

        {/* Botón de cámara */}
        <div className="property-card__badges property-card__badges--top-right">
          <Button 
            variant="light" 
            size="sm" 
            onClick={onCameraClick}
            className="property-card__camera-btn"
          >
            <FaCamera />
          </Button>
        </div>

        {/* Tipo de propiedad */}
        <div className="property-card__badges property-card__badges--bottom-left">
          <Badge className="property-card__badge property-card__badge--type">
            {tipo}
          </Badge>
        </div>
      </div>

      <Card.Body className="property-card__body">
        <div className="property-card__header">
          <h5 className="property-card__title">
            {titulo}
          </h5>
          <h4 className="property-card__price">
            {formatPrice(precio, moneda)}
          </h4>
        </div>

        <div className="property-card__location">
          <FaMapMarkerAlt className="property-card__location-icon" />
          <span>{ubicacion.direccion}, {ubicacion.ciudad}</span>
        </div>

        <Row className="property-card__features">
          <Col xs={4}>
            <div className="property-card__feature">
              <div className="property-card__feature-icon">
                <FaBed />
              </div>
              <small className="property-card__feature-label">Habitaciones</small>
              <div className="property-card__feature-value">{caracteristicas.habitaciones}</div>
            </div>
          </Col>
          <Col xs={4}>
            <div className="property-card__feature">
              <div className="property-card__feature-icon">
                <FaBath />
              </div>
              <small className="property-card__feature-label">Baños</small>
              <div className="property-card__feature-value">{caracteristicas.baños}</div>
            </div>
          </Col>
          <Col xs={4}>
            <div className="property-card__feature">
              <div className="property-card__feature-icon">
                <FaRulerCombined />
              </div>
              <small className="property-card__feature-label">Área</small>
              <div className="property-card__feature-value">{caracteristicas.area}m²</div>
            </div>
          </Col>
        </Row>

        <div className="property-card__action">
          <Button 
            variant="outline-primary" 
            to={`/propiedad/${id}`}
            fullWidth
            rounded
            className="property-card__details-btn"
          >
            Ver Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
