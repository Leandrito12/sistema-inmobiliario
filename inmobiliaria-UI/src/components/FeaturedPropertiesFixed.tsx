import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';

interface Property {
  _id: string;
  titulo: string;
  precio: number;
  moneda: string;
  ubicacion: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };
  caracteristicas: {
    habitaciones: number;
    baños: number;
    area: number;
  };
  imagenes: Array<{
    url: string;
    alt: string;
    esPortada: boolean;
  }>;
  tipo: string;
  estado: 'disponible' | 'vendido' | 'alquilado' | 'reservado';
  destacado: boolean;
}

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROPERTIES.BASE}/featured`);
      if (response.ok) {
        const result = await response.json();
        setProperties(result.data?.properties || []);
      } else {
        console.error('Error al cargar propiedades destacadas');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const currencySymbol = currency === 'USD' ? '$' : 
                           currency === 'EUR' ? '€' : 
                           currency === 'ARS' ? 'AR$' : 
                           currency === 'BRL' ? 'R$' : '$';
    
    return `${currencySymbol}${price.toLocaleString()}`;
  };

  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible': return 'primary';
      case 'vendido': return 'danger';
      case 'alquilado': return 'info';
      case 'reservado': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <section 
      className="py-5" 
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div 
        className="position-absolute" 
        style={{
          top: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(111, 66, 193, 0.1) 0%, rgba(72, 52, 212, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0
        }}
      />
      <div 
        className="position-absolute" 
        style={{
          bottom: '20%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(240, 147, 43, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-5" data-aos="fade-up">
          <div className="d-inline-block position-relative mb-4">
            <h2 className="display-5 fw-bold text-dark mb-0">
              Propiedades <span style={{ color: '#6f42c1' }}>Destacadas</span>
            </h2>
            <div 
              className="position-absolute bottom-0 start-50 translate-middle-x"
              style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)',
                borderRadius: '2px'
              }}
            />
          </div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Descubre nuestra selección exclusiva de propiedades premium, 
            cuidadosamente elegidas por su ubicación, calidad y valor excepcional.
          </p>
        </div>

        <Row className="g-4">
          {loading ? (
            <Col xs={12} className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando propiedades destacadas...</p>
            </Col>
          ) : properties.length === 0 ? (
            <Col xs={12} className="text-center py-5">
              <p className="text-muted">No hay propiedades destacadas disponibles en este momento.</p>
            </Col>
          ) : (
            properties.map((property, index) => (
              <Col lg={4} md={6} key={property._id}>
                <Card 
                  className="property-card h-100 border-0 shadow-sm"
                  style={{ 
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="position-relative">
                    <div
                      style={{
                        height: '250px',
                        backgroundImage: `url(${property.imagenes.find(img => img.esPortada)?.url || property.imagenes[0]?.url || '/placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    
                    {/* Overlay para propiedades no disponibles */}
                    {(property.estado === 'vendido' || property.estado === 'alquilado' || property.estado === 'reservado') && (
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: 'rgba(128, 128, 128, 0.7)',
                          zIndex: 2
                        }}
                      >
                        <div
                          className="text-white fw-bold text-center px-4 py-2"
                          style={{
                            backgroundColor: property.estado === 'vendido' ? 'rgba(220, 53, 69, 0.9)' : 
                                           property.estado === 'alquilado' ? 'rgba(40, 167, 69, 0.9)' : 
                                           'rgba(255, 193, 7, 0.9)',
                            borderRadius: '25px',
                            fontSize: '1.2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            border: '2px solid white',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {capitalizeStatus(property.estado)}
                        </div>
                      </div>
                    )}
                    
                    {/* Badges superiores */}
                    <div className="position-absolute top-0 start-0 p-3" style={{ zIndex: 3 }}>
                      <Badge 
                        bg={getStatusBadgeColor(property.estado)}
                        className="fw-bold me-2"
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px'
                        }}
                      >
                        {capitalizeStatus(property.estado)}
                      </Badge>
                      {property.destacado && (
                        <Badge 
                          className="fw-bold"
                          style={{
                            background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                            fontSize: '0.8rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px'
                          }}
                        >
                          Destacado
                        </Badge>
                      )}
                    </div>

                    {/* Botones superiores derecha */}
                    <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 3 }}>
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="rounded-circle me-2"
                        style={{ 
                          width: '40px', 
                          height: '40px',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaCamera style={{ fontSize: '0.9rem', color: '#6f42c1' }} />
                      </Button>
                    </div>

                    {/* Tipo de propiedad */}
                    <div className="position-absolute bottom-0 start-0 p-3" style={{ zIndex: 3 }}>
                      <Badge 
                        bg="dark" 
                        className="fw-bold"
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          backgroundColor: 'rgba(0,0,0,0.7) !important'
                        }}
                      >
                        {property.tipo}
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
                        {property.titulo}
                      </h5>
                      <h4 className="fw-bold text-primary mb-0">
                        {formatPrice(property.precio, property.moneda)}
                      </h4>
                    </div>

                    <div className="d-flex align-items-center text-muted mb-3">
                      <FaMapMarkerAlt className="me-2" style={{ color: '#ff6b35' }} />
                      <span>{property.ubicacion.direccion}, {property.ubicacion.ciudad}</span>
                    </div>

                    <Row className="g-3 mb-4">
                      <Col xs={4}>
                        <div className="text-center">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <FaBed style={{ color: '#6f42c1', fontSize: '1.2rem' }} />
                          </div>
                          <small className="text-muted">Habitaciones</small>
                          <div className="fw-bold">{property.caracteristicas.habitaciones}</div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="text-center">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <FaBath style={{ color: '#17a2b8', fontSize: '1.2rem' }} />
                          </div>
                          <small className="text-muted">Baños</small>
                          <div className="fw-bold">{property.caracteristicas.baños}</div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="text-center">
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <FaRulerCombined style={{ color: '#28a745', fontSize: '1.2rem' }} />
                          </div>
                          <small className="text-muted">Área</small>
                          <div className="fw-bold">{property.caracteristicas.area}m²</div>
                        </div>
                      </Col>
                    </Row>

                    <div className="d-grid">
                      <Link 
                        to={`/propiedad/${property._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button 
                          variant="outline-primary" 
                          className="fw-bold w-100"
                          style={{
                            borderColor: '#6f42c1',
                            color: '#6f42c1',
                            borderWidth: '2px',
                            borderRadius: '25px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <div className="text-center mt-5" data-aos="fade-up">
          <Link 
            to="/propiedades"
            style={{ textDecoration: 'none' }}
          >
            <Button 
              size="lg" 
              className="fw-bold px-5"
              style={{
                background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
            >
              Ver Todas las Propiedades
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProperties;
