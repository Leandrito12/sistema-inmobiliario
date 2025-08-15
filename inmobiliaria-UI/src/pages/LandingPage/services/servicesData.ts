// Interfaz para definir la estructura de un servicio
export interface Service {
  id: number;
  title: string;
  description: string;
  iconName: string; // Cambiado de icon a iconName
  color: string;
}

// Interfaz para la configuración del CTA
export interface ServicesCTA {
  title: string;
  description: string;
  buttonText: string;
  background: string;
  textColor: string;
}

// Interfaz para la configuración del header
export interface ServicesHeader {
  title: string;
  subtitle: string;
  description: string;
}

// Configuración del header de la sección
export const servicesHeader: ServicesHeader = {
  title: "Nuestros",
  subtitle: "Servicios",
  description: "Ofrecemos una gama completa de servicios inmobiliarios diseñados para hacer tu experiencia más fácil, segura y exitosa."
};

// Array de servicios
export const servicesData: Service[] = [
  {
    id: 1,
    title: "Compra de Propiedades",
    description: "Te ayudamos a encontrar la propiedad perfecta que se ajuste a tu presupuesto y necesidades.",
    iconName: "FaHome",
    color: '#6f42c1'
  },
  {
    id: 2,
    title: "Venta de Inmuebles",
    description: "Maximiza el valor de tu propiedad con nuestra estrategia de marketing especializada.",
    iconName: "FaSearch",
    color: '#ff6b35'
  },
  {
    id: 3,
    title: "Asesoría Legal",
    description: "Proceso de compra-venta seguro con asesoría legal completa y documentación en regla.",
    iconName: "FaShieldAlt",
    color: '#28a745'
  },
  {
    id: 4,
    title: "Financiamiento",
    description: "Conectamos con las mejores opciones de crédito hipotecario para hacer realidad tu inversión.",
    iconName: "FaCalculator",
    color: '#17a2b8'
  },
  {
    id: 5,
    title: "Negociación",
    description: "Nuestros expertos negocian en tu nombre para obtener las mejores condiciones del mercado.",
    iconName: "FaHandshake",
    color: '#ffc107'
  },
  {
    id: 6,
    title: "Atención Personalizada",
    description: "Servicio al cliente 24/7 con un equipo dedicado que te acompañará en todo el proceso.",
    iconName: "FaUsers",
    color: '#e83e8c'
  }
];

// Configuración del CTA (Call to Action)
export const servicesCTA: ServicesCTA = {
  title: "¿Listo para comenzar?",
  description: "Nuestro equipo de expertos está preparado para ayudarte en cada paso del camino. Desde la primera consulta hasta la entrega de llaves.",
  buttonText: "Consulta Gratuita",
  background: "linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)",
  textColor: "white"
};

// Configuración general de la sección
export const servicesConfig = {
  id: "servicios",
  background: "#ffffff",
  themeColor: "#6f42c1",
  hasDecorations: true
};
