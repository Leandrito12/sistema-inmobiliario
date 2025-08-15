/**
 * FooterBottom - Sección inferior del Footer
 * Contiene copyright y mensaje adicional
 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './FooterBottom.styles.css';

/**
 * Props del componente FooterBottom
 */
export interface FooterBottomProps {
  /** Clases CSS adicionales */
  className?: string;
  /** Año del copyright */
  year?: number;
  /** Nombre de la empresa */
  companyName?: string;
  /** Mensaje personalizado */
  customMessage?: string;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ 
  className = '',
  year = new Date().getFullYear(),
  companyName = 'InmobiliariaPlus',
  customMessage = 'Hecho con ❤️ para encontrar tu hogar perfecto'
}) => {
  return (
    <div className={`footer-bottom ${className}`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <Container className="py-3">
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0" style={{ opacity: 0.8 }}>
              © {year} {companyName}. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0" style={{ opacity: 0.8 }}>
              {customMessage}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterBottom;
