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
export { PropertyCardNew } from './PropertyCard';
export type { 
  PropertyCardProps, 
  PropertyLocation, 
  PropertyCharacteristics, 
  PropertyImage, 
  PropertyStatus 
} from './PropertyCard';

// ContactCard
export { default as ContactCard } from './ContactCard';
export type { ContactCardProps } from './ContactCard';

// SocialButton
export { default as SocialButton } from './SocialButton';
export type { SocialButtonProps } from './SocialButton';

// FooterSection
export { default as FooterSection } from './FooterSection';
export type { FooterSectionProps, FooterLink } from './FooterSection';
