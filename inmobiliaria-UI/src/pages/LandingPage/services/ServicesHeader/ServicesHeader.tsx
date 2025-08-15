/**
 * ServicesHeader - Componente para el encabezado de la sección de servicios
 * Muestra el título principal y la descripción de los servicios
 */

import React from 'react';
import { servicesHeader } from '../servicesData';
import './ServicesHeader.styles.css';

const ServicesHeader: React.FC = () => {
  return (
    <div className="text-center mb-5" data-aos="fade-up">
      <h2 className="display-4 fw-bold text-dark mb-3 services-header-title">
        {servicesHeader.title}{' '}
        <span className="services-header-subtitle">
          {servicesHeader.subtitle}
        </span>
      </h2>
      <p className="lead text-muted mx-auto services-header-description">
        {servicesHeader.description}
      </p>
    </div>
  );
};

export default ServicesHeader;
