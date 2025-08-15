/**
 * PropertyCard - Componente reutilizable para mostrar tarjetas de propiedades
 */

export { default } from './PropertyCard';

// Exportar tipos desde el archivo de tipos
export type {
  PropertyCardProps,
  PropertyLocation,
  PropertyCharacteristics,
  PropertyImage,
  PropertyStatus
} from './types';

// Exportar utilidades
export {
  formatPrice,
  capitalizeStatus,
  getStatusBadgeColor,
  getMainImage
} from './utils';
