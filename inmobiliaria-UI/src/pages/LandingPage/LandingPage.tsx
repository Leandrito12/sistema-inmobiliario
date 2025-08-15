import React from 'react';

// Componentes de la landing page
import Hero from './hero';
import Services from './services';
import Footer from './footer';

/**
 * LandingPage - Página principal del sitio inmobiliario
 * 
 * Estructura:
 * - Hero: Sección principal con call-to-action
 * - Services: Servicios que ofrecemos
 * - Footer: Información de contacto y enlaces
 */
const LandingPage: React.FC = () => {
  return (
    <>
      {/* Sección Hero */}
      <Hero />
      
      {/* Servicios */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default LandingPage;
