import React from 'react';
import { Card } from 'react-bootstrap';
import './ServiceCard.styles.css';

/**
 * Props del componente ServiceCard
 */
export interface ServiceCardProps {
  /** Título del servicio */
  title: string;
  /** Descripción del servicio */
  description: string;
  /** Icono del servicio */
  icon: React.ReactNode;
  /** Color del icono y decoraciones */
  color: string;
  /** Índice para animaciones */
  index?: number;
  /** Función opcional de click */
  onClick?: () => void;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * ServiceCard - Componente reutilizable para mostrar servicios
 * Incluye icono, título, descripción y efectos visuales
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  color,
  index = 0,
  onClick,
  className = ''
}) => {
  return (
    <Card 
      className={`service-card h-100 border-0 shadow-sm ${className}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <Card.Body className="service-card__body p-4 text-center position-relative">
        {/* Decoración de fondo */}
        <div 
          className="service-card__decoration"
          style={{
            backgroundColor: `${color}15`
          }}
        />
        
        {/* Icono */}
        <div 
          className="service-card__icon mb-3"
          style={{ color }}
        >
          {icon}
        </div>
        
        {/* Título */}
        <h5 className="service-card__title fw-bold text-dark mb-3">
          {title}
        </h5>
        
        {/* Descripción */}
        <p className="service-card__description text-muted mb-0 lh-base">
          {description}
        </p>
        
        {/* Indicador hover */}
        {onClick && (
          <div 
            className="service-card__hover-indicator"
            style={{ backgroundColor: color }}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
