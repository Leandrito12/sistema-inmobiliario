import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { API_ENDPOINTS, apiRequest } from '../config/api';

interface LoginData {
  email: string;
  password: string;
}

interface ErrorModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-custom shadow-custom">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-danger">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Error de Autenticación
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pt-2">
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <Button 
              variant="outline-danger" 
              onClick={onClose}
              className="rounded-pill px-4"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);

    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage - corregir acceso a los datos
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        
        // Redireccionar al dashboard
        navigate('/admin/dashboard');
      } else {
        setErrorMessage(data.message || 'Error al iniciar sesión');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error de conexión. Verifique que el servidor esté ejecutándose.');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative">
      {/* Elementos decorativos de fondo */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <div 
          className="blur-circle position-absolute gradient-primary rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="blur-circle position-absolute gradient-secondary rounded-circle"
          style={{
            width: '250px',
            height: '250px',
            bottom: '10%',
            right: '10%',
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      <Container className="position-relative">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-custom rounded-custom border-0 overflow-hidden">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle gradient-primary mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-user-shield text-white fs-2"></i>
                  </div>
                  <h2 className="fw-bold text-gradient mb-2">Panel de Administración</h2>
                  <p className="text-muted">Acceso exclusivo para administradores</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="admin@inmobiliaria.com"
                      className="rounded-pill px-4 py-3"
                      style={{ border: '2px solid #e9ecef' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="rounded-pill px-4 py-3"
                      style={{ border: '2px solid #e9ecef' }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 rounded-pill py-3 fw-bold gradient-primary border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    <i className="fas fa-shield-alt me-1"></i>
                    Área restringida - Solo administradores
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Error */}
      <ErrorModal 
        show={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default AdminLogin;
