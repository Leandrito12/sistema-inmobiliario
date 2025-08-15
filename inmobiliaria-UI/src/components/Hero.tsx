import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Section from './common/Section';
import Button from './common/Button';

/**
 * Componente Hero - Sección principal de la landing page
 * Utiliza componentes reutilizables para el diseño
 */
const Hero: React.FC = () => {
  return (
    <Section
      background="linear-gradient(135deg, #6f42c1 0%, #4834d4 50%, #ff6b35 100%)"
      hasDecorations
      padding="none"
      className="hero-section d-flex align-items-center"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container className="h-100" style={{ paddingTop: '80px' }}>
        <Row className="w-100 align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <Col lg={8} xl={6} className="text-white d-flex align-items-center justify-content-center">
            <div data-aos="fade-up" data-aos-duration="1000" className="w-100 text-center">
              <h1 
                className="display-3 fw-bold mb-4"
                style={{ 
                  lineHeight: '1.2',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)'
                }}
              >
                Tu <span style={{ color: '#ff6b35' }}>hogar</span> perfecto.
              </h1>
              <h1 
                className="display-3 fw-bold mb-4"
                style={{ 
                  lineHeight: '1.2',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)'
                }}
              >
                Tus <span style={{ color: '#ffd700' }}>sueños</span>.
              </h1>
              <h1 
                className="display-3 fw-bold mb-4"
                style={{ 
                  lineHeight: '1.2',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)'
                }}
              >
                Tu <span style={{ color: '#40E0D0' }}>manera</span>.
              </h1>
              
              <p className="lead mb-4 fs-5" style={{ opacity: 0.9 }}>
                Encuentra la propiedad de tus sueños con nuestra plataforma innovadora. 
                Simplifica tu búsqueda y toma decisiones con confianza.
              </p>
              
              <div className="d-flex justify-content-center">
                <Button
                  variant="gradient-primary"
                  size="lg"
                  icon={<FaSearch className="me-2" />}
                  to="/propiedades"
                  rounded
                  className="fw-bold px-5 py-3"
                  style={{
                    fontSize: '1.2rem'
                  }}
                >
                  Buscar Propiedades
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Hero;
