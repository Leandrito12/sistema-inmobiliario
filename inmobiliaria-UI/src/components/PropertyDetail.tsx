import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  type: string;
  features: string[];
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      // Simular carga de datos
      const mockProperty: Property = {
        id: parseInt(id || '1'),
        title: 'Casa Moderna en Zona Residencial Premium',
        price: 450000,
        location: 'Barrio Norte, Buenos Aires',
        bedrooms: 4,
        bathrooms: 3,
        area: 350,
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        description: 'Hermosa casa moderna con excelente ubicación en zona residencial premium. Cuenta con amplios espacios, jardín y terminaciones de primera calidad. La propiedad se encuentra en una zona muy tranquila y segura, ideal para familias que buscan comodidad y calidad de vida.',
        type: 'casa',
        features: [
          'Jardín',
          'Garage',
          'Piscina',
          'Parrilla',
          'Seguridad 24hs',
          'Calefacción central',
          'Aire acondicionado',
          'Cocina equipada'
        ]
      };
      
      setProperty(mockProperty);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar la propiedad:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ paddingTop: '100px' }}>
        <Container className="py-5">
          <div className="text-center">
            <h3 className="text-muted mb-4">Propiedad no encontrada</h3>
            <Button 
              variant="primary" 
              onClick={() => navigate('/propiedades')}
              className="rounded-pill gradient-primary border-0"
            >
              <FaArrowLeft className="me-2" />
              Volver a Propiedades
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light" style={{ paddingTop: '100px' }}>
      <Container className="py-4">
        {/* Botón volver */}
        <div className="mb-4">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/propiedades')}
            className="rounded-pill"
          >
            <FaArrowLeft className="me-2" />
            Volver a Propiedades
          </Button>
        </div>

        <Row>
          <Col lg={8}>
            {/* Galería de Imágenes */}
            <Card className="rounded-custom shadow-custom border-0 mb-4">
              <Carousel className="rounded-custom">
                {property.images.map((image: string, index: number) => (
                  <Carousel.Item key={index}>
                    <div
                      style={{
                        height: '400px',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '15px'
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>

            {/* Información Principal */}
            <Card className="rounded-custom shadow-custom border-0 mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Badge bg="primary" className="mb-2 rounded-pill">
                      {property.type}
                    </Badge>
                    <h1 className="fw-bold mb-2">{property.title}</h1>
                    <p className="text-muted mb-0">
                      <FaMapMarkerAlt className="me-2" />
                      {property.location}
                    </p>
                  </div>
                  <h2 className="fw-bold text-primary mb-0">
                    {formatPrice(property.price)}
                  </h2>
                </div>

                <Row className="mb-4">
                  <Col md={4}>
                    <div className="text-center p-3 bg-light rounded-custom">
                      <FaBed className="text-primary fs-3 mb-2" />
                      <h5 className="fw-bold mb-1">{property.bedrooms}</h5>
                      <small className="text-muted">Habitaciones</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3 bg-light rounded-custom">
                      <FaBath className="text-primary fs-3 mb-2" />
                      <h5 className="fw-bold mb-1">{property.bathrooms}</h5>
                      <small className="text-muted">Baños</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3 bg-light rounded-custom">
                      <FaRulerCombined className="text-primary fs-3 mb-2" />
                      <h5 className="fw-bold mb-1">{property.area}</h5>
                      <small className="text-muted">m²</small>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h4 className="fw-bold mb-3">Descripción</h4>
                  <p className="text-muted line-height-lg">{property.description}</p>
                </div>

                <div>
                  <h4 className="fw-bold mb-3">Características</h4>
                  <Row>
                    {property.features.map((feature: string, index: number) => (
                      <Col md={6} key={index} className="mb-2">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center"
                               style={{ width: '8px', height: '8px' }}>
                          </div>
                          <span>{feature}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Información de Contacto */}
            <Card className="rounded-custom shadow-custom border-0 mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Contactar Agente</h4>
                
                <div className="text-center mb-4">
                  <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-user text-white fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-1">Agente Inmobiliario</h5>
                  <p className="text-muted mb-0">Especialista en la zona</p>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    className="rounded-pill gradient-primary border-0"
                    onClick={() => window.open('tel:+541123456789', '_self')}
                  >
                    <i className="fas fa-phone me-2"></i>
                    Llamar Ahora
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="rounded-pill"
                    onClick={() => window.open('mailto:info@inmobiliaria.com', '_self')}
                  >
                    <i className="fas fa-envelope me-2"></i>
                    Enviar Email
                  </Button>
                  <Button 
                    variant="outline-success" 
                    className="rounded-pill"
                    onClick={() => window.open('https://wa.me/541123456789', '_blank')}
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    WhatsApp
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Información Adicional */}
            <Card className="rounded-custom shadow-custom border-0">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Información Adicional</h4>
                
                <div className="mb-3">
                  <strong>Código de Propiedad:</strong>
                  <span className="ms-2 text-muted">#{property.id.toString().padStart(4, '0')}</span>
                </div>
                
                <div className="mb-3">
                  <strong>Precio por m²:</strong>
                  <span className="ms-2 text-muted">
                    {formatPrice(Math.round(property.price / property.area))}
                  </span>
                </div>
                
                <div className="mb-3">
                  <strong>Tipo de Propiedad:</strong>
                  <span className="ms-2 text-muted text-capitalize">{property.type}</span>
                </div>
                
                <div className="text-center pt-3 border-top">
                  <small className="text-muted">
                    <i className="fas fa-clock me-1"></i>
                    Actualizado recientemente
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PropertyDetail;