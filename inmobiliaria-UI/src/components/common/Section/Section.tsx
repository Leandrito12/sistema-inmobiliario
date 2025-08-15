import React from 'react';
import { Container } from 'react-bootstrap';
import './Section.styles.css';

/**
 * Props del componente Section
 */
export interface SectionProps {
  /** Contenido de la sección */
  children: React.ReactNode;
  /** ID único de la sección */
  id?: string;
  /** Clases CSS adicionales */
  className?: string;
  /** Estilos CSS inline adicionales */
  style?: React.CSSProperties;
  /** Color de fondo */
  background?: string;
  /** Si debe usar Container de Bootstrap */
  containerized?: boolean;
  /** Padding vertical */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Si tiene elementos decorativos de fondo */
  hasDecorations?: boolean;
  /** Color del tema para decoraciones */
  themeColor?: string;
  /** Posición relativa o absoluta */
  position?: 'relative' | 'static';
  /** Si permite overflow visible */
  overflow?: 'hidden' | 'visible';
}

/**
 * Section - Componente reutilizable para secciones de página
 * Proporciona estructura consistente y elementos decorativos opcionales
 */
const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  style = {},
  background,
  containerized = true,
  padding = 'lg',
  hasDecorations = false,
  themeColor = '#6f42c1',
  position = 'relative',
  overflow = 'hidden'
}) => {
  // Construir clases CSS
  const sectionClasses = [
    'custom-section',
    `custom-section--padding-${padding}`,
    hasDecorations && 'custom-section--decorated',
    className
  ].filter(Boolean).join(' ');

  const content = containerized ? (
    <Container style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </Container>
  ) : (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={sectionClasses}
      style={{
        background,
        position,
        overflow,
        ...style
      }}
    >
      {/* Elementos decorativos de fondo */}
      {hasDecorations && (
        <>
          <div 
            className="custom-section__decoration custom-section__decoration--primary"
            style={{
              background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)`
            }}
          />
          <div 
            className="custom-section__decoration custom-section__decoration--secondary"
            style={{
              background: `linear-gradient(135deg, ${themeColor}10 0%, ${themeColor}03 100%)`
            }}
          />
        </>
      )}

      {content}
    </section>
  );
};

export default Section;
