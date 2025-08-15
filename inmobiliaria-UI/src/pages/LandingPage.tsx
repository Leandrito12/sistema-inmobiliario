import React from 'react';

// Componentes de la landing page
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import Services from '../components/Services';
import Footer from '../components/Footer';

/**
 * LandingPage - Página principal del sitio inmobiliario
 * 
 * Estructura:
 * - Hero: Sección principal con call-to-action
 * - FeaturedProperties: Propiedades destacadas
 * - Services: Servicios que ofrecemos
 * - Footer: Información de contacto y enlaces
 */
const LandingPage: React.FC = () => {
  return (
    <>
      {/* Sección Hero */}
      <Hero />
      
      {/* Propiedades Destacadas */}
      <FeaturedProperties />
      
      {/* Servicios */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default LandingPage;
