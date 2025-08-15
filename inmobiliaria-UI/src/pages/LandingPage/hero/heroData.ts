/**
 * heroData.ts - Datos de configuración para el Hero
 * Contiene todos los textos y configuraciones del hero
 */

// Contenido principal del hero
export const heroContent = {
  title: {
    main: 'Encuentra la',
    highlight: 'Casa de tus Sueños',
    subtitle: 'en el lugar perfecto'
  },
  description: 'Descubre las mejores propiedades en las ubicaciones más exclusivas. Con más de 15 años de experiencia, te ayudamos a encontrar el hogar ideal que se adapte a tu estilo de vida.'
};

// Configuración visual del hero
export const heroConfig = {
  background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 50%, #ff6b35 100%)',
  minHeight: '100vh',
  decorativeElements: {
    primary: {
      top: '10%',
      right: '5%',
      width: '300px',
      height: '300px',
      opacity: 0.1
    },
    secondary: {
      bottom: '15%',
      left: '10%',
      width: '200px',
      height: '200px',
      opacity: 0.08
    }
  }
};
