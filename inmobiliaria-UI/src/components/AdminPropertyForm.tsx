import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { API_ENDPOINTS } from '../config/api';

interface PropertyForm {
  title: string;
  price: number;
  currency: string;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  // Campos adicionales requeridos
  postalCode: string;
  state: string;
  city: string;
  address: string;
  // Campo destacado
  destacado: boolean;
  // Estado de la propiedad
  status: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

interface Amenity {
  _id: string;
  name: string;
  category: string;
  description?: string;
}

const AdminPropertyForm: React.FC = () => {
  // Estado para las amenidades desde la base de datos
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [loadingAmenities, setLoadingAmenities] = useState(true);

  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    price: 0,
    currency: 'ARS',
    location: '',
    type: 'casa',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    description: '',
    features: [],
    // Campos adicionales requeridos
    postalCode: '',
    state: '',
    city: '',
    address: '',
    // Campo destacado
    destacado: false,
    // Estado de la propiedad
    status: 'disponible'
  });
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [amenitySearch, setAmenitySearch] = useState('');
  const [showAmenityDropdown, setShowAmenityDropdown] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    const loadData = async () => {
      // Cargar amenidades al montar el componente
      await fetchAmenities();
      
      if (isEditing) {
        await fetchProperty();
      }
    };
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing]);

  // Función para obtener amenidades desde la API
  const fetchAmenities = async () => {
    try {
      setLoadingAmenities(true);
      const response = await fetch(API_ENDPOINTS.AMENITIES.BASE);
      
      if (response.ok) {
        const result = await response.json();
        setAvailableAmenities(result.data || []);
      } else {
        console.error('Error al cargar amenidades');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingAmenities(false);
    }
  };

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.position-relative')) {
        setShowAmenityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para obtener la URL de imagen correcta
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    let url = imagePath;
    
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
  };

  const fetchProperty = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/properties/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const property = result.data?.property || result; // Manejar ambos formatos de respuesta
        
        setFormData({
          title: property.titulo || '',
          price: property.precio || 0,
          currency: property.moneda || 'ARS',
          location: property.ubicacion?.direccion || '',
          type: property.tipo || 'casa',
          bedrooms: property.caracteristicas?.habitaciones || 0,
          bathrooms: property.caracteristicas?.baños || 0,
          area: property.caracteristicas?.area || 0,
          description: property.descripcion || '',
          features: property.amenidades || [],
          // Campos adicionales de ubicación
          postalCode: property.ubicacion?.codigoPostal || '',
          state: property.ubicacion?.estado || '',
          city: property.ubicacion?.ciudad || '',
          address: property.ubicacion?.direccion || '',
          // Campo destacado
          destacado: property.destacado || false,
          // Estado de la propiedad
          status: property.estado || 'disponible'
        });
        
        // Mapear imágenes existentes con URLs corregidas
        if (property.imagenes && Array.isArray(property.imagenes)) {
          const correctedImages = property.imagenes.map((img: string | { url: string }) => {
            const imagePath = typeof img === 'string' ? img : img.url;
            return getImageUrl(imagePath);
          });
          setExistingImages(correctedImages);
        }
      } else {
        setError('Error al cargar la propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar la propiedad');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        (name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area') 
        ? (value === '' ? 0 : Number(value))
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: ImagePreview[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            file,
            preview: e.target?.result as string
          });
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // Función para filtrar amenidades basada en la búsqueda
  const getFilteredAmenities = () => {
    return availableAmenities
      .filter(amenity => !formData.features.includes(amenity.name))
      .filter(amenity => 
        amenity.name.toLowerCase().includes(amenitySearch.toLowerCase()) ||
        amenity.category.toLowerCase().includes(amenitySearch.toLowerCase())
      )
      .slice(0, 10); // Limitar a 10 resultados para mejor performance
  };

  // Función para manejar la selección de una amenidad
  const handleAmenitySelect = (amenityName: string) => {
    if (!formData.features.includes(amenityName)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, amenityName]
      }));
    }
    setAmenitySearch('');
    setShowAmenityDropdown(false);
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      // Mapear datos del formulario al formato esperado por el backend
      formDataToSend.append('titulo', formData.title);
      formDataToSend.append('precio', formData.price.toString());
      formDataToSend.append('moneda', formData.currency);
      formDataToSend.append('descripcion', formData.description);
      formDataToSend.append('tipo', formData.type);
      formDataToSend.append('operacion', 'venta'); // Valor por defecto
      formDataToSend.append('estado', formData.status); // Estado de la propiedad
      formDataToSend.append('destacado', formData.destacado.toString()); // Campo destacado
      
      // Ubicación como objeto JSON (estructura exacta que espera el backend)
      const ubicacion = {
        direccion: formData.address,
        ciudad: formData.city,
        estado: formData.state,
        codigoPostal: formData.postalCode
      };
      formDataToSend.append('ubicacion', JSON.stringify(ubicacion));
      
      // Características como objeto JSON (estructura exacta que espera el backend)
      const caracteristicas = {
        habitaciones: formData.bedrooms,
        baños: formData.bathrooms,
        area: formData.area
      };
      formDataToSend.append('caracteristicas', JSON.stringify(caracteristicas));
      
      // Amenidades (features)
      formDataToSend.append('amenidades', JSON.stringify(formData.features));

      // Agregar imágenes nuevas
      images.forEach(imageData => {
        formDataToSend.append('images', imageData.file);
      });

      // Agregar imágenes existentes (solo en edición)
      if (isEditing) {
        formDataToSend.append('existingImages', JSON.stringify(existingImages));
      }

      const url = isEditing 
        ? `http://localhost:5001/api/properties/${id}`
        : 'http://localhost:5001/api/properties';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Propiedad actualizada exitosamente' : 'Propiedad creada exitosamente');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="rounded-custom shadow-custom border-0">
              <Card.Header className="bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="fw-bold mb-0 text-gradient">
                    {isEditing ? 'Editar Propiedad' : 'Nueva Propiedad'}
                  </h3>
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill"
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" className="rounded-custom">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="rounded-custom">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Título</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Precio</Form.Label>
                        <div className="d-flex gap-2">
                          <div style={{ width: '120px' }}>
                            <Form.Select
                              name="currency"
                              value={formData.currency}
                              onChange={handleChange}
                              required
                              className="rounded-custom"
                            >
                              <option value="ARS">ARS</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="BRL">BRL</option>
                            </Form.Select>
                          </div>
                          <div className="flex-grow-1">
                            <Form.Control
                              type="number"
                              name="price"
                              value={formData.price === 0 ? '' : formData.price}
                              onChange={handleChange}
                              required
                              className="rounded-custom"
                              placeholder="Ej: 250000"
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Ubicación</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Tipo</Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                        >
                          <option value="casa">Casa</option>
                          <option value="apartamento">Apartamento</option>
                          <option value="local">Local Comercial</option>
                          <option value="oficina">Oficina</option>
                          <option value="terreno">Terreno</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Habitaciones</Form.Label>
                        <Form.Control
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms === 0 ? '' : formData.bedrooms}
                          onChange={handleChange}
                          min="1"
                          required
                          className="rounded-custom"
                          placeholder="Ej: 3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Baños</Form.Label>
                        <Form.Control
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms === 0 ? '' : formData.bathrooms}
                          onChange={handleChange}
                          min="1"
                          required
                          className="rounded-custom"
                          placeholder="Ej: 2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Área (m²)</Form.Label>
                        <Form.Control
                          type="number"
                          name="area"
                          value={formData.area === 0 ? '' : formData.area}
                          onChange={handleChange}
                          min="1"
                          required
                          className="rounded-custom"
                          placeholder="Ej: 120"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Nuevos campos requeridos */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                          placeholder="Ej: Av. Corrientes 1234"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Ciudad</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                          placeholder="Ej: Buenos Aires"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Estado/Provincia</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                          placeholder="Ej: Buenos Aires"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Código Postal</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                          placeholder="Ej: 1001"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="rounded-custom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center p-3 bg-secondary rounded-custom border">
                      <Form.Check
                        type="checkbox"
                        id="destacado"
                        name="destacado"
                        checked={formData.destacado}
                        onChange={handleChange}
                        className="me-3"
                        style={{
                          transform: 'scale(1.2)',
                          accentColor: '#0d6efd'
                        }}
                      />
                      <div>
                        <label htmlFor="destacado" className="fw-semibold text-white mb-1" style={{ cursor: 'pointer' }}>
                          <i className="fas fa-star me-2 text-warning"></i>
                          Marcar como propiedad destacada
                        </label>
                        <div className="text-light small">
                          Las propiedades destacadas aparecerán en la sección principal de la página web
                        </div>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Estado de la Propiedad</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="rounded-custom"
                    >
                      <option value="disponible">Disponible</option>
                      <option value="vendido">Vendido</option>
                      <option value="alquilado">Alquilado</option>
                      <option value="reservado">Reservado</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Las propiedades vendidas, alquiladas o reservadas aparecerán con un overlay gris en las imágenes
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Características y Amenidades</Form.Label>
                    <div className="position-relative">
                      <div className="d-flex gap-2 mb-2">
                        <div className="flex-grow-1 position-relative">
                          <Form.Control
                            type="text"
                            value={amenitySearch}
                            onChange={(e) => {
                              setAmenitySearch(e.target.value);
                              setShowAmenityDropdown(true);
                            }}
                            onFocus={() => setShowAmenityDropdown(true)}
                            placeholder="Buscar amenidades... (ej: piscina, seguridad, garage)"
                            className="rounded-custom"
                          />
                          {showAmenityDropdown && amenitySearch.length > 0 && (
                            <div 
                              className="position-absolute w-100 bg-white border rounded-custom shadow-sm mt-1" 
                              style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                            >
                              {loadingAmenities ? (
                                <div className="px-3 py-2 text-center text-muted">
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                  Cargando amenidades...
                                </div>
                              ) : getFilteredAmenities().length > 0 ? (
                                getFilteredAmenities().map((amenity) => (
                                  <div
                                    key={amenity._id}
                                    className="px-3 py-2 cursor-pointer hover-bg-light border-bottom"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleAmenitySelect(amenity.name)}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                  >
                                    <div className="fw-semibold">{amenity.name}</div>
                                    <small className="text-muted">{amenity.category}</small>
                                  </div>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-muted">
                                  No se encontraron amenidades que coincidan
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          onClick={() => {
                            setAmenitySearch('');
                            setShowAmenityDropdown(false);
                          }}
                          className="rounded-custom"
                          title="Limpiar búsqueda"
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {formData.features.map((feature, index) => (
                        <Badge
                          key={index}
                          bg="primary"
                          className="rounded-pill px-3 py-2 d-flex align-items-center"
                        >
                          {feature}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: '0.7rem' }}
                            onClick={() => removeFeature(index)}
                          ></button>
                        </Badge>
                      ))}
                    </div>
                    
                    {formData.features.length === 0 && (
                      <Form.Text className="text-muted">
                        <i className="fas fa-search me-1"></i>
                        Busque y seleccione las amenidades y características de la propiedad
                      </Form.Text>
                    )}
                    
                    {formData.features.length > 0 && (
                      <Form.Text className="text-success">
                        <i className="fas fa-check me-1"></i>
                        {formData.features.length} amenidad{formData.features.length !== 1 ? 'es' : ''} seleccionada{formData.features.length !== 1 ? 's' : ''}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Imágenes</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="rounded-custom"
                    />
                    <Form.Text className="text-muted">
                      Puede seleccionar múltiples imágenes
                    </Form.Text>
                  </Form.Group>

                  {/* Mostrar imágenes existentes (solo en edición) */}
                  {isEditing && existingImages.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-semibold">Imágenes actuales:</h6>
                      <Row>
                        {existingImages.map((image, index) => (
                          <Col key={index} md={3} className="mb-2">
                            <div className="position-relative">
                              <img
                                src={image}
                                alt={`Imagen ${index + 1}`}
                                className="img-fluid rounded-custom"
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1 rounded-circle"
                                onClick={() => removeExistingImage(index)}
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {/* Mostrar preview de imágenes nuevas */}
                  {images.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-semibold">Imágenes nuevas:</h6>
                      <Row>
                        {images.map((image, index) => (
                          <Col key={index} md={3} className="mb-2">
                            <div className="position-relative">
                              <img
                                src={image.preview}
                                alt={`Preview ${index + 1}`}
                                className="img-fluid rounded-custom"
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1 rounded-circle"
                                onClick={() => removeImage(index)}
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-secondary"
                      className="rounded-pill px-4"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="rounded-pill px-4 gradient-primary border-0"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <i className={`fas fa-${isEditing ? 'save' : 'plus'} me-2`}></i>
                          {isEditing ? 'Actualizar' : 'Crear'} Propiedad
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPropertyForm;
