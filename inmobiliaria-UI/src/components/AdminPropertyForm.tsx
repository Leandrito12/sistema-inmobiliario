import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';

interface PropertyForm {
  title: string;
  price: number;
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
}

interface ImagePreview {
  file: File;
  preview: string;
}

const AdminPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    price: 0,
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
    address: ''
  });
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchProperty();
    }
  }, [id, isEditing]);

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
          address: property.ubicacion?.direccion || ''
        });
        
        // Mapear imágenes existentes
        if (property.imagenes && Array.isArray(property.imagenes)) {
          setExistingImages(property.imagenes.map((img: any) => img.url || img));
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
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area') 
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

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
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
      formDataToSend.append('descripcion', formData.description);
      formDataToSend.append('tipo', formData.type);
      formDataToSend.append('operacion', 'venta'); // Valor por defecto
      formDataToSend.append('estado', 'disponible'); // Valor por defecto
      formDataToSend.append('destacado', 'false'); // Valor por defecto
      
      // Ubicación como campos separados (el backend los procesará)
      formDataToSend.append('ubicacion.direccion', formData.address);
      formDataToSend.append('ubicacion.ciudad', formData.city);
      formDataToSend.append('ubicacion.estado', formData.state);
      formDataToSend.append('ubicacion.codigoPostal', formData.postalCode);
      
      // Características como campos separados
      formDataToSend.append('caracteristicas.habitaciones', formData.bedrooms.toString());
      formDataToSend.append('caracteristicas.baños', formData.bathrooms.toString());
      formDataToSend.append('caracteristicas.area', formData.area.toString());
      
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
                        <Form.Label className="fw-semibold">Precio (ARS)</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={formData.price === 0 ? '' : formData.price}
                          onChange={handleChange}
                          required
                          className="rounded-custom"
                          placeholder="Ej: 250000"
                        />
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
                    <Form.Label className="fw-semibold">Características</Form.Label>
                    <div className="d-flex gap-2 mb-2">
                      <Form.Control
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="Ej: Piscina, Garage, Jardín"
                        className="rounded-custom"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      />
                      <Button
                        type="button"
                        variant="outline-primary"
                        onClick={addFeature}
                        className="rounded-custom"
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
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
