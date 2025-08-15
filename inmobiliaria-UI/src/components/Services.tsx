import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { 
  FaHome, 
  FaSearch, 
  FaHandshake, 
  FaCalculator, 
  FaShieldAlt, 
  FaUsers 
} from 'react-icons/fa';
import Section from './common/Section';
import ServiceCard from './common/ServiceCard';
import Button from './common/Button';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * Componente Services - Muestra los servicios ofrecidos
 * Utiliza componentes reutilizables para mantener consistencia
 */
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

  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Servicio seleccionado: ${serviceTitle}`);
    // Aquí podrías agregar lógica para mostrar más detalles del servicio
  };

  const handleConsultaClick = () => {
    console.log('Solicitud de consulta gratuita');
    // Aquí podrías agregar lógica para abrir un formulario de contacto
  };

  return (
    <Section 
      id="servicios" 
      background="#ffffff"
      hasDecorations
      themeColor="#6f42c1"
    >
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
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              onClick={() => handleServiceClick(service.title)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            />
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
              <Button
                variant="light"
                size="lg"
                onClick={handleConsultaClick}
                rounded
                className="fw-bold px-5 py-3"
                style={{
                  fontSize: '1.1rem',
                  color: '#6f42c1'
                }}
              >
                Consulta Gratuita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;
