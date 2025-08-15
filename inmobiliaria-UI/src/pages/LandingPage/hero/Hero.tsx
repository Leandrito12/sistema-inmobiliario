import React from 'react';
import HeroMain from './HeroMain';
import { heroConfig } from './heroData';

/**
 * Componente Hero - Sección principal de la landing page
 * Utiliza componentes modulares para mejor organización
 */
const Hero: React.FC = () => {
  return (
    <section 
      className="hero-section d-flex align-items-center"
      style={{
        background: heroConfig.background,
        minHeight: heroConfig.minHeight,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div 
        style={{
          position: 'absolute',
          top: heroConfig.decorativeElements.primary.top,
          right: heroConfig.decorativeElements.primary.right,
          width: heroConfig.decorativeElements.primary.width,
          height: heroConfig.decorativeElements.primary.height,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: heroConfig.decorativeElements.primary.opacity
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: heroConfig.decorativeElements.secondary.bottom,
          left: heroConfig.decorativeElements.secondary.left,
          width: heroConfig.decorativeElements.secondary.width,
          height: heroConfig.decorativeElements.secondary.height,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: heroConfig.decorativeElements.secondary.opacity
        }}
      />

      {/* Contenido principal */}
      <HeroMain />
    </section>
  );
};

export default Hero;
