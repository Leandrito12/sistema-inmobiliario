/**
 * PropertyCard - Componente reutilizable para mostrar tarjetas de propiedades
 */

export { default as PropertyCardNew } from './PropertyCardNew';
export { default } from './PropertyCardNew';

// Exportar componentes internos para uso independiente
export * from './components';

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
