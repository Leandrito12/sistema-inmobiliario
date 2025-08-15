import React from 'react';
import { Button as BootstrapButton, type ButtonProps as BootstrapButtonProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Button.styles.css';

/**
 * Tipos de variantes personalizadas para botones
 */
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'light' 
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-light'
  | 'gradient-primary'
  | 'gradient-secondary';

/**
 * Variantes válidas de Bootstrap Button
 */
type BootstrapVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'light' 
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-light';

/**
 * Convierte variante personalizada a variante de Bootstrap
 */
const getBootstrapVariant = (variant: ButtonVariant): BootstrapVariant => {
  if (variant.includes('gradient')) {
    return 'primary';
  }
  return variant as BootstrapVariant;
};

/**
 * Tamaños disponibles para botones
 */
export type ButtonSize = 'sm' | 'lg';

/**
 * Helper para manejar el tamaño XL personalizado
 */
const getBootstrapSize = (size?: ButtonSize | 'xl'): 'sm' | 'lg' | undefined => {
  if (size === 'xl') return 'lg'; // XL se maneja con CSS
  return size;
};

/**
 * Props del componente Button personalizado
 */
export interface CustomButtonProps extends Omit<BootstrapButtonProps, 'variant' | 'size'> {
  /** Variante del botón */
  variant?: ButtonVariant;
  /** Tamaño del botón */
  size?: ButtonSize | 'xl';
  /** Texto del botón */
  children: React.ReactNode;
  /** Icono opcional a mostrar antes del texto */
  icon?: React.ReactNode;
  /** Si es un enlace interno, especifica la ruta */
  to?: string;
  /** Si es un enlace externo, especifica la URL */
  href?: string;
  /** Si el enlace debe abrirse en una nueva pestaña */
  external?: boolean;
  /** Estado de carga */
  loading?: boolean;
  /** Si el botón debe ocupar todo el ancho disponible */
  fullWidth?: boolean;
  /** Bordes redondeados */
  rounded?: boolean;
}

/**
 * Componente Button reutilizable
 * Extiende Bootstrap Button con estilos personalizados y funcionalidades adicionales
 */
const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size,
  children,
  icon,
  to,
  href,
  external = false,
  loading = false,
  fullWidth = false,
  rounded = false,
  className = '',
  disabled,
  ...props
}) => {
  // Construir clases CSS
  const classes = [
    'custom-button',
    `custom-button--${variant}`,
    size && `custom-button--${size}`,
    fullWidth && 'custom-button--full-width',
    rounded && 'custom-button--rounded',
    loading && 'custom-button--loading',
    className
  ].filter(Boolean).join(' ');

  // Contenido del botón
  const buttonContent = (
    <>
      {loading && (
        <span className="custom-button__spinner me-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </span>
      )}
      {!loading && icon && (
        <span className="custom-button__icon me-2">
          {icon}
        </span>
      )}
      <span className="custom-button__text">
        {children}
      </span>
    </>
  );

  // Si es un enlace interno
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <BootstrapButton
          variant={getBootstrapVariant(variant)}
          size={getBootstrapSize(size)}
          className={classes}
          disabled={disabled || loading}
          {...props}
        >
          {buttonContent}
        </BootstrapButton>
      </Link>
    );
  }

  // Si es un enlace externo
  if (href) {
    return (
      <BootstrapButton
        as="a"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        variant={getBootstrapVariant(variant)}
        size={getBootstrapSize(size)}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </BootstrapButton>
    );
  }

  // Botón normal
  return (
    <BootstrapButton
      variant={getBootstrapVariant(variant)}
      size={getBootstrapSize(size)}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </BootstrapButton>
  );
};

export default Button;
