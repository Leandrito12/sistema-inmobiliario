/**
 * Tipos específicos del componente PropertyCard
 * Para tipos reutilizables, ver src/types/property.ts
 */

import type { PropertyLocation, PropertyCharacteristics, PropertyImage, PropertyStatus } from '../../../types/property';

/**
 * Props del componente PropertyCard
 * Tipos base importados desde los tipos globales
 */
export interface PropertyCardProps {
  /** ID único de la propiedad */
  id: string;
  /** Título de la propiedad */
  titulo: string;
  /** Precio de la propiedad */
  precio: number;
  /** Moneda del precio */
  moneda: string;
  /** Ubicación de la propiedad */
  ubicacion: PropertyLocation;
  /** Características de la propiedad */
  caracteristicas: PropertyCharacteristics;
  /** Array de imágenes */
  imagenes: PropertyImage[];
  /** Tipo de propiedad */
  tipo: string;
  /** Estado actual */
  estado: PropertyStatus;
  /** Si es propiedad destacada */
  destacado?: boolean;
  /** Índice para animaciones */
  animationDelay?: number;
  /** Función para obtener URL de imagen */
  getImageUrl?: (imagePath: string) => string;
  /** Clases CSS adicionales */
  className?: string;
  /** Callback cuando se hace clic en la cámara */
  onCameraClick?: () => void;
}

// Re-exportar tipos globales para conveniencia
export type { PropertyLocation, PropertyCharacteristics, PropertyImage, PropertyStatus };
