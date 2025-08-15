/**
 * ContactSection - Sección de contacto del Footer
 * Contiene las tarjetas de contacto y botones de acción
 */

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp 
} from 'react-icons/fa';
import { Button, ContactCard } from '../../../../components/common';
import { 
  contactInfo,
  whatsappConfig,
  emailConfig,
  contactCardsConfig
} from '../footerData';
import './ContactSection.styles.css';

/**
 * Props del componente ContactSection
 */
export interface ContactSectionProps {
  /** Clases CSS adicionales */
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  className = '' 
}) => {
  
  // Función para obtener el icono correcto según el tipo
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone': return <FaPhone />;
      case 'envelope': return <FaEnvelope />;
      case 'location': return <FaMapMarkerAlt />;
      case 'whatsapp': return <FaWhatsapp />;
      default: return <FaPhone />;
    }
  };

  // Función para obtener el contenido dinámico según el tipo
  const getContent = (contentType: string) => {
    switch (contentType) {
      case 'phones':
        return (
          <p className="mb-0" style={{ opacity: 0.9 }}>
            {contactInfo.phones.join(' / ')}
          </p>
        );
      case 'emails':
        return (
          <p className="mb-0" style={{ opacity: 0.9 }}>
            {contactInfo.emails.join(' / ')}
          </p>
        );
      case 'address':
        return (
          <p className="mb-0" style={{ opacity: 0.9 }}>
            {contactInfo.address.street}<br />
            {contactInfo.address.location}
          </p>
        );
      case 'whatsapp':
        return (
          <p className="mb-0" style={{ opacity: 0.9 }}>
            {contactInfo.whatsapp.number}<br />
            {contactInfo.whatsapp.description}
          </p>
        );
      default:
        return <p className="mb-0">Información no disponible</p>;
    }
  };

  return (
    <section className={`contact-section py-5 ${className}`}>
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="display-4 fw-bold mb-3">
            ¿Listo para encontrar tu <span style={{ color: '#ff6b35' }}>hogar ideal</span>?
          </h2>
          <p className="lead mb-4" style={{ opacity: 0.9 }}>
            Contáctanos hoy mismo y comienza tu viaje hacia la propiedad perfecta
          </p>
        </div>

        <Row className="g-4 mb-5">
          {contactCardsConfig.map((cardConfig) => (
            <ContactCard
              key={cardConfig.id}
              icon={getIcon(cardConfig.iconName)}
              title={cardConfig.title}
              content={getContent(cardConfig.contentType)}
              iconGradient={cardConfig.iconGradient}
              animationDelay={cardConfig.animationDelay}
            />
          ))}
        </Row>

        <div className="text-center" data-aos="fade-up">
          <div className="d-grid gap-3 d-md-flex justify-content-md-center">
            <Button 
              size="lg" 
              className="fw-bold px-5 py-3"
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
              onClick={() => window.open(`https://wa.me/${whatsappConfig.number}`, '_blank')}
            >
              <FaWhatsapp className="me-2" />
              Contactar por WhatsApp
            </Button>
            <Button 
              variant="outline-light" 
              size="lg" 
              className="fw-bold px-5 py-3"
              style={{
                borderWidth: '2px',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
              onClick={() => {
                const subject = encodeURIComponent(emailConfig.subject);
                const body = encodeURIComponent(emailConfig.body);
                window.open(`mailto:${emailConfig.address}?subject=${subject}&body=${body}`, '_self');
              }}
            >
              <FaEnvelope className="me-2" />
              Enviar Email
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
