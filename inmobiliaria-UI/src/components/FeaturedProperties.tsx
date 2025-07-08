import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaCamera } from 'react-icons/fa';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  type: string;
}

const FeaturedProperties: React.FC = () => {
  const properties: Property[] = [
    {
      id: 1,
      title: "Casa Moderna en Zona Residencial",
      price: "$450,000",
      location: "Zona Norte, Ciudad",
      bedrooms: 4,
      bathrooms: 3,
      area: "280 m²",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa"
    },
    {
      id: 2,
      title: "Apartamento de Lujo con Vista",
      price: "$320,000",
      location: "Centro, Ciudad",
      bedrooms: 3,
      bathrooms: 2,
      area: "150 m²",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
      featured: true,
      type: "Apartamento"
    },
    {
      id: 3,
      title: "Villa con Piscina y Jardín",
      price: "$750,000",
      location: "Zona Exclusiva, Ciudad",
      bedrooms: 5,
      bathrooms: 4,
      area: "420 m²",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
      featured: true,
      type: "Villa"
    }
  ];

  return (
    <section 
      id="propiedades" 
      className="py-5"
      style={{ 
        backgroundColor: '#f8f9fa',
        position: 'relative'
      }}
    >
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="display-4 fw-bold text-dark mb-3">
            Propiedades <span style={{ color: '#6f42c1' }}>Destacadas</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Descubre nuestra selección exclusiva de propiedades premium, 
            cuidadosamente elegidas para satisfacer tus necesidades y estilo de vida.
          </p>
        </div>

        <Row className="g-4">
          {properties.map((property, index) => (
            <Col lg={4} md={6} key={property.id}>
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
                      backgroundImage: `url(${property.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="position-absolute top-0 start-0 p-3">
                    {property.featured && (
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
                  <div className="position-absolute top-0 end-0 p-3">
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaHeart />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaCamera />
                    </Button>
                  </div>
                  <div className="position-absolute bottom-0 start-0 p-3">
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
                      {property.type}
                    </Badge>
                  </div>
                </div>

                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
                      {property.title}
                    </h5>
                    <h4 className="fw-bold text-primary mb-0">
                      {property.price}
                    </h4>
                  </div>

                  <div className="d-flex align-items-center text-muted mb-3">
                    <FaMapMarkerAlt className="me-2" style={{ color: '#ff6b35' }} />
                    <span>{property.location}</span>
                  </div>

                  <Row className="g-3 mb-4">
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBed style={{ color: '#6f42c1', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Habitaciones</small>
                        <div className="fw-bold">{property.bedrooms}</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBath style={{ color: '#17a2b8', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Baños</small>
                        <div className="fw-bold">{property.bathrooms}</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaRulerCombined style={{ color: '#28a745', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Área</small>
                        <div className="fw-bold">{property.area}</div>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    <Link 
                      to={`/propiedad/${property.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button 
                        variant="outline-primary" 
                        className="fw-bold w-100"
                        style={{
                          borderColor: '#6f42c1',
                          color: '#6f42c1',
                          borderWidth: '2px',
                          borderRadius: '25px'
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
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
