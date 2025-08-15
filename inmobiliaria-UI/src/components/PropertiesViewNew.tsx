import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaCamera, 
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaEye
} from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';

interface Property {
  _id: string;
  titulo: string;
  precio: number;
  moneda: string;
  ubicacion: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };
  caracteristicas: {
    habitaciones: number;
    baños: number;
    area: number;
  };
  imagenes: Array<{
    url: string;
    alt: string;
    esPortada: boolean;
  }>;
  tipo: string;
  estado: 'disponible' | 'vendido' | 'alquilado' | 'reservado';
  destacado: boolean;
  amenidades: string[];
  descripcion: string;
  operacion: 'venta' | 'alquiler';
}

interface SearchFilters {
  location: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  status: string;
  amenities: string[];
}

const PropertiesView: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const titleRef = React.useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    status: '',
    amenities: []
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_ENDPOINTS.PROPERTIES.BASE);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      console.error('Error al cargar propiedades:', err);
      setError('Error al cargar las propiedades. Por favor, inténtalo de nuevo.');
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      titleRef.current.focus();
    }
  }, []);

  const filterAndSortProperties = useCallback(() => {
    const hasFilters = filters.location !== '' || 
                      filters.type !== '' || 
                      filters.minPrice !== '' || 
                      filters.maxPrice !== '' || 
                      filters.bedrooms !== '' || 
                      filters.bathrooms !== '' || 
                      filters.minArea !== '' || 
                      filters.maxArea !== '' || 
                      filters.status !== '' || 
                      filters.amenities.length > 0;

    let filtered;
    if (!hasFilters) {
      filtered = [...properties];
    } else {
      filtered = properties.filter(property => {
        return (
          (filters.location === '' || 
           property.ubicacion.ciudad.toLowerCase().includes(filters.location.toLowerCase()) || 
           property.ubicacion.direccion.toLowerCase().includes(filters.location.toLowerCase())) &&
          (filters.type === '' || property.tipo === filters.type) &&
          (filters.minPrice === '' || property.precio >= parseInt(filters.minPrice)) &&
          (filters.maxPrice === '' || property.precio <= parseInt(filters.maxPrice)) &&
          (filters.bedrooms === '' || property.caracteristicas.habitaciones >= parseInt(filters.bedrooms)) &&
          (filters.bathrooms === '' || property.caracteristicas.baños >= parseInt(filters.bathrooms)) &&
          (filters.minArea === '' || property.caracteristicas.area >= parseInt(filters.minArea)) &&
          (filters.maxArea === '' || property.caracteristicas.area <= parseInt(filters.maxArea)) &&
          (filters.status === '' || property.estado === filters.status) &&
          (filters.amenities.length === 0 || 
           filters.amenities.some(amenity => property.amenidades.includes(amenity)))
        );
      });
    }

    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.precio - b.precio;
        case 'price-high':
          return b.precio - a.precio;
        case 'area-large':
          return b.caracteristicas.area - a.caracteristicas.area;
        case 'area-small':
          return a.caracteristicas.area - b.caracteristicas.area;
        case 'newest':
          if (a.destacado && !b.destacado) return -1;
          if (!a.destacado && b.destacado) return 1;
          return 0;
        case 'featured':
        default:
          if (a.destacado && !b.destacado) return -1;
          if (!a.destacado && b.destacado) return 1;
          return 0;
      }
    });

    setFilteredProperties(sorted);
  }, [filters, sortBy, properties]);

  useEffect(() => {
    filterAndSortProperties();
  }, [filterAndSortProperties]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      status: '',
      amenities: []
    });
  };

  const formatPrice = (price: number, currency: string, operation: string) => {
    const currencySymbol = currency === 'USD' ? '$' : 
                           currency === 'EUR' ? '€' : 
                           currency === 'ARS' ? 'AR$' : 
                           currency === 'BRL' ? 'R$' : '$';
    
    if (operation === 'alquiler') {
      return `${currencySymbol}${price.toLocaleString()}/mes`;
    }
    return `${currencySymbol}${price.toLocaleString()}`;
  };

  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible': return 'primary';
      case 'vendido': return 'danger';
      case 'alquilado': return 'info';
      case 'reservado': return 'warning';
      default: return 'primary';
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando propiedades...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
        <Container>
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            <Button onClick={fetchProperties} variant="primary">
              Intentar de nuevo
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
      <Container>
        {/* Header de la página */}
        <div 
          ref={titleRef}
          className="text-center mb-5" 
          data-aos="fade-up"
          tabIndex={-1}
        >
          <h1 className="display-4 fw-bold text-dark mb-3">
            Nuestras <span style={{ color: '#6f42c1' }}>Propiedades</span>
          </h1>
          <p className="lead text-muted">
            Encuentra la propiedad perfecta entre nuestra amplia selección
          </p>
        </div>

        {/* Controles de filtro y ordenamiento */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por ubicación..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowFilters(!showFilters)}>
                <FaFilter className="me-2" />
                Filtros
              </Button>
            </InputGroup>
          </Col>
          <Col md={6}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" className="w-100">
                <FaSortAmountDown className="me-2" />
                Ordenar por
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy('featured')}>Destacados</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-low')}>Precio: Menor a Mayor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-high')}>Precio: Mayor a Menor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('area-large')}>Área: Mayor a Menor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('area-small')}>Área: Menor a Mayor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Filtros expandidos */}
        {showFilters && (
          <Card className="mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col md={3}>
                  <Form.Select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">Tipo de Propiedad</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Villa">Villa</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Estado</option>
                    <option value="disponible">Disponible</option>
                    <option value="vendido">Vendido</option>
                    <option value="alquilado">Alquilado</option>
                    <option value="reservado">Reservado</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Precio mínimo"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Precio máximo"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Habitaciones mín."
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Baños mín."
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Área mín. (m²)"
                    value={filters.minArea}
                    onChange={(e) => handleFilterChange('minArea', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Área máx. (m²)"
                    value={filters.maxArea}
                    onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                  />
                </Col>
              </Row>
              <div className="text-end mt-3">
                <Button variant="outline-secondary" onClick={clearFilters} className="me-2">
                  Limpiar Filtros
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* Grid de propiedades */}
        <Row className="g-4">
          {filteredProperties.map((property, index) => (
            <Col lg={4} md={6} key={property._id}>
              <Card 
                className="property-card h-100 border-0 shadow-sm"
                style={{ 
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="position-relative">
                  <div
                    style={{
                      height: '250px',
                      backgroundImage: `url(${property.imagenes.find(img => img.esPortada)?.url || property.imagenes[0]?.url || '/placeholder.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  
                  {/* Overlay para propiedades no disponibles */}
                  {(property.estado === 'vendido' || property.estado === 'alquilado' || property.estado === 'reservado') && (
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.7)',
                        zIndex: 2
                      }}
                    >
                      <div
                        className="text-white fw-bold text-center px-4 py-2"
                        style={{
                          backgroundColor: property.estado === 'vendido' ? 'rgba(220, 53, 69, 0.9)' : 
                                         property.estado === 'alquilado' ? 'rgba(40, 167, 69, 0.9)' : 
                                         'rgba(255, 193, 7, 0.9)',
                          borderRadius: '25px',
                          fontSize: '1.2rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          border: '2px solid white',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {capitalizeStatus(property.estado)}
                      </div>
                    </div>
                  )}
                  
                  {/* Badges superiores */}
                  <div className="position-absolute top-0 start-0 p-3" style={{ zIndex: 3 }}>
                    <Badge 
                      bg={getStatusBadgeColor(property.estado)}
                      className="fw-bold me-2"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px'
                      }}
                    >
                      {capitalizeStatus(property.estado)}
                    </Badge>
                    {property.destacado && (
                      <Badge 
                        className="fw-bold"
                        style={{
                          background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                          fontSize: '0.8rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px'
                        }}
                      >
                        Destacado
                      </Badge>
                    )}
                  </div>

                  {/* Botones superiores derecha */}
                  <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 3 }}>
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaHeart />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaCamera />
                    </Button>
                  </div>

                  {/* Tipo de propiedad */}
                  <div className="position-absolute bottom-0 start-0 p-3" style={{ zIndex: 3 }}>
                    <Badge 
                      bg="dark" 
                      className="fw-bold"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(0,0,0,0.7) !important'
                      }}
                    >
                      {property.tipo}
                    </Badge>
                  </div>
                </div>

                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
                      {property.titulo}
                    </h5>
                    <div className="text-end">
                      <h4 className="fw-bold text-primary mb-0">
                        {formatPrice(property.precio, property.moneda, property.operacion)}
                      </h4>
                    </div>
                  </div>

                  <div className="d-flex align-items-center text-muted mb-3">
                    <FaMapMarkerAlt className="me-2" style={{ color: '#ff6b35' }} />
                    <span>{property.ubicacion.ciudad}, {property.ubicacion.direccion}</span>
                  </div>

                  <Row className="g-3 mb-3">
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBed style={{ color: '#6f42c1', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Habitaciones</small>
                        <div className="fw-bold">{property.caracteristicas.habitaciones}</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBath style={{ color: '#17a2b8', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Baños</small>
                        <div className="fw-bold">{property.caracteristicas.baños}</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaRulerCombined style={{ color: '#28a745', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Área</small>
                        <div className="fw-bold">{property.caracteristicas.area}m²</div>
                      </div>
                    </Col>
                  </Row>

                  {/* Amenidades */}
                  {property.amenidades.length > 0 && (
                    <div className="mb-3">
                      <small className="text-muted fw-semibold">Amenidades:</small>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {property.amenidades.slice(0, 3).map((amenity, idx) => (
                          <Badge 
                            key={idx}
                            bg="light" 
                            text="dark" 
                            className="fw-normal"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenidades.length > 3 && (
                          <Badge 
                            bg="secondary" 
                            className="fw-normal"
                            style={{ fontSize: '0.7rem' }}
                          >
                            +{property.amenidades.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <Link 
                      to={`/propiedad/${property._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button 
                        variant="outline-primary" 
                        className="fw-bold w-100"
                        style={{
                          borderColor: '#6f42c1',
                          color: '#6f42c1',
                          borderWidth: '2px',
                          borderRadius: '25px'
                        }}
                      >
                        <FaEye className="me-2" />
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Mensaje cuando no hay resultados */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-5" data-aos="fade-up">
            <div style={{ color: '#6f42c1', fontSize: '4rem', marginBottom: '1rem' }}>
              <FaSearch />
            </div>
            <h3 className="fw-bold text-dark mb-3">No se encontraron propiedades</h3>
            <p className="text-muted mb-4">
              Intenta ajustar tus filtros de búsqueda para encontrar más opciones
            </p>
            <Button 
              variant="outline-primary"
              onClick={clearFilters}
              style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}

        {/* Botón cargar más */}
        {filteredProperties.length > 0 && filteredProperties.length >= 9 && (
          <div className="text-center mt-5" data-aos="fade-up">
            <Button 
              size="lg"
              className="fw-bold px-5"
              style={{
                background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
            >
              Cargar Más Propiedades
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PropertiesView;
