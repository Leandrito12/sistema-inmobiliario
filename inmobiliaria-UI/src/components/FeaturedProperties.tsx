import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { API_ENDPOINTS } from '../config/api';
import { Section, PropertyCard } from './common';
import type { PropertyLocation, PropertyCharacteristics, PropertyImage, PropertyStatus } from './common';

interface Property {
  _id: string;
  titulo: string;
  precio: number;
  moneda: string;
  ubicacion: PropertyLocation;
  caracteristicas: PropertyCharacteristics;
  imagenes: PropertyImage[];
  tipo: string;
  estado: PropertyStatus;
  destacado: boolean;
}

/**
 * Componente FeaturedProperties - Muestra propiedades destacadas
 * Refactorizado para usar componentes reutilizables
 */
const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  // Función para obtener la URL de imagen correcta
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return '/placeholder.jpg';
    }
    
    // Si la URL ya comienza con /uploads, solo agregarle el dominio del backend
    if (imagePath.startsWith('/uploads')) {
      const fullUrl = `http://localhost:5001${imagePath}`;
      return fullUrl;
    }
    
    // Si la URL ya es completa (incluye http://), devolverla tal como está
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Si no tiene prefijo, construir la URL completa
    const baseUrl = 'http://localhost:5001';
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.PROPERTIES.BASE}?destacado=true&limit=6`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && Array.isArray(data.data)) {
        setProperties(data.data);
      } else {
        console.error('Invalid data structure:', data);
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCameraClick = (propertyId: string) => {
    console.log(`Ver galería de imágenes para propiedad: ${propertyId}`);
    // Aquí podrías abrir un modal con todas las imágenes
  };

  return (
    <Section 
      id="propiedades-destacadas"
      background="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
      hasDecorations
      themeColor="#6f42c1"
    >
      <div className="text-center mb-5" data-aos="fade-up">
        <div className="d-inline-block position-relative mb-4">
          <h2 className="display-5 fw-bold text-dark mb-0">
            Propiedades <span style={{ color: '#6f42c1' }}>Destacadas</span>
          </h2>
          <div 
            className="position-absolute bottom-0 start-50 translate-middle-x"
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)',
              borderRadius: '2px'
            }}
          />
        </div>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Descubre nuestra selección exclusiva de propiedades premium, 
          cuidadosamente elegidas por su ubicación, calidad y valor excepcional.
        </p>
      </div>

      <Row className="g-4">
        {loading ? (
          <Col xs={12} className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando propiedades destacadas...</p>
          </Col>
        ) : properties.length === 0 ? (
          <Col xs={12} className="text-center py-5">
            <p className="text-muted">No hay propiedades destacadas disponibles en este momento.</p>
          </Col>
        ) : (
          properties.map((property, index) => (
            <Col lg={4} md={6} key={property._id}>
              <PropertyCard
                id={property._id}
                titulo={property.titulo}
                precio={property.precio}
                moneda={property.moneda}
                ubicacion={property.ubicacion}
                caracteristicas={property.caracteristicas}
                imagenes={property.imagenes}
                tipo={property.tipo}
                estado={property.estado}
                destacado={property.destacado}
                animationDelay={index * 100}
                getImageUrl={getImageUrl}
                onCameraClick={() => handleCameraClick(property._id)}
              />
            </Col>
          ))
        )}
      </Row>
    </Section>
  );
};

export default FeaturedProperties;