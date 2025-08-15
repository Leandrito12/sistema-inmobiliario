/**
 * Exportaciones centralizadas de componentes comunes reutilizables
 */

// Button
export { default as Button } from './Button';
export type { CustomButtonProps, ButtonVariant, ButtonSize } from './Button';

// ServiceCard
export { default as ServiceCard } from './ServiceCard';
export type { ServiceCardProps } from './ServiceCard';

// Section
export { default as Section } from './Section';
export type { SectionProps } from './Section';

// PropertyCard
export { default as PropertyCard } from './PropertyCard';
export type { 
  PropertyCardProps, 
  PropertyLocation, 
  PropertyCharacteristics, 
  PropertyImage, 
  PropertyStatus 
} from './PropertyCard';
