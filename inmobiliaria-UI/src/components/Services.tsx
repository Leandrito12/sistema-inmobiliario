import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaHome, 
  FaSearch, 
  FaHandshake, 
  FaCalculator, 
  FaShieldAlt, 
  FaUsers 
} from 'react-icons/fa';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Compra de Propiedades",
      description: "Te ayudamos a encontrar la propiedad perfecta que se ajuste a tu presupuesto y necesidades.",
      icon: <FaHome />,
      color: '#6f42c1'
    },
    {
      id: 2,
      title: "Venta de Inmuebles",
      description: "Maximiza el valor de tu propiedad con nuestra estrategia de marketing especializada.",
      icon: <FaSearch />,
      color: '#ff6b35'
    },
    {
      id: 3,
      title: "Asesoría Legal",
      description: "Proceso de compra-venta seguro con asesoría legal completa y documentación en regla.",
      icon: <FaShieldAlt />,
      color: '#28a745'
    },
    {
      id: 4,
      title: "Financiamiento",
      description: "Conectamos con las mejores opciones de crédito hipotecario para hacer realidad tu inversión.",
      icon: <FaCalculator />,
      color: '#17a2b8'
    },
    {
      id: 5,
      title: "Negociación",
      description: "Nuestros expertos negocian en tu nombre para obtener las mejores condiciones del mercado.",
      icon: <FaHandshake />,
      color: '#ffc107'
    },
    {
      id: 6,
      title: "Atención Personalizada",
      description: "Servicio al cliente 24/7 con un equipo dedicado que te acompañará en todo el proceso.",
      icon: <FaUsers />,
      color: '#e83e8c'
    }
  ];

  return (
    <section 
      id="servicios" 
      className="py-5"
      style={{ 
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      {/* Elementos decorativos */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '0',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, #6f42c1, #ff6b35)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(60px)'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '0',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #ff6b35, #6f42c1)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(40px)'
        }}
      />

      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="display-4 fw-bold text-dark mb-3">
            Nuestros <span style={{ color: '#6f42c1' }}>Servicios</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Ofrecemos una gama completa de servicios inmobiliarios diseñados 
            para hacer tu experiencia más fácil, segura y exitosa.
          </p>
        </div>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={service.id}>
              <Card 
                className="service-card h-100 border-0 shadow-sm"
                style={{ 
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card.Body className="p-4 text-center">
                  <div 
                    className="service-icon mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}25 100%)`,
                      color: service.color,
                      fontSize: '2rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {service.icon}
                  </div>
                  
                  <h5 className="fw-bold text-dark mb-3">
                    {service.title}
                  </h5>
                  
                  <p className="text-muted mb-0" style={{ lineHeight: 1.6 }}>
                    {service.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div 
                className="p-5 rounded"
                style={{
                  background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                  color: 'white'
                }}
              >
                <h3 className="fw-bold mb-3">¿Listo para comenzar?</h3>
                <p className="mb-4 opacity-75">
                  Nuestro equipo de expertos está preparado para ayudarte en cada paso del camino. 
                  Desde la primera consulta hasta la entrega de llaves.
                </p>
                <button 
                  className="btn btn-light fw-bold px-5 py-3"
                  style={{
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    color: '#6f42c1'
                  }}
                >
                  Consulta Gratuita
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>
        {`
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
          }
          
          .service-card:hover .service-icon {
            transform: scale(1.1);
            box-shadow: 0 10px 30px rgba(111, 66, 193, 0.3);
          }
        `}
      </style>
    </section>
  );
};

export default Services;
