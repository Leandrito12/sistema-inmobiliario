import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface Property {
  _id: string;
  titulo: string;
  precio: number;
  tipo: string;
  ubicacion: {
    direccion: string;
    ciudad: string;
  };
  caracteristicas: {
    habitaciones?: number;
    baños?: number;
    area: number;
  };
  imagenes: Array<{
    url: string;
    alt: string;
  }>;
  fechaPublicacion: string;
}

const AdminDashboardDebug: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Mock data para debug
    const mockProperties: Property[] = [
      {
        _id: '1',
        titulo: 'Test Property 1',
        precio: 250000,
        tipo: 'casa',
        ubicacion: {
          direccion: 'Test Address 1',
          ciudad: 'Test City'
        },
        caracteristicas: {
          habitaciones: 3,
          baños: 2,
          area: 120
        },
        imagenes: [
          {
            url: 'https://via.placeholder.com/300x200',
            alt: 'Test image'
          }
        ],
        fechaPublicacion: '2025-07-08T21:45:28.407Z'
      },
      {
        _id: '2',
        titulo: 'Test Property 2',
        precio: 180000,
        tipo: 'apartamento',
        ubicacion: {
          direccion: 'Test Address 2',
          ciudad: 'Test City'
        },
        caracteristicas: {
          habitaciones: 2,
          baños: 1,
          area: 85
        },
        imagenes: [
          {
            url: 'https://via.placeholder.com/300x200',
            alt: 'Test image'
          }
        ],
        fechaPublicacion: '2025-07-08T21:45:28.407Z'
      }
    ];

    console.log('🔍 Setting mock properties:', mockProperties);
    setProperties(mockProperties);
  }, []);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  console.log('🔍 Current properties state:', properties);
  console.log('🔍 Properties length:', properties.length);
  console.log('🔍 Array.isArray(properties):', Array.isArray(properties));

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container>
        <h1>Admin Dashboard Debug</h1>
        
        <div style={{ 
          border: '3px solid red', 
          padding: '20px', 
          margin: '20px 0',
          backgroundColor: 'white'
        }}>
          <h2>Debug Info</h2>
          <p>Properties count: {properties.length}</p>
          <p>Is Array: {Array.isArray(properties).toString()}</p>
          <p>Should render: {(Array.isArray(properties) && properties.length > 0).toString()}</p>
        </div>

        <div style={{ 
          border: '3px solid blue', 
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <h2>Properties Section</h2>
          
          {!Array.isArray(properties) || properties.length === 0 ? (
            <div style={{ 
              border: '2px solid orange', 
              padding: '20px',
              backgroundColor: '#fff3cd',
              textAlign: 'center'
            }}>
              <h3>No properties found</h3>
              <p>Properties array is empty or not an array</p>
            </div>
          ) : (
            <div style={{ 
              border: '2px solid green', 
              padding: '20px',
              backgroundColor: '#d4edda'
            }}>
              <h3>Rendering {properties.length} properties</h3>
              <Row>
                {properties.map((property, index) => {
                  console.log(`🔍 Rendering property ${index + 1}:`, property);
                  return (
                    <Col md={6} key={property._id} style={{ marginBottom: '20px' }}>
                      <Card style={{ 
                        border: '2px solid purple',
                        minHeight: '200px',
                        backgroundColor: 'white'
                      }}>
                        <Card.Body>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                          }}>
                            <strong>ID:</strong> {property._id}
                          </div>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                          }}>
                            <strong>Title:</strong> {property.titulo}
                          </div>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                          }}>
                            <strong>Price:</strong> {formatPrice(property.precio)}
                          </div>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                          }}>
                            <strong>Type:</strong> {property.tipo}
                          </div>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                          }}>
                            <strong>Location:</strong> {property.ubicacion.direccion} - {property.ubicacion.ciudad}
                          </div>
                          <div style={{ 
                            border: '1px solid gray',
                            padding: '10px'
                          }}>
                            <strong>Characteristics:</strong> {property.caracteristicas.habitaciones} hab, {property.caracteristicas.baños} baños, {property.caracteristicas.area} m²
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboardDebug;
