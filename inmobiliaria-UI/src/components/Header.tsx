import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        padding: '1rem 0',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link}
          to="/" 
          className="fw-bold d-flex align-items-center"
          style={{ 
            color: '#6f42c1', 
            fontSize: '1.8rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            borderRadius: '15px',
            padding: '5px 10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = 'rgba(111, 66, 193, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FaHome className="me-2" style={{ color: '#ff6b35' }} />
          InmobiliariaPlus
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link}
              to="/"
              className="fw-semibold mx-2"
              style={{ 
                color: '#333',
                transition: 'all 0.3s ease',
                borderRadius: '20px',
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6f42c1';
                e.currentTarget.style.backgroundColor = 'rgba(111, 66, 193, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link}
              to="/propiedades"
              className="fw-semibold mx-2"
              style={{ 
                color: '#333',
                transition: 'all 0.3s ease',
                borderRadius: '20px',
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6f42c1';
                e.currentTarget.style.backgroundColor = 'rgba(111, 66, 193, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Propiedades
            </Nav.Link>
            <Nav.Link 
              href="#servicios" 
              className="fw-semibold mx-2"
              style={{ 
                color: '#333',
                transition: 'all 0.3s ease',
                borderRadius: '20px',
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6f42c1';
                e.currentTarget.style.backgroundColor = 'rgba(111, 66, 193, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Servicios
            </Nav.Link>
            <Nav.Link 
              href="#contacto" 
              className="fw-semibold mx-2"
              style={{ 
                color: '#333',
                transition: 'all 0.3s ease',
                borderRadius: '20px',
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6f42c1';
                e.currentTarget.style.backgroundColor = 'rgba(111, 66, 193, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contacto
            </Nav.Link>
          </Nav>
          
          {/* Botones para vista de escritorio */}
          <div className="d-none d-lg-flex align-items-center">
            <Button 
              variant="outline-primary"
              className="me-2 fw-bold"
              style={{
                borderColor: '#6f42c1',
                color: '#6f42c1',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6f42c1';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(111, 66, 193, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6f42c1';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => window.open('tel:5491112345678', '_self')}
            >
              <FaPhone className="me-2" />
              Llamar
            </Button>
            <Button 
              className="fw-bold"
              style={{
                background: 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #8a5bd1 0%, #ff7d4d 100%)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(111, 66, 193, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                const subject = encodeURIComponent("Consulta general desde el sitio web");
                const body = encodeURIComponent("Hola, estoy interesado/a en sus servicios y me gustaría recibir más información.\n\nGracias.");
                window.open(`mailto:info@inmobiliariaplus.com?subject=${subject}&body=${body}`, '_self');
              }}
            >
              <FaEnvelope className="me-2" />
              Email
            </Button>
          </div>

          {/* Botones para vista móvil (dentro del menú) */}
          <div className="d-lg-none mt-3">
            <Button 
              className="w-100 mb-2 fw-bold"
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                border: 'none',
                transition: 'all 0.3s ease',
                borderRadius: '25px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #34ce57 0%, #2dd4aa 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(40, 167, 69, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => window.open('tel:5491112345678', '_self')}
            >
              <FaPhone className="me-2" />
              Llamar
            </Button>
            <Button 
              className="w-100 fw-bold"
              style={{
                background: 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)',
                border: 'none',
                transition: 'all 0.3s ease',
                borderRadius: '25px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #8a5bd1 0%, #ff7d4d 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(111, 66, 193, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                const subject = encodeURIComponent("Consulta general desde el sitio web");
                const body = encodeURIComponent("Hola, estoy interesado/a en sus servicios y me gustaría recibir más información.\n\nGracias.");
                window.open(`mailto:info@inmobiliariaplus.com?subject=${subject}&body=${body}`, '_self');
              }}
            >
              <FaEnvelope className="me-2" />
              Email
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
