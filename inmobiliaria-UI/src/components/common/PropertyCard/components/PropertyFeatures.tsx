/**
 * PropertyFeatures - Componente para mostrar las características de la propiedad
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import type { PropertyCharacteristics } from '../types';

interface PropertyFeaturesProps {
  /** Características de la propiedad */
  caracteristicas: PropertyCharacteristics;
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  caracteristicas
}) => {
  const features = [
    {
      icon: <FaBed style={{ color: '#6f42c1', fontSize: '1.2rem' }} />,
      label: 'Habitaciones',
      value: caracteristicas.habitaciones
    },
    {
      icon: <FaBath style={{ color: '#17a2b8', fontSize: '1.2rem' }} />,
      label: 'Baños',
      value: caracteristicas.baños
    },
    {
      icon: <FaRulerCombined style={{ color: '#28a745', fontSize: '1.2rem' }} />,
      label: 'Área',
      value: `${caracteristicas.area}m²`
    }
  ];

  return (
    <Row className="g-3 mb-3">
      {features.map((feature, index) => (
        <Col xs={4} key={index}>
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              {feature.icon}
            </div>
            <small className="text-muted">{feature.label}</small>
            <div className="fw-bold">{feature.value}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default PropertyFeatures;
