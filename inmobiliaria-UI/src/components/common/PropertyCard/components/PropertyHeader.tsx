/**
 * PropertyHeader - Componente para el título y precio de la propiedad
 */

import React from 'react';
import { formatPrice } from '../utils';

interface PropertyHeaderProps {
  /** Título de la propiedad */
  titulo: string;
  /** Precio de la propiedad */
  precio: number;
  /** Moneda del precio */
  moneda: string;
  /** Tipo de operación (venta/alquiler) */
  operacion?: 'venta' | 'alquiler';
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  titulo,
  precio,
  moneda,
  operacion
}) => {
  return (
    <div className="d-flex justify-content-between align-items-start mb-3">
      <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
        {titulo}
      </h5>
      <div className="text-end">
        <h4 className="fw-bold text-primary mb-0">
          {formatPrice(precio, moneda, operacion)}
        </h4>
      </div>
    </div>
  );
};

export default PropertyHeader;
