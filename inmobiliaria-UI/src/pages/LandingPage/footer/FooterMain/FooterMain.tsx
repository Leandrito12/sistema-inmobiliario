/**
 * FooterMain - Sección principal del Footer
 * Contiene información de la empresa, redes sociales y enlaces organizados
 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaHome,
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin 
} from 'react-icons/fa';
import { SocialButton, FooterSection } from '../../../../components/common';
import { 
  servicesLinks, 
  propertiesLinks, 
  companyLinks, 
  legalLinks,
  socialLinks
} from '../footerData';
import './FooterMain.styles.css';

/**
 * Props del componente FooterMain
 */
export interface FooterMainProps {
  /** Clases CSS adicionales */
  className?: string;
}

const FooterMain: React.FC<FooterMainProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`footer-main ${className}`} style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <Container className="py-5">
        <Row className="g-4">
          {/* Sección de información de la empresa */}
          <Col lg={4} md={6}>
            <div className="mb-4">
              <h4 className="fw-bold d-flex align-items-center mb-3">
                <FaHome className="me-2" style={{ color: '#ff6b35' }} />
                InmobiliariaPlus
              </h4>
              <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                Somos una empresa líder en bienes raíces con más de 15 años de experiencia, 
                comprometidos en ayudarte a encontrar la propiedad perfecta que se adapte 
                a tu estilo de vida y presupuesto.
              </p>
              <div className="d-flex gap-3 mt-3">
                <SocialButton
                  icon={<FaFacebook />}
                  href={socialLinks.facebook}
                  ariaLabel="Seguir en Facebook"
                />
                <SocialButton
                  icon={<FaInstagram />}
                  href={socialLinks.instagram}
                  ariaLabel="Seguir en Instagram"
                />
                <SocialButton
                  icon={<FaTwitter />}
                  href={socialLinks.twitter}
                  ariaLabel="Seguir en Twitter"
                />
                <SocialButton
                  icon={<FaLinkedin />}
                  href={socialLinks.linkedin}
                  ariaLabel="Seguir en LinkedIn"
                />
              </div>
            </div>
          </Col>

          {/* Secciones de enlaces */}
          <FooterSection
            title="Servicios"
            links={servicesLinks}
          />

          <FooterSection
            title="Propiedades"
            links={propertiesLinks}
          />

          <FooterSection
            title="Empresa"
            links={companyLinks}
          />

          <FooterSection
            title="Legal"
            links={legalLinks}
          />
        </Row>
      </Container>
    </div>
  );
};

export default FooterMain;
