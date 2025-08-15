import type { FooterLink } from '../../../components/common';

// Configuración para las tarjetas de contacto
export interface ContactCardConfig {
  id: string;
  iconName: 'phone' | 'envelope' | 'location' | 'whatsapp';
  title: string;
  contentType: 'phones' | 'emails' | 'address' | 'whatsapp';
  iconGradient: string;
  animationDelay: number;
}

// Array de configuración para ContactCards
export const contactCardsConfig: ContactCardConfig[] = [
  {
    id: 'phone',
    iconName: 'phone',
    title: 'Teléfono',
    contentType: 'phones',
    iconGradient: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
    animationDelay: 100
  },
  {
    id: 'email',
    iconName: 'envelope',
    title: 'Email',
    contentType: 'emails',
    iconGradient: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
    animationDelay: 200
  },
  {
    id: 'location',
    iconName: 'location',
    title: 'Ubicación',
    contentType: 'address',
    iconGradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    animationDelay: 300
  },
  {
    id: 'whatsapp',
    iconName: 'whatsapp',
    title: 'WhatsApp',
    contentType: 'whatsapp',
    iconGradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    animationDelay: 400
  }
];

// Enlaces de servicios
export const servicesLinks: FooterLink[] = [
  { text: 'Compra de Propiedades', href: '/propiedades?operacion=venta' },
  { text: 'Venta de Inmuebles', href: '/servicios/venta' },
  { text: 'Asesoría Legal', href: '/servicios/asesoria' },
  { text: 'Financiamiento', href: '/servicios/financiamiento' }
];

// Enlaces de tipos de propiedades
export const propertiesLinks: FooterLink[] = [
  { text: 'Casas', href: '/propiedades?tipo=casa' },
  { text: 'Apartamentos', href: '/propiedades?tipo=apartamento' },
  { text: 'Villas', href: '/propiedades?tipo=villa' },
  { text: 'Terrenos', href: '/propiedades?tipo=terreno' }
];

// Enlaces de información de la empresa
export const companyLinks: FooterLink[] = [
  { text: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { text: 'Nuestro Equipo', href: '/equipo' },
  { text: 'Testimonios', href: '/testimonios' },
  { text: 'Blog', href: '/blog' }
];

// Enlaces legales
export const legalLinks: FooterLink[] = [
  { text: 'Términos de Uso', href: '/terminos' },
  { text: 'Política de Privacidad', href: '/privacidad' },
  { text: 'Cookies', href: '/cookies' },
  { text: 'Contacto', href: '#contacto' }
];

// Información de contacto
export const contactInfo = {
  phones: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  emails: ['info@inmobiliariaplus.com', 'ventas@inmobiliariaplus.com'],
  address: {
    street: 'Av. Principal 123',
    location: 'Centro, Ciudad'
  },
  whatsapp: {
    number: '+1 (555) 123-4567',
    description: 'Chat 24/7'
  }
};

// Enlaces de redes sociales
export const socialLinks = {
  facebook: 'https://facebook.com/inmobiliariaplus',
  instagram: 'https://instagram.com/inmobiliariaplus',
  twitter: 'https://twitter.com/inmobiliariaplus',
  linkedin: 'https://linkedin.com/company/inmobiliariaplus'
};

// Configuración de WhatsApp
export const whatsappConfig = {
  number: '5491112345678', // Número para wa.me
  message: 'Hola, estoy interesado/a en sus servicios y me gustaría recibir más información.'
};

// Configuración de email
export const emailConfig = {
  address: 'info@inmobiliariaplus.com',
  subject: 'Consulta general desde el sitio web',
  body: 'Hola, estoy interesado/a en sus servicios y me gustaría recibir más información.\n\nGracias.'
};
