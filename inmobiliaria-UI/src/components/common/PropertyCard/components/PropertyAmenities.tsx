/**
 * PropertyAmenities - Componente para mostrar las amenidades de la propiedad
 */

import React from 'react';
import { Badge } from 'react-bootstrap';

interface PropertyAmenitiesProps {
  /** Array de amenidades */
  amenidades: string[];
  /** Número máximo de amenidades a mostrar */
  maxVisible?: number;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({
  amenidades,
  maxVisible = 3
}) => {
  if (!amenidades || amenidades.length === 0) {
    return null;
  }

  return (
    <div className="mb-3">
      <small className="text-muted fw-semibold">Amenidades:</small>
      <div className="d-flex flex-wrap gap-1 mt-1">
        {amenidades.slice(0, maxVisible).map((amenity, idx) => (
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
        {amenidades.length > maxVisible && (
          <Badge 
            bg="secondary" 
            className="fw-normal"
            style={{ fontSize: '0.7rem' }}
          >
            +{amenidades.length - maxVisible}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PropertyAmenities;
