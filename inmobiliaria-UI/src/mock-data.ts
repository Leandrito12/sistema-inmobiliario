export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  type: string;
  features: string[];
  yearBuilt?: number;
  parkingSpaces?: number;
  neighborhood?: string;
  status?: string;
  featured?: boolean;
  pricePerSqM?: number;
  parking?: string;
  fullDescription?: string;
  amenities?: string[];
  nearbyPlaces?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Casa Moderna en Zona Residencial Premium",
    price: 450000,
    location: "Barrio Norte, Buenos Aires",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "Hermosa casa moderna con excelente ubicación en zona residencial premium. Cuenta con amplios espacios, jardín y terminaciones de primera calidad.",
    type: "casa",
    features: [
      "Jardín",
      "Garage",
      "Piscina",
      "Parrilla",
      "Seguridad 24hs",
      "Calefacción central",
    ],
    yearBuilt: 2020,
    parkingSpaces: 2,
    agent: {
      name: "María González",
      phone: "+54 11 1234-5678",
      email: "maria@inmobiliaria.com",
    },
  },
  {
    id: 2,
    title: "Departamento Luxury en Torre Premium",
    price: 320000,
    location: "Puerto Madero, Buenos Aires",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "Exclusivo departamento en torre premium con vista al río. Amenities de lujo y ubicación inmejorable.",
    type: "apartamento",
    features: [
      "Vista al río",
      "Gimnasio",
      "Piscina",
      "Seguridad 24hs",
      "Aire acondicionado",
      "Balcón",
    ],
    yearBuilt: 2019,
    parkingSpaces: 1,
    agent: {
      name: "Carlos Rodríguez",
      phone: "+54 11 9876-5432",
      email: "carlos@inmobiliaria.com",
    },
  },
];
