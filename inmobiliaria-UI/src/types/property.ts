/**
 * Tipos y interfaces globales para propiedades
 * Reutilizables en toda la aplicación
 */

/**
 * Estados disponibles para una propiedad
 */
export type PropertyStatus = 'disponible' | 'vendido' | 'alquilado' | 'reservado';

/**
 * Información de ubicación de la propiedad
 */
export interface PropertyLocation {
  direccion: string;
  ciudad: string;
  estado?: string;
  codigoPostal?: string;
  pais?: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}

/**
 * Características físicas de la propiedad
 */
export interface PropertyCharacteristics {
  habitaciones: number;
  baños: number;
  area: number;
  pisos?: number;
  garage?: boolean;
  jardin?: boolean;
  piscina?: boolean;
}

/**
 * Estructura de imagen de propiedad
 */
export interface PropertyImage {
  _id?: string;
  url: string;
  alt?: string;
  orden?: number;
  esPortada?: boolean;
}

/**
 * Propiedad completa (para uso en formularios y APIs)
 */
export interface Property {
  _id?: string;
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  operacion: 'venta' | 'alquiler';
  tipo: string;
  ubicacion: PropertyLocation;
  caracteristicas: PropertyCharacteristics;
  imagenes: PropertyImage[];
  estado: PropertyStatus;
  destacado: boolean;
  amenidades: string[];
  fechaPublicacion?: string;
  fechaActualizacion?: string;
}
