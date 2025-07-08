import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaCamera, 
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaEye,
  FaCar
} from 'react-icons/fa';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  type: 'Casa' | 'Apartamento' | 'Duplex' | 'Villa' | 'Estudio' | 'Penthouse' | 'Townhouse';
  status: 'Venta' | 'Alquiler' | 'Vendido' | 'Alquilado';
  yearBuilt: number;
  parking: number;
  amenities: string[];
  description: string;
  pricePerSqM: number;
}

interface SearchFilters {
  location: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  status: string;
  amenities: string[];
}

const PropertiesView: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const titleRef = React.useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    status: '',
    amenities: []
  });

  // Datos de ejemplo de propiedades
  const mockProperties: Property[] = [
    {
      id: 1,
      title: "Casa Moderna en Zona Residencial Premium",
      price: 450000,
      location: "Zona Norte",
      neighborhood: "Las Colinas",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa",
      status: "Venta",
      yearBuilt: 2021,
      parking: 2,
      amenities: ["Piscina", "Jardín", "Seguridad 24h", "Aire Acondicionado"],
      description: "Hermosa casa moderna con acabados de lujo, ubicada en zona residencial exclusiva.",
      pricePerSqM: 1607
    },
    {
      id: 2,
      title: "Apartamento de Lujo con Vista Panorámica",
      price: 320000,
      location: "Centro",
      neighborhood: "Downtown",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
      featured: true,
      type: "Apartamento",
      status: "Venta",
      yearBuilt: 2020,
      parking: 1,
      amenities: ["Gimnasio", "Terraza", "Concierge", "Wi-Fi"],
      description: "Apartamento moderno en el corazón de la ciudad con vistas espectaculares.",
      pricePerSqM: 2133
    },
    {
      id: 3,
      title: "Villa Exclusiva con Piscina y Jardín",
      price: 750000,
      location: "Zona Exclusiva",
      neighborhood: "Country Club",
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
      featured: true,
      type: "Villa",
      status: "Venta",
      yearBuilt: 2019,
      parking: 3,
      amenities: ["Piscina", "Jardín", "BBQ Area", "Cava de Vinos", "Jacuzzi"],
      description: "Villa de lujo con amplios espacios y acabados premium.",
      pricePerSqM: 1786
    },
    {
      id: 4,
      title: "Duplex Moderno en Zona Comercial",
      price: 380000,
      location: "Zona Comercial",
      neighborhood: "Business District",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&h=300&fit=crop",
      featured: false,
      type: "Duplex",
      status: "Venta",
      yearBuilt: 2022,
      parking: 2,
      amenities: ["Balcón", "Aire Acondicionado", "Closets"],
      description: "Duplex contemporáneo con excelente ubicación comercial.",
      pricePerSqM: 1900
    },
    {
      id: 5,
      title: "Penthouse con Terraza Privada",
      price: 850000,
      location: "Centro",
      neighborhood: "Skyline",
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      featured: true,
      type: "Penthouse",
      status: "Venta",
      yearBuilt: 2023,
      parking: 2,
      amenities: ["Terraza", "Jacuzzi", "Bar", "Vista 360°", "Smart Home"],
      description: "Penthouse exclusivo en el último piso con terraza privada.",
      pricePerSqM: 2833
    },
    {
      id: 6,
      title: "Casa Familiar en Barrio Tranquilo",
      price: 2800,
      location: "Zona Sur",
      neighborhood: "Jardines del Sur",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop",
      featured: false,
      type: "Casa",
      status: "Alquiler",
      yearBuilt: 2018,
      parking: 1,
      amenities: ["Jardín", "Parrilla", "Lavandería"],
      description: "Casa ideal para familias en barrio residencial seguro.",
      pricePerSqM: 16
    },
    {
      id: 7,
      title: "Estudio Minimalista en Centro Histórico",
      price: 180000,
      location: "Centro Histórico",
      neighborhood: "Casco Antiguo",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
      featured: false,
      type: "Estudio",
      status: "Venta",
      yearBuilt: 2023,
      parking: 0,
      amenities: ["Wi-Fi", "Aire Acondicionado", "Amueblado"],
      description: "Estudio moderno perfecto para jóvenes profesionales.",
      pricePerSqM: 4000
    },
    {
      id: 8,
      title: "Townhouse con Jardín Privado",
      price: 520000,
      location: "Zona Oeste",
      neighborhood: "Green Valley",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      featured: true,
      type: "Townhouse",
      status: "Venta",
      yearBuilt: 2020,
      parking: 2,
      amenities: ["Jardín", "Chimenea", "Balcón", "Closets"],
      description: "Townhouse de dos plantas con diseño contemporáneo.",
      pricePerSqM: 2080
    },
    {
      id: 9,
      title: "Apartamento Ejecutivo en Alquiler",
      price: 1500,
      location: "Zona Financiera",
      neighborhood: "Financial District",
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&h=300&fit=crop",
      featured: false,
      type: "Apartamento",
      status: "Alquiler",
      yearBuilt: 2021,
      parking: 1,
      amenities: ["Gimnasio", "Piscina", "Concierge", "Wi-Fi"],
      description: "Apartamento completamente amueblado para ejecutivos.",
      pricePerSqM: 16
    },
    {
      id: 10,
      title: "Casa Colonial Restaurada",
      price: 680000,
      location: "Centro Histórico",
      neighborhood: "Plaza Mayor",
      bedrooms: 5,
      bathrooms: 3,
      area: 320,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa",
      status: "Venta",
      yearBuilt: 1850,
      parking: 1,
      amenities: ["Patio Colonial", "Chimenea", "Techos Altos", "Jardín"],
      description: "Casa colonial completamente restaurada con valor histórico.",
      pricePerSqM: 2125
    },
    {
      id: 11,
      title: "Loft Industrial Moderno",
      price: 420000,
      location: "Zona Industrial",
      neighborhood: "SoHo District",
      bedrooms: 2,
      bathrooms: 2,
      area: 140,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      featured: false,
      type: "Apartamento",
      status: "Venta",
      yearBuilt: 2022,
      parking: 1,
      amenities: ["Techos Altos", "Ventanales", "Aire Acondicionado", "Balcón"],
      description: "Loft con diseño industrial y acabados modernos.",
      pricePerSqM: 3000
    },
    {
      id: 12,
      title: "Villa Mediterránea con Vista al Mar",
      price: 1200000,
      location: "Costa Dorada",
      neighborhood: "Playa Azul",
      bedrooms: 6,
      bathrooms: 5,
      area: 500,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      featured: true,
      type: "Villa",
      status: "Venta",
      yearBuilt: 2018,
      parking: 4,
      amenities: ["Piscina", "Vista al Mar", "Jardín", "Jacuzzi", "BBQ Area"],
      description: "Villa mediterránea con acceso directo a la playa.",
      pricePerSqM: 2400
    },
    {
      id: 13,
      title: "Departamento Económico para Estudiantes",
      price: 800,
      location: "Zona Universitaria",
      neighborhood: "Campus Norte",
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      featured: false,
      type: "Estudio",
      status: "Alquiler",
      yearBuilt: 2019,
      parking: 0,
      amenities: ["Wi-Fi", "Lavandería Compartida", "Cocina Equipada"],
      description: "Estudio perfecto para estudiantes cerca del campus.",
      pricePerSqM: 23
    },
    {
      id: 14,
      title: "Casa de Campo con Hectárea",
      price: 890000,
      location: "Zona Rural",
      neighborhood: "Valle Verde",
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa",
      status: "Venta",
      yearBuilt: 2017,
      parking: 3,
      amenities: ["Jardín", "Piscina", "Caballerizas", "BBQ Area", "Huerta"],
      description: "Casa de campo con amplio terreno y vida tranquila.",
      pricePerSqM: 2967
    },
    {
      id: 15,
      title: "Apartamento de Lujo en Torre Moderna",
      price: 3200,
      location: "Zona Alta",
      neighborhood: "Luxury Heights",
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=500&h=300&fit=crop",
      featured: true,
      type: "Apartamento",
      status: "Alquiler",
      yearBuilt: 2023,
      parking: 2,
      amenities: ["Gimnasio", "Piscina", "Spa", "Concierge", "Vista Panorámica"],
      description: "Apartamento de lujo en la torre más moderna de la ciudad.",
      pricePerSqM: 18
    },
    {
      id: 16,
      title: "Duplex Familiar en Condominio",
      price: 650000,
      location: "Zona Norte",
      neighborhood: "Residencial Los Pinos",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&h=300&fit=crop",
      featured: false,
      type: "Duplex",
      status: "Venta",
      yearBuilt: 2020,
      parking: 2,
      amenities: ["Piscina Comunitaria", "Área de Juegos", "Seguridad 24h", "Jardín"],
      description: "Duplex en condominio cerrado con amenidades familiares.",
      pricePerSqM: 2955
    },
    {
      id: 17,
      title: "Penthouse Ejecutivo con Oficina",
      price: 1100000,
      location: "Centro Financiero",
      neighborhood: "Business Center",
      bedrooms: 3,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&h=300&fit=crop",
      featured: true,
      type: "Penthouse",
      status: "Venta",
      yearBuilt: 2022,
      parking: 3,
      amenities: ["Oficina", "Terraza", "Smart Home", "Jacuzzi", "Bar"],
      description: "Penthouse diseñado para ejecutivos con oficina integrada.",
      pricePerSqM: 3929
    },
    {
      id: 18,
      title: "Casa Ecológica Sustentable",
      price: 580000,
      location: "Zona Verde",
      neighborhood: "Eco Village",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa",
      status: "Venta",
      yearBuilt: 2021,
      parking: 2,
      amenities: ["Paneles Solares", "Jardín", "Sistema de Reciclaje", "Huerta"],
      description: "Casa ecológica con tecnologías sustentables.",
      pricePerSqM: 2900
    },
    {
      id: 19,
      title: "Estudio Amueblado Centro",
      price: 1200,
      location: "Centro",
      neighborhood: "Arts District",
      bedrooms: 1,
      bathrooms: 1,
      area: 50,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      featured: false,
      type: "Estudio",
      status: "Alquiler",
      yearBuilt: 2020,
      parking: 0,
      amenities: ["Amueblado", "Wi-Fi", "Aire Acondicionado", "Balcón"],
      description: "Estudio completamente amueblado en zona artística.",
      pricePerSqM: 24
    },
    {
      id: 20,
      title: "Townhouse de Lujo con Piscina",
      price: 780000,
      location: "Zona Exclusiva",
      neighborhood: "Golden Gate",
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop",
      featured: true,
      type: "Townhouse",
      status: "Venta",
      yearBuilt: 2019,
      parking: 3,
      amenities: ["Piscina", "Jardín", "Terraza", "BBQ Area", "Chimenea"],
      description: "Townhouse de lujo con acabados premium y piscina privada.",
      pricePerSqM: 2229
    },
    {
      id: 21,
      title: "Apartamento Vintage Restaurado",
      price: 380000,
      location: "Centro Histórico",
      neighborhood: "Barrio Antiguo",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop",
      featured: false,
      type: "Apartamento",
      status: "Venta",
      yearBuilt: 1920,
      parking: 0,
      amenities: ["Techos Altos", "Detalles Originales", "Balcón", "Chimenea"],
      description: "Apartamento vintage completamente restaurado con encanto histórico.",
      pricePerSqM: 3167
    },
    {
      id: 22,
      title: "Casa Minimalista Moderna",
      price: 720000,
      location: "Zona Moderna",
      neighborhood: "Design District",
      bedrooms: 4,
      bathrooms: 3,
      area: 240,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
      featured: true,
      type: "Casa",
      status: "Venta",
      yearBuilt: 2023,
      parking: 2,
      amenities: ["Smart Home", "Piscina", "Jardín Zen", "Aire Acondicionado"],
      description: "Casa de diseño minimalista con tecnología inteligente.",
      pricePerSqM: 3000
    },
    {
      id: 23,
      title: "Duplex en Alquiler Amueblado",
      price: 2200,
      location: "Zona Residencial",
      neighborhood: "Family Park",
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop",
      featured: false,
      type: "Duplex",
      status: "Alquiler",
      yearBuilt: 2019,
      parking: 2,
      amenities: ["Amueblado", "Jardín", "Balcón", "Aire Acondicionado"],
      description: "Duplex completamente amueblado en zona familiar.",
      pricePerSqM: 14
    },
    {
      id: 24,
      title: "Villa de Montaña con Vista",
      price: 950000,
      location: "Montaña",
      neighborhood: "Sierra Alta",
      bedrooms: 4,
      bathrooms: 3,
      area: 380,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop",
      featured: true,
      type: "Villa",
      status: "Venta",
      yearBuilt: 2020,
      parking: 3,
      amenities: ["Vista Panorámica", "Chimenea", "Terraza", "Jardín", "BBQ Area"],
      description: "Villa con vistas espectaculares a la montaña.",
      pricePerSqM: 2500
    },
    {
      id: 25,
      title: "Apartamento Compacto Moderno",
      price: 220000,
      location: "Zona Joven",
      neighborhood: "Tech Hub",
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      featured: false,
      type: "Apartamento",
      status: "Venta",
      yearBuilt: 2022,
      parking: 1,
      amenities: ["Smart Home", "Wi-Fi", "Gimnasio", "Aire Acondicionado"],
      description: "Apartamento compacto con tecnología inteligente.",
      pricePerSqM: 3667
    },
    {
      id: 26,
      title: "Casa Tradicional Amplia",
      price: 490000,
      location: "Zona Sur",
      neighborhood: "Tradicional",
      bedrooms: 5,
      bathrooms: 3,
      area: 300,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      featured: false,
      type: "Casa",
      status: "Venta",
      yearBuilt: 2015,
      parking: 2,
      amenities: ["Jardín", "Parrilla", "Terraza", "Lavandería"],
      description: "Casa tradicional con amplios espacios familiares.",
      pricePerSqM: 1633
    },
    {
      id: 27,
      title: "Penthouse con Terraza Jardín",
      price: 4500,
      location: "Zona Alta",
      neighborhood: "Sky Gardens",
      bedrooms: 4,
      bathrooms: 4,
      area: 320,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      featured: true,
      type: "Penthouse",
      status: "Alquiler",
      yearBuilt: 2023,
      parking: 3,
      amenities: ["Terraza Jardín", "Jacuzzi", "Bar", "Smart Home", "Vista 360°"],
      description: "Penthouse de lujo con terraza jardín privada.",
      pricePerSqM: 14
    },
    {
      id: 28,
      title: "Estudio Loft Industrial",
      price: 290000,
      location: "Zona Industrial",
      neighborhood: "Factory District",
      bedrooms: 1,
      bathrooms: 1,
      area: 75,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      featured: false,
      type: "Estudio",
      status: "Venta",
      yearBuilt: 2021,
      parking: 1,
      amenities: ["Techos Altos", "Ventanales", "Aire Acondicionado", "Balcón"],
      description: "Loft industrial convertido en estudio moderno.",
      pricePerSqM: 3867
    },
    {
      id: 29,
      title: "Townhouse Contemporáneo",
      price: 620000,
      location: "Zona Oeste",
      neighborhood: "Contemporary Village",
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      featured: true,
      type: "Townhouse",
      status: "Venta",
      yearBuilt: 2022,
      parking: 2,
      amenities: ["Jardín", "Terraza", "Aire Acondicionado", "Chimenea"],
      description: "Townhouse de diseño contemporáneo en desarrollo nuevo.",
      pricePerSqM: 3100
    },
    {
      id: 30,
      title: "Casa de Playa Frente al Mar",
      price: 1350000,
      location: "Costa Azul",
      neighborhood: "Playa Paraíso",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
      featured: true,
      type: "Villa",
      status: "Venta",
      yearBuilt: 2018,
      parking: 4,
      amenities: ["Frente al Mar", "Piscina", "Jacuzzi", "Terraza", "BBQ Area"],
      description: "Casa de playa exclusiva con acceso directo al mar.",
      pricePerSqM: 3000
    }
  ];

  useEffect(() => {
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
    
    // Auto-scroll al título cuando el componente se monta
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      titleRef.current.focus();
    }
  }, []);

  const filterAndSortProperties = useCallback(() => {
    // Primero aplicar filtros
    const hasFilters = filters.location !== '' || 
                      filters.type !== '' || 
                      filters.minPrice !== '' || 
                      filters.maxPrice !== '' || 
                      filters.bedrooms !== '' || 
                      filters.bathrooms !== '' || 
                      filters.minArea !== '' || 
                      filters.maxArea !== '' || 
                      filters.status !== '' || 
                      filters.amenities.length > 0;

    let filtered;
    if (!hasFilters) {
      filtered = [...properties];
    } else {
      filtered = properties.filter(property => {
        return (
          (filters.location === '' || 
           property.location.toLowerCase().includes(filters.location.toLowerCase()) || 
           property.neighborhood.toLowerCase().includes(filters.location.toLowerCase())) &&
          (filters.type === '' || property.type === filters.type) &&
          (filters.minPrice === '' || property.price >= parseInt(filters.minPrice)) &&
          (filters.maxPrice === '' || property.price <= parseInt(filters.maxPrice)) &&
          (filters.bedrooms === '' || property.bedrooms >= parseInt(filters.bedrooms)) &&
          (filters.bathrooms === '' || property.bathrooms >= parseInt(filters.bathrooms)) &&
          (filters.minArea === '' || property.area >= parseInt(filters.minArea)) &&
          (filters.maxArea === '' || property.area <= parseInt(filters.maxArea)) &&
          (filters.status === '' || property.status === filters.status) &&
          (filters.amenities.length === 0 || 
           filters.amenities.some(amenity => property.amenities.includes(amenity)))
        );
      });
    }

    // Luego aplicar ordenamiento
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'area-large':
          return b.area - a.area;
        case 'area-small':
          return a.area - b.area;
        case 'newest':
          return b.yearBuilt - a.yearBuilt;
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });

    setFilteredProperties(sorted);
  }, [filters, sortBy, properties]);

  useEffect(() => {
    filterAndSortProperties();
  }, [filterAndSortProperties]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      status: '',
      amenities: []
    });
  };

  const formatPrice = (price: number, status: string) => {
    if (status === 'Alquiler') {
      return `$${price.toLocaleString()}/mes`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Venta': return 'primary';
      case 'Alquiler': return 'success';
      case 'Vendido': return 'secondary';
      case 'Alquilado': return 'info';
      default: return 'primary';
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
      <Container>
        {/* Header de la página */}
        <div 
          ref={titleRef}
          className="text-center mb-5" 
          data-aos="fade-up"
          tabIndex={-1}
        >
          <h1 className="display-4 fw-bold text-dark mb-3">
            Nuestras <span style={{ color: '#6f42c1' }}>Propiedades</span>
          </h1>
          <p className="lead text-muted">
            Encuentra la propiedad perfecta entre nuestra amplia selección
          </p>
        </div>

        {/* Barra de búsqueda principal */}
        <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: '15px' }} data-aos="fade-up">
          <Card.Body className="p-4">
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Label className="fw-semibold">Ubicación</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                    <FaMapMarkerAlt style={{ color: '#6f42c1' }} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ciudad, barrio o zona..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    style={{ border: 'none', backgroundColor: '#f8f9fa' }}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Label className="fw-semibold">Tipo de Propiedad</Form.Label>
                <Form.Select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                >
                  <option value="">Todos los tipos</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Estudio">Estudio</option>
                  <option value="Townhouse">Townhouse</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Label className="fw-semibold">Estado</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                >
                  <option value="">Todos</option>
                  <option value="Venta">En Venta</option>
                  <option value="Alquiler">En Alquiler</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex-fill"
                    style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
                  >
                    <FaFilter className="me-2" />
                    Filtros Avanzados
                  </Button>
                  <Button
                    className="fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #6f42c1 0%, #ff6b35 100%)',
                      border: 'none'
                    }}
                  >
                    <FaSearch />
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Filtros avanzados */}
        {showFilters && (
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: '15px' }} data-aos="fade-down">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#6f42c1' }}>Filtros Avanzados</h5>
              <Row className="g-3 mb-3">
                <Col md={3}>
                  <Form.Label className="fw-semibold">Precio Mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 200000"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="fw-semibold">Precio Máximo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 500000"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label className="fw-semibold">Habitaciones</Form.Label>
                  <Form.Select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  >
                    <option value="">Cualquiera</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label className="fw-semibold">Baños</Form.Label>
                  <Form.Select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  >
                    <option value="">Cualquiera</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={clearFilters}
                    className="w-100"
                    style={{ marginTop: '32px' }}
                  >
                    Limpiar Filtros
                  </Button>
                </Col>
              </Row>
              
              <Row className="g-3">
                <Col md={3}>
                  <Form.Label className="fw-semibold">Área Mínima (m²)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 50"
                    value={filters.minArea}
                    onChange={(e) => handleFilterChange('minArea', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="fw-semibold">Área Máxima (m²)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 300"
                    value={filters.maxArea}
                    onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-semibold">Amenidades Principales</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {['Piscina', 'Jardín', 'Gimnasio', 'Seguridad 24h', 'Aire Acondicionado', 'Terraza'].map((amenity) => (
                      <Form.Check
                        key={amenity}
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        label={amenity}
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('amenities', [...filters.amenities, amenity]);
                          } else {
                            handleFilterChange('amenities', filters.amenities.filter(a => a !== amenity));
                          }
                        }}
                        className="me-3"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Barra de herramientas */}
        <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-up">
          <div>
            <span className="text-muted">
              Mostrando {filteredProperties.length} de {properties.length} propiedades
            </span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="text-muted me-2">Ordenar por:</span>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                size="sm"
                style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
              >
                <FaSortAmountDown className="me-2" />
                {sortBy === 'featured' && 'Destacados'}
                {sortBy === 'price-low' && 'Precio: Menor a Mayor'}
                {sortBy === 'price-high' && 'Precio: Mayor a Menor'}
                {sortBy === 'area-large' && 'Área: Mayor a Menor'}
                {sortBy === 'newest' && 'Más Recientes'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy('featured')}>Destacados</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-low')}>Precio: Menor a Mayor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-high')}>Precio: Mayor a Menor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('area-large')}>Área: Mayor a Menor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('newest')}>Más Recientes</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Grid de propiedades */}
        <Row className="g-4">
          {filteredProperties.map((property, index) => (
            <Col lg={4} md={6} key={property.id}>
              <Card 
                className="property-card h-100 border-0 shadow-sm"
                style={{ 
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="position-relative">
                  <div
                    style={{
                      height: '250px',
                      backgroundImage: `url(${property.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  
                  {/* Badges superiores */}
                  <div className="position-absolute top-0 start-0 p-3">
                    <Badge 
                      bg={getStatusBadgeColor(property.status)}
                      className="fw-bold me-2"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px'
                      }}
                    >
                      {property.status}
                    </Badge>
                    {property.featured && (
                      <Badge 
                        className="fw-bold"
                        style={{
                          background: 'linear-gradient(135deg, #ff6b35 0%, #f0932b 100%)',
                          fontSize: '0.8rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px'
                        }}
                      >
                        Destacado
                      </Badge>
                    )}
                  </div>

                  {/* Botones superiores derecha */}
                  <div className="position-absolute top-0 end-0 p-3">
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaHeart />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <FaCamera />
                    </Button>
                  </div>

                  {/* Tipo de propiedad */}
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <Badge 
                      bg="dark" 
                      className="fw-bold"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(0,0,0,0.7) !important'
                      }}
                    >
                      {property.type}
                    </Badge>
                  </div>
                </div>

                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
                      {property.title}
                    </h5>
                    <div className="text-end">
                      <h4 className="fw-bold text-primary mb-0">
                        {formatPrice(property.price, property.status)}
                      </h4>
                      {property.status === 'Venta' && (
                        <small className="text-muted">
                          ${property.pricePerSqM}/m²
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-center text-muted mb-3">
                    <FaMapMarkerAlt className="me-2" style={{ color: '#ff6b35' }} />
                    <span>{property.neighborhood}, {property.location}</span>
                  </div>

                  <Row className="g-3 mb-3">
                    <Col xs={3}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBed style={{ color: '#6f42c1', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Habitaciones</small>
                        <div className="fw-bold">{property.bedrooms}</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaBath style={{ color: '#17a2b8', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Baños</small>
                        <div className="fw-bold">{property.bathrooms}</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaRulerCombined style={{ color: '#28a745', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Área</small>
                        <div className="fw-bold">{property.area}m²</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <FaCar style={{ color: '#ffc107', fontSize: '1.2rem' }} />
                        </div>
                        <small className="text-muted">Parking</small>
                        <div className="fw-bold">{property.parking}</div>
                      </div>
                    </Col>
                  </Row>

                  {/* Amenidades */}
                  {property.amenities.length > 0 && (
                    <div className="mb-3">
                      <small className="text-muted fw-semibold">Amenidades:</small>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <Badge 
                            key={idx}
                            bg="light" 
                            text="dark" 
                            className="fw-normal"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge 
                            bg="secondary" 
                            className="fw-normal"
                            style={{ fontSize: '0.7rem' }}
                          >
                            +{property.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <Link 
                      to={`/propiedad/${property.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button 
                        variant="outline-primary" 
                        className="fw-bold w-100"
                        style={{
                          borderColor: '#6f42c1',
                          color: '#6f42c1',
                          borderWidth: '2px',
                          borderRadius: '25px'
                        }}
                      >
                        <FaEye className="me-2" />
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Mensaje cuando no hay resultados */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-5" data-aos="fade-up">
            <div style={{ color: '#6f42c1', fontSize: '4rem', marginBottom: '1rem' }}>
              <FaSearch />
            </div>
            <h3 className="fw-bold text-dark mb-3">No se encontraron propiedades</h3>
            <p className="text-muted mb-4">
              Intenta ajustar tus filtros de búsqueda para encontrar más opciones
            </p>
            <Button 
              variant="outline-primary"
              onClick={clearFilters}
              style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}

        {/* Paginación (opcional para futuras mejoras) */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-5 mb-5" data-aos="fade-up">
            <Button 
              size="lg" 
              className="fw-bold px-5"
              style={{
                background: 'linear-gradient(135deg, #6f42c1 0%, #4834d4 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
            >
              Cargar Más Propiedades
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PropertiesView;
