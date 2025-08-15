import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Navbar, Nav, Dropdown, Form } from 'react-bootstrap';
import { API_ENDPOINTS, getAuthHeaders } from '../config/api';

interface Property {
  _id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: "casa" | "apartamento" | "oficina" | "local" | "terreno";
  operacion: "venta" | "alquiler";
  ubicacion: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  caracteristicas: {
    habitaciones?: number;
    baños?: number;
    area: number;
    estacionamientos?: number;
    antiguedad?: number;
  };
  imagenes: Array<{
    _id?: string;
    url: string;
    alt: string;
    orden: number;
    nombreArchivo: string;
    esPortada: boolean;
  }>;
  amenidades: string[];
  estado: "disponible" | "vendido" | "alquilado" | "reservado";
  destacado: boolean;
  fechaPublicacion: string;
  fechaActualizacion: string;
}

interface User {
  name: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData || userData === 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchProperties();
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
    }
  }, [navigate]);

  // Efecto para actualizar propiedades filtradas cuando cambie la lista de propiedades
  useEffect(() => {
    if (searchTerm) {
      filterProperties(searchTerm);
    } else {
      setFilteredProperties(properties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROPERTIES.BASE, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Extraer propiedades del formato de respuesta del backend
        let propertiesArray = [];
        if (Array.isArray(data)) {
          propertiesArray = data;
        } else if (data.data && Array.isArray(data.data.properties)) {
          propertiesArray = data.data.properties;
        } else if (data.data && Array.isArray(data.data)) {
          propertiesArray = data.data;
        } else {
          propertiesArray = [];
        }
        
        setProperties(propertiesArray);
        setFilteredProperties(propertiesArray);
      } else {
        console.error('Error al obtener propiedades:', response.status);
        setProperties([]);
        setFilteredProperties([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para filtrar propiedades basada en el término de búsqueda
  const filterProperties = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredProperties(properties);
      setShowSearchResults(false);
      return;
    }

    const filtered = properties.filter(property => {
      const searchLower = searchValue.toLowerCase();
      return (
        property.titulo.toLowerCase().includes(searchLower) ||
        property.descripcion.toLowerCase().includes(searchLower) ||
        property.tipo.toLowerCase().includes(searchLower) ||
        property.ubicacion.direccion.toLowerCase().includes(searchLower) ||
        property.ubicacion.ciudad.toLowerCase().includes(searchLower) ||
        property.ubicacion.estado.toLowerCase().includes(searchLower) ||
        property.estado.toLowerCase().includes(searchLower) ||
        property.amenidades.some(amenidad => 
          amenidad.toLowerCase().includes(searchLower)
        )
      );
    });

    setFilteredProperties(filtered);
    setShowSearchResults(true);
  };

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProperties(value);
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProperties(properties);
    setShowSearchResults(false);
  };

  // Función para resaltar texto en los resultados de búsqueda
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} style={{ backgroundColor: '#fff3cd', padding: '0 2px' }}>
          {part}
        </mark>
      ) : part
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta propiedad?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`http://localhost:5001/api/properties/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const updatedProperties = properties.filter(prop => prop._id !== id);
          setProperties(updatedProperties);
          setFilteredProperties(updatedProperties.filter(prop => 
            showSearchResults ? 
              filteredProperties.some(filtered => filtered._id === prop._id) : 
              true
          ));
        } else {
          alert('Error al eliminar la propiedad');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la propiedad');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/properties/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (response.ok) {
        // Actualizar el estado de la propiedad en ambas listas
        const updatedProperties = properties.map(prop => 
          prop._id === id 
            ? { ...prop, estado: newStatus as "disponible" | "vendido" | "alquilado" | "reservado" }
            : prop
        );
        setProperties(updatedProperties);
        
        // También actualizar las propiedades filtradas si hay una búsqueda activa
        if (showSearchResults) {
          const updatedFilteredProperties = filteredProperties.map(prop => 
            prop._id === id 
              ? { ...prop, estado: newStatus as "disponible" | "vendido" | "alquilado" | "reservado" }
              : prop
          );
          setFilteredProperties(updatedFilteredProperties);
        } else {
          setFilteredProperties(updatedProperties);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al cambiar el estado de la propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cambiar el estado de la propiedad');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      disponible: { bg: 'success', text: 'Disponible', icon: 'check-circle' },
      vendido: { bg: 'danger', text: 'Vendido', icon: 'handshake' },
      alquilado: { bg: 'warning', text: 'Alquilado', icon: 'key' },
      reservado: { bg: 'info', text: 'Reservado', icon: 'clock' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.disponible;
    
    return (
      <Badge bg={config.bg} className="rounded-pill">
        <i className={`fas fa-${config.icon} me-1`}></i>
        {config.text}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Función para obtener la URL de imagen correcta
  const getImageUrl = (property: Property) => {
    if (property.imagenes && property.imagenes.length > 0 && property.imagenes[0].url) {
      let url = property.imagenes[0].url;
      
      // Si la URL ya es completa (comienza con http), extraer solo la parte de uploads
      if (url.startsWith('http')) {
        const uploadIndex = url.indexOf('/uploads');
        if (uploadIndex !== -1) {
          url = url.substring(uploadIndex);
        }
      }
      
      // Corregir doble slash si existe
      if (url.includes('//uploads')) {
        url = url.replace('//uploads', '/uploads');
      }
      
      // Asegurar que la URL apunte al puerto correcto del backend (5001)
      const fullUrl = `http://localhost:5001${url}`;
      return fullUrl;
    }
    // Devolver undefined para usar placeholder integrado
    return undefined;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar de Admin */}
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-gradient">
            <i className="fas fa-home me-2"></i>
            Panel de Administración
          </Navbar.Brand>
          
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-primary" className="rounded-pill">
                <i className="fas fa-user me-2"></i>
                {user?.name || 'Admin'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <i className="fas fa-envelope me-2"></i>
                  {user?.email || 'admin@example.com'}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Contenido del Dashboard */}
      <Container fluid className="py-4">
        {/* Estadísticas */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="rounded-custom shadow-custom border-0 gradient-primary text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Propiedades</h5>
                    <h2 className="mb-0 fw-bold">
                      {showSearchResults ? filteredProperties.length : properties.length}
                      {showSearchResults && (
                        <small className="fs-6 ms-2 opacity-75">
                          de {properties.length}
                        </small>
                      )}
                    </h2>
                  </div>
                  <div className="opacity-75">
                    <i className="fas fa-home fa-2x"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="rounded-custom shadow-custom border-0 gradient-success text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Disponibles</h5>
                    <h2 className="mb-0 fw-bold">
                      {(showSearchResults ? filteredProperties : properties).filter(p => p.estado === 'disponible').length}
                    </h2>
                  </div>
                  <div className="opacity-75">
                    <i className="fas fa-check-circle fa-2x"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="rounded-custom shadow-custom border-0 gradient-info text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Alquiladas</h5>
                    <h2 className="mb-0 fw-bold">
                      {(showSearchResults ? filteredProperties : properties).filter(p => p.estado === 'alquilado').length}
                    </h2>
                  </div>
                  <div className="opacity-75">
                    <i className="fas fa-key fa-2x"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="rounded-custom shadow-custom border-0 gradient-warning text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Vendidas</h5>
                    <h2 className="mb-0 fw-bold">
                      {(showSearchResults ? filteredProperties : properties).filter(p => p.estado === 'vendido').length}
                    </h2>
                  </div>
                  <div className="opacity-75">
                    <i className="fas fa-handshake fa-2x"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Botón para nueva propiedad */}
        <Row className="mb-4">
          <Col>
            <Card className="rounded-custom shadow-custom border-0">
              <Card.Body className="py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 fw-bold">Gestión de Propiedades</h4>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-info"
                      className="rounded-pill border-0 gradient-info text-white"
                      onClick={() => navigate('/')}
                    >
                      <i className="fas fa-globe me-2"></i>
                      Ir a la web
                    </Button>
                    <Button
                      variant="primary"
                      className="rounded-pill gradient-primary border-0"
                      onClick={() => navigate('/admin/propiedades/nueva')}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Nueva Propiedad
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Lista de Propiedades */}
        <Row>
          <Col>
            <Card className="rounded-custom shadow-custom border-0">
              <Card.Header className="bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">Propiedades Publicadas</h4>
                  <Badge bg="info" className="rounded-pill px-3 py-2">
                    {showSearchResults ? 
                      `${filteredProperties.length} de ${properties.length} propiedades` : 
                      `${properties.length} propiedades`
                    }
                  </Badge>
                </div>
                
                {/* Buscador de Propiedades */}
                <div className="position-relative mb-3">
                  <div className="d-flex gap-2">
                    <div className="flex-grow-1 position-relative">
                      <Form.Control
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar propiedades por título, ubicación, tipo, estado, amenidades..."
                        className="rounded-custom pe-5"
                        style={{ paddingLeft: '2.5rem' }}
                      />
                      <i 
                        className="fas fa-search position-absolute"
                        style={{ 
                          left: '0.75rem', 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          color: '#6c757d'
                        }}
                      ></i>
                      {searchTerm && (
                        <Button
                          variant="link"
                          size="sm"
                          className="position-absolute end-0 top-50 translate-middle-y text-muted p-0 me-2"
                          onClick={clearSearch}
                          style={{ 
                            width: '1.5rem', 
                            height: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {showSearchResults && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <i className="fas fa-search me-1"></i>
                        Mostrando {filteredProperties.length} resultado{filteredProperties.length !== 1 ? 's' : ''} 
                        {searchTerm && ` para "${searchTerm}"`}
                        {filteredProperties.length > 0 && (
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 ms-2 text-decoration-none"
                            onClick={clearSearch}
                          >
                            Mostrar todas las propiedades
                          </Button>
                        )}
                      </small>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {!Array.isArray(properties) || properties.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-home text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                    <h5 className="text-muted mb-3">No hay propiedades publicadas</h5>
                    <Button
                      variant="primary"
                      className="rounded-pill gradient-primary border-0"
                      onClick={() => navigate('/admin/propiedades/nueva')}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Crear Primera Propiedad
                    </Button>
                  </div>
                ) : filteredProperties.length === 0 && showSearchResults ? (
                  <div className="text-center py-5">
                    <i className="fas fa-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                    <h5 className="text-muted mb-3">No se encontraron propiedades</h5>
                    <p className="text-muted mb-3">
                      No hay propiedades que coincidan con "{searchTerm}"
                    </p>
                    <Button
                      variant="outline-primary"
                      className="rounded-pill"
                      onClick={clearSearch}
                    >
                      <i className="fas fa-times me-2"></i>
                      Limpiar búsqueda
                    </Button>
                  </div>
                ) : (
                  <Row>
                    {(showSearchResults ? filteredProperties : properties).map((property) => (
                      <Col md={6} lg={4} key={property._id} className="mb-4">
                        <Card className="rounded-custom shadow-custom border-0 h-100 property-card">
                          <div className="position-relative">
                            {getImageUrl(property) ? (
                              <>
                                <Card.Img
                                  variant="top"
                                  src={getImageUrl(property)}
                                  style={{ height: '200px', objectFit: 'cover' }}
                                  className="rounded-top-custom"
                                />
                                {/* Overlay para propiedades no disponibles */}
                                {property.estado !== 'disponible' && (
                                  <div 
                                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{
                                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                      borderRadius: '0.375rem 0.375rem 0 0'
                                    }}
                                  >
                                    <div className="text-center text-white">
                                      <div 
                                        className="badge fs-6 px-3 py-2"
                                        style={{
                                          backgroundColor: property.estado === 'vendido' ? '#dc3545' : 
                                                          property.estado === 'alquilado' ? '#fd7e14' : 
                                                          property.estado === 'reservado' ? '#0dcaf0' : '#6c757d'
                                        }}
                                      >
                                        {property.estado === 'vendido' && <><i className="fas fa-handshake me-2"></i>VENDIDO</>}
                                        {property.estado === 'alquilado' && <><i className="fas fa-key me-2"></i>ALQUILADO</>}
                                        {property.estado === 'reservado' && <><i className="fas fa-clock me-2"></i>RESERVADO</>}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div 
                                style={{ 
                                  height: '200px', 
                                  backgroundColor: '#f8f9fa',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #dee2e6',
                                  borderRadius: '0.375rem 0.375rem 0 0'
                                }}
                                className="position-relative"
                              >
                                <div className="text-center text-muted">
                                  <i className="fas fa-image fa-3x mb-2"></i>
                                  <br />
                                  <small>Sin imagen disponible</small>
                                </div>
                                {/* Overlay para propiedades sin imagen pero no disponibles */}
                                {property.estado !== 'disponible' && (
                                  <div 
                                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{
                                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                      borderRadius: '0.375rem 0.375rem 0 0'
                                    }}
                                  >
                                    <div className="text-center text-white">
                                      <div 
                                        className="badge fs-6 px-3 py-2"
                                        style={{
                                          backgroundColor: property.estado === 'vendido' ? '#dc3545' : 
                                                          property.estado === 'alquilado' ? '#fd7e14' : 
                                                          property.estado === 'reservado' ? '#0dcaf0' : '#6c757d'
                                        }}
                                      >
                                        {property.estado === 'vendido' && <><i className="fas fa-handshake me-2"></i>VENDIDO</>}
                                        {property.estado === 'alquilado' && <><i className="fas fa-key me-2"></i>ALQUILADO</>}
                                        {property.estado === 'reservado' && <><i className="fas fa-clock me-2"></i>RESERVADO</>}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <Badge 
                              bg="primary" 
                              className="position-absolute top-0 end-0 m-2 rounded-pill"
                            >
                              {property.tipo}
                            </Badge>
                            {property.destacado && (
                              <Badge 
                                bg="warning" 
                                className="position-absolute top-0 start-0 m-2 rounded-pill"
                              >
                                <i className="fas fa-star me-1"></i>
                                Destacada
                              </Badge>
                            )}
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <h5 className="fw-bold mb-2">
                              {showSearchResults && searchTerm ? 
                                highlightSearchTerm(property.titulo, searchTerm) : 
                                property.titulo
                              }
                            </h5>
                            <p className="text-muted mb-2">
                              <i className="fas fa-map-marker-alt me-1"></i>
                              {showSearchResults && searchTerm ? 
                                <>
                                  {highlightSearchTerm(property.ubicacion?.direccion, searchTerm)} - {highlightSearchTerm(property.ubicacion?.ciudad, searchTerm)}
                                </> :
                                `${property.ubicacion?.direccion} - ${property.ubicacion?.ciudad}`
                              }
                            </p>
                            <p className="text-primary fw-bold fs-5 mb-2">
                              {formatPrice(property.precio)}
                            </p>
                            <div className="d-flex mb-3">
                              <small className="text-muted me-3">
                                <i className="fas fa-bed me-1"></i>
                                {property.caracteristicas?.habitaciones || 0} hab
                              </small>
                              <small className="text-muted me-3">
                                <i className="fas fa-bath me-1"></i>
                                {property.caracteristicas?.baños || 0} baños
                              </small>
                              <small className="text-muted">
                                <i className="fas fa-expand-arrows-alt me-1"></i>
                                {property.caracteristicas?.area || 0} m²
                              </small>
                            </div>
                            <small className="text-muted mb-3">
                              Publicado: {formatDate(property.fechaPublicacion)}
                            </small>
                            <div className="mb-2">
                              {getStatusBadge(property.estado)}
                            </div>
                            <div className="mt-auto d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="rounded-pill flex-fill"
                                onClick={() => navigate(`/admin/propiedades/editar/${property._id}`)}
                              >
                                <i className="fas fa-edit me-1"></i>
                                Editar
                              </Button>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-secondary"
                                  size="sm"
                                  className="rounded-pill"
                                  id={`dropdown-${property._id}`}
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Header>Cambiar Estado</Dropdown.Header>
                                  <Dropdown.Item 
                                    onClick={() => handleStatusChange(property._id, 'disponible')}
                                    className={property.estado === 'disponible' ? 'active' : ''}
                                  >
                                    <i className="fas fa-check-circle text-success me-2"></i>
                                    Disponible
                                  </Dropdown.Item>
                                  <Dropdown.Item 
                                    onClick={() => handleStatusChange(property._id, 'reservado')}
                                    className={property.estado === 'reservado' ? 'active' : ''}
                                  >
                                    <i className="fas fa-clock text-info me-2"></i>
                                    Reservado
                                  </Dropdown.Item>
                                  <Dropdown.Item 
                                    onClick={() => handleStatusChange(property._id, 'vendido')}
                                    className={property.estado === 'vendido' ? 'active' : ''}
                                  >
                                    <i className="fas fa-handshake text-danger me-2"></i>
                                    Vendido
                                  </Dropdown.Item>
                                  <Dropdown.Item 
                                    onClick={() => handleStatusChange(property._id, 'alquilado')}
                                    className={property.estado === 'alquilado' ? 'active' : ''}
                                  >
                                    <i className="fas fa-key text-warning me-2"></i>
                                    Alquilado
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item 
                                    onClick={() => handleDeleteProperty(property._id)}
                                    className="text-danger"
                                  >
                                    <i className="fas fa-trash me-2"></i>
                                    Eliminar Propiedad
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
