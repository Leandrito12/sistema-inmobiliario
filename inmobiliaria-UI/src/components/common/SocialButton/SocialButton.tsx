/**
 * SocialButton - Componente reutilizable para botones de redes sociales
 * Usado en footer, páginas de contacto, etc.
 */

import React from 'react';
import Button from '../Button';
import './SocialButton.styles.css';

export interface SocialButtonProps {
  /** Icono de la red social */
  icon: React.ReactNode;
  /** URL de la red social */
  href?: string;
  /** Función onClick personalizada */
  onClick?: () => void;
  /** Tamaño del botón */
  size?: 'sm' | 'lg';
  /** Variante del botón */
  variant?: 'filled' | 'outline';
  /** Color personalizado */
  color?: string;
  /** Clases CSS adicionales */
  className?: string;
  /** Texto alternativo para accesibilidad */
  ariaLabel?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  href,
  onClick,
  size = 'sm',
  variant = 'outline',
  color,
  className = '',
  ariaLabel
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const sizeClass = {
    'sm': 'social-button--sm',
    'lg': 'social-button--lg'
  }[size];

  const variantClass = variant === 'filled' ? 'social-button--filled' : 'social-button--outline';

  return (
    <Button
      variant={variant === 'filled' ? 'primary' : 'outline-light'}
      size={size}
      onClick={handleClick}
      className={`social-button ${sizeClass} ${variantClass} ${className}`}
      style={color ? { borderColor: color, color: color } : undefined}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
};

export default SocialButton;
