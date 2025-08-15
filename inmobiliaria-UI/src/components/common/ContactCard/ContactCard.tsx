/**
 * ContactCard - Componente reutilizable para tarjetas de contacto
 * Usado en footer, páginas de contacto, etc.
 */

import React from 'react';
import { Col } from 'react-bootstrap';
import './ContactCard.styles.css';

export interface ContactCardProps {
  /** Icono a mostrar */
  icon: React.ReactNode;
  /** Título de la tarjeta */
  title: string;
  /** Contenido de la tarjeta */
  content: string | React.ReactNode;
  /** Color del gradiente del icono */
  iconGradient: string;
  /** Delay para animación AOS */
  animationDelay?: number;
  /** Clases CSS adicionales */
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  content,
  iconGradient,
  animationDelay = 0,
  className = ''
}) => {
  return (
    <Col lg={3} md={6} className={`text-center ${className}`}>
      <div 
        className="contact-card"
        data-aos="fade-up"
        data-aos-delay={animationDelay}
      >
        <div 
          className="contact-card__icon"
          style={{ background: iconGradient }}
        >
          {icon}
        </div>
        <h6 className="contact-card__title">{title}</h6>
        <div className="contact-card__content">
          {typeof content === 'string' ? (
            <p className="mb-0">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </Col>
  );
};

export default ContactCard;
