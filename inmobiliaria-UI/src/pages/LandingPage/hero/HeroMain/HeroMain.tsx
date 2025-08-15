/**
 * HeroMain - Sección principal del Hero
 * Contiene el título, descripción y botones de acción
 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { heroContent } from '../heroData';
import './HeroMain.styles.css';

/**
 * Props del componente HeroMain
 */
export interface HeroMainProps {
  /** Clases CSS adicionales */
  className?: string;
}

const HeroMain: React.FC<HeroMainProps> = ({ 
  className = '' 
}) => {
  const navigate = useNavigate();

  // Función para navegar a la página de propiedades
  const handleVerPropiedades = () => {
    navigate('/propiedades');
  };

  return (
    <div className={`hero-main ${className}`}>
      <Container>
        <Row className="align-items-center justify-content-center min-vh-100">
          <Col lg={8} xl={6} className="text-center">
            <div className="hero-content" data-aos="fade-up">
              <h1 className="display-2 fw-bold text-white mb-4">
                {heroContent.title.main}{' '}
                <span 
                  className="hero-highlight"
                  style={{ 
                    background: 'linear-gradient(45deg, #ff6b35, #f0932b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {heroContent.title.highlight}
                </span>
                <br />
                {heroContent.title.subtitle}
              </h1>
              
              <p className="lead text-white mb-5" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                {heroContent.description}
              </p>
              
              <div className="d-flex justify-content-center mb-5">
                <button 
                  className="btn btn-lg hero-btn-primary px-5 py-3 fw-bold"
                  onClick={handleVerPropiedades}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  title="Ir a la página de propiedades"
                >
                  <FaSearch className="me-2" />
                  Ver más propiedades
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroMain;
