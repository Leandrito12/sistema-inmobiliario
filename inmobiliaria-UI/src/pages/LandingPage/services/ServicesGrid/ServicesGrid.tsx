/**
 * ServicesGrid - Componente para mostrar la grilla de servicios
 * Utiliza iteración para renderizar dinámicamente todos los servicios
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { 
  FaHome, 
  FaSearch, 
  FaHandshake, 
  FaCalculator, 
  FaShieldAlt, 
  FaUsers 
} from 'react-icons/fa';
import { ServiceCard } from '../../../../components/common';
import { servicesData } from '../servicesData';
import type { Service } from '../servicesData';
import './ServicesGrid.styles.css';

// Mapeo de nombres de iconos a componentes
const iconMap = {
  FaHome: FaHome,
  FaSearch: FaSearch,
  FaHandshake: FaHandshake,
  FaCalculator: FaCalculator,
  FaShieldAlt: FaShieldAlt,
  FaUsers: FaUsers
};

const ServicesGrid: React.FC = () => {
  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Servicio seleccionado: ${serviceTitle}`);
    // Aquí podrías agregar lógica para mostrar más detalles del servicio
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <Row className="g-4 services-grid">
      {servicesData.map((service: Service, index: number) => (
        <Col lg={4} md={6} key={service.id} className="services-grid-item">
          <ServiceCard
            title={service.title}
            description={service.description}
            icon={getIconComponent(service.iconName)}
            color={service.color}
            onClick={() => handleServiceClick(service.title)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="h-100"
          />
        </Col>
      ))}
    </Row>
  );
};

export default ServicesGrid;
