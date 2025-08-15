/**
 * PropertyLocation - Componente para mostrar la ubicación de la propiedad
 */

import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import type { PropertyLocation as PropertyLocationType } from '../types';

interface PropertyLocationProps {
  /** Ubicación de la propiedad */
  ubicacion: PropertyLocationType;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({
  ubicacion
}) => {
  return (
    <div className="d-flex align-items-center text-muted mb-3">
      <FaMapMarkerAlt className="me-2" style={{ color: '#ff6b35' }} />
      <span>{ubicacion.ciudad}, {ubicacion.direccion}</span>
    </div>
  );
};

export default PropertyLocation;
