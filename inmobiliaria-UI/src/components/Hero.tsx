import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <section 
      className="hero-section d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 50%, #ff6b35 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 107, 53, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />

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
              
              <div className="d-flex flex-wrap gap-3">
                <Link to="/propiedades" style={{ textDecoration: 'none' }}>
                  <Button 
                    size="lg" 
                    className="fw-bold px-4 py-3"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '1.1rem'
                    }}
                  >
                    <FaSearch className="me-2" />
                    Buscar Propiedades
                  </Button>
                </Link>
                <Link to="/propiedades" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="fw-bold px-4 py-3"
                    style={{
                      borderWidth: '2px',
                      borderRadius: '50px',
                      fontSize: '1.1rem'
                    }}
                  >
                    Ver Catálogo
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
