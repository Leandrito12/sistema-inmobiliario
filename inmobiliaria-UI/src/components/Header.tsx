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
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 0',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link}
          to="/" 
          className="fw-bold d-flex align-items-center"
          style={{ 
            color: scrolled ? '#6f42c1' : '#fff', 
            fontSize: '1.8rem',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
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
              style={{ color: scrolled ? '#333' : '#fff' }}
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link}
              to="/propiedades"
              className="fw-semibold mx-2"
              style={{ color: scrolled ? '#333' : '#fff' }}
            >
              Propiedades
            </Nav.Link>
            <Nav.Link 
              href="#servicios" 
              className="fw-semibold mx-2"
              style={{ color: scrolled ? '#333' : '#fff' }}
            >
              Servicios
            </Nav.Link>
            <Nav.Link 
              href="#contacto" 
              className="fw-semibold mx-2"
              style={{ color: scrolled ? '#333' : '#fff' }}
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
                borderColor: scrolled ? '#6f42c1' : '#fff',
                color: scrolled ? '#6f42c1' : '#fff',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1.5rem'
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
                padding: '0.5rem 1.5rem'
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
