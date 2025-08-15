import React from 'react';
import { Section } from '../../../components/common';
import ServicesHeader from './ServicesHeader';
import ServicesGrid from './ServicesGrid';
import ServicesCTA from './ServicesCTA';
import { servicesConfig } from './servicesData';

/**
 * Componente Services - Sección modularizada de servicios
 * Utiliza componentes modulares para mejor organización y mantenibilidad
 */
const Services: React.FC = () => {
  return (
    <Section 
      id={servicesConfig.id} 
      background={servicesConfig.background}
      hasDecorations={servicesConfig.hasDecorations}
      themeColor={servicesConfig.themeColor}
    >
      {/* Encabezado de la sección */}
      <ServicesHeader />

      {/* Grilla de servicios */}
      <ServicesGrid />

      {/* Call to Action */}
      <ServicesCTA />
    </Section>
  );
};

export default Services;
