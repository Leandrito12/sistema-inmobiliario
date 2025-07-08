import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  FaHome, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin,
  FaWhatsapp
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer 
      id="contacto"
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white'
      }}
    >
      {/* Sección de contacto */}
      <section className="py-5">
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
            <Col lg={3} md={6} className="text-center">
              <div 
                className="contact-item p-4 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div 
                  className="contact-icon mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                    fontSize: '1.5rem'
                  }}
                >
                  <FaPhone />
                </div>
                <h6 className="fw-bold mb-2">Teléfono</h6>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  +1 (555) 123-4567<br />
                  +1 (555) 987-6543
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="text-center">
              <div 
                className="contact-item p-4 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div 
                  className="contact-icon mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                    fontSize: '1.5rem'
                  }}
                >
                  <FaEnvelope />
                </div>
                <h6 className="fw-bold mb-2">Email</h6>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  info@inmobiliariaplus.com<br />
                  ventas@inmobiliariaplus.com
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="text-center">
              <div 
                className="contact-item p-4 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div 
                  className="contact-icon mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    fontSize: '1.5rem'
                  }}
                >
                  <FaMapMarkerAlt />
                </div>
                <h6 className="fw-bold mb-2">Ubicación</h6>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  Av. Principal 123<br />
                  Centro, Ciudad
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="text-center">
              <div 
                className="contact-item p-4 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div 
                  className="contact-icon mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    fontSize: '1.5rem'
                  }}
                >
                  <FaWhatsapp />
                </div>
                <h6 className="fw-bold mb-2">WhatsApp</h6>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  +1 (555) 123-4567<br />
                  Chat 24/7
                </p>
              </div>
            </Col>
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
                onClick={() => window.open('https://wa.me/5491112345678', '_blank')}
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
                  const subject = encodeURIComponent("Consulta general desde el sitio web");
                  const body = encodeURIComponent("Hola, estoy interesado/a en sus servicios y me gustaría recibir más información.\n\nGracias.");
                  window.open(`mailto:info@inmobiliariaplus.com?subject=${subject}&body=${body}`, '_self');
                }}
              >
                <FaEnvelope className="me-2" />
                Enviar Email
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer principal */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <Container className="py-5">
          <Row className="g-4">
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
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <FaFacebook />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <FaInstagram />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <FaTwitter />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <FaLinkedin />
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Servicios</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Compra de Propiedades
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Venta de Inmuebles
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Asesoría Legal
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Financiamiento
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Propiedades</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Casas
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Apartamentos
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Villas
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Terrenos
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Empresa</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Sobre Nosotros
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Nuestro Equipo
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Testimonios
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Blog
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Términos de Uso
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Política de Privacidad
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Cookies
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none" style={{ opacity: 0.9 }}>
                    Contacto
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer bottom */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <Container className="py-3">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0" style={{ opacity: 0.8 }}>
                © 2025 InmobiliariaPlus. Todos los derechos reservados.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="mb-0" style={{ opacity: 0.8 }}>
                Hecho con ❤️ para encontrar tu hogar perfecto
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
