/**
 * PropertyActions - Componente para las acciones de la propiedad (botones)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import Button from '../../Button';

interface PropertyActionsProps {
  /** ID de la propiedad */
  propertyId: string;
  /** Texto del botón principal */
  buttonText?: string;
  /** Callback personalizado para el botón */
  onButtonClick?: () => void;
  /** Si se debe mostrar como link */
  showAsLink?: boolean;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({
  propertyId,
  buttonText = 'Ver Detalles',
  onButtonClick,
  showAsLink = true
}) => {
  if (showAsLink) {
    return (
      <div className="d-grid gap-2">
        <Link 
          to={`/propiedad/${propertyId}`}
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
            {buttonText}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="d-grid gap-2">
      <Button 
        variant="outline-primary" 
        className="fw-bold w-100"
        style={{
          borderColor: '#6f42c1',
          color: '#6f42c1',
          borderWidth: '2px',
          borderRadius: '25px'
        }}
        onClick={onButtonClick}
      >
        <FaEye className="me-2" />
        {buttonText}
      </Button>
    </div>
  );
};

export default PropertyActions;
