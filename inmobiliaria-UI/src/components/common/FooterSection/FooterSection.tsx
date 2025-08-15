/**
 * FooterSection - Componente reutilizable para secciones del footer con listas
 * Usado en footer para mostrar enlaces organizados por categorías
 */

import React from 'react';
import { Col } from 'react-bootstrap';
import './FooterSection.styles.css';

export interface FooterLink {
  /** Texto del enlace */
  text: string;
  /** URL del enlace */
  href?: string;
  /** Función onClick personalizada */
  onClick?: () => void;
}

export interface FooterSectionProps {
  /** Título de la sección */
  title: string;
  /** Lista de enlaces */
  links: FooterLink[];
  /** Ancho de la columna (lg breakpoint) */
  lgWidth?: number;
  /** Ancho de la columna (md breakpoint) */
  mdWidth?: number;
  /** Clases CSS adicionales */
  className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  links,
  lgWidth = 2,
  mdWidth = 6,
  className = ''
}) => {
  const handleLinkClick = (link: FooterLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.href) {
      if (link.href.startsWith('#')) {
        // Scroll interno
        const element = document.querySelector(link.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Enlace externo
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <Col lg={lgWidth} md={mdWidth} className={className}>
      <div className="footer-section">
        <h6 className="footer-section__title">{title}</h6>
        <ul className="footer-section__list">
          {links.map((link, index) => (
            <li key={index} className="footer-section__item">
              <button
                type="button"
                className="footer-section__link"
                onClick={() => handleLinkClick(link)}
              >
                {link.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Col>
  );
};

export default FooterSection;
