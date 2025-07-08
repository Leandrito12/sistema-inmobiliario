import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaHome, FaChartLine } from 'react-icons/fa';

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
          <Col lg={6} className="text-white d-flex align-items-center">
            <div data-aos="fade-right" data-aos-duration="1000" className="w-100">
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
          
          <Col lg={6} className="mt-5 mt-lg-0 d-none d-lg-flex align-items-center">
            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" className="w-100">
              <Card 
                className="shadow-lg border-0"
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold text-dark">Estadísticas del Mercado</h4>
                    <p className="text-muted">Últimos 30 días</p>
                  </div>
                  
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="stat-item p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <FaHome style={{ color: '#6f42c1', fontSize: '1.5rem' }} />
                            <h6 className="fw-bold mt-2 mb-1">Ventas</h6>
                            <h4 className="fw-bold text-primary">$2.5M</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">+15.4%</small>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="stat-item p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <FaMapMarkerAlt style={{ color: '#ff6b35', fontSize: '1.5rem' }} />
                            <h6 className="fw-bold mt-2 mb-1">Propiedades</h6>
                            <h4 className="fw-bold text-warning">847</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">+8.2%</small>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="stat-item p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <FaDollarSign style={{ color: '#28a745', fontSize: '1.5rem' }} />
                            <h6 className="fw-bold mt-2 mb-1">Precio Promedio</h6>
                            <h4 className="fw-bold text-success">$320K</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">+3.1%</small>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="stat-item p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <FaChartLine style={{ color: '#17a2b8', fontSize: '1.5rem' }} />
                            <h6 className="fw-bold mt-2 mb-1">Tendencia</h6>
                            <h4 className="fw-bold text-info">↗ Alcista</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">+12.8%</small>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      variant="primary" 
                      className="fw-bold px-4"
                      style={{
                        background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                        border: 'none',
                        borderRadius: '25px'
                      }}
                    >
                      Ver Análisis Completo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
