/**
 * Funciones utilitarias globales para propiedades
 * Reutilizables en toda la aplicación
 */

import type { PropertyStatus, PropertyImage } from '../types/property';

/**
 * Formatea el precio con la moneda correspondiente
 * @param price - Precio numérico
 * @param currency - Código de moneda (USD, ARS, EUR, BRL)
 * @param operation - Tipo de operación (opcional, para mostrar "/mes" en alquileres)
 * @returns Precio formateado con símbolo de moneda
 */
export const formatPrice = (price: number, currency: string, operation?: string): string => {
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : currency === 'EUR' ? 'EUR' : 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const formattedPrice = formatter.format(price);
  
  // Si es alquiler, agregar "/mes"
  if (operation === 'alquiler') {
    return `${formattedPrice}/mes`;
  }
  
  return formattedPrice;
};

/**
 * Capitaliza el estado de la propiedad
 * @param status - Estado en minúsculas
 * @returns Estado capitalizado
 */
export const capitalizeStatus = (status: PropertyStatus): string => {
  const statusMap: Record<PropertyStatus, string> = {
    'disponible': 'Disponible',
    'vendido': 'Vendido',
    'alquilado': 'Alquilado',
    'reservado': 'Reservado'
  };
  return statusMap[status] || status;
};

/**
 * Obtiene el color del badge según el estado de la propiedad
 * @param status - Estado de la propiedad
 * @returns Color del badge para Bootstrap
 */
export const getStatusBadgeColor = (status: PropertyStatus): string => {
  switch (status) {
    case 'disponible':
      return 'success';
    case 'vendido':
      return 'danger';
    case 'alquilado':
      return 'warning';
    case 'reservado':
      return 'info';
    default:
      return 'secondary';
  }
};

/**
 * Obtiene la imagen principal de una propiedad
 * @param images - Array de imágenes de la propiedad
 * @param getImageUrl - Función para procesar la URL de imagen
 * @returns URL de la imagen principal procesada
 */
export const getMainImage = (
  images: PropertyImage[], 
  getImageUrl: (path: string) => string = (path) => path
): string => {
  const mainImage = images.find(img => img.esPortada)?.url || images[0]?.url || '';
  return getImageUrl(mainImage);
};
