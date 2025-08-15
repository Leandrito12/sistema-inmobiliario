import mongoose, { Document, Schema } from "mongoose";

export interface IAmenity extends Document {
  name: string;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const amenitySchema = new Schema<IAmenity>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'Seguridad',
      'Espacios recreativos',
      'Deportes y recreación',
      'Espacios sociales',
      'Servicios gastronómicos',
      'Espacios exteriores',
      'Estacionamiento',
      'Transporte vertical',
      'Personal de servicio',
      'Climatización',
      'Espacios interiores',
      'Cocina',
      'Características estructurales',
      'Entrada y accesos',
      'Ventanas e iluminación',
      'Servicios públicos',
      'Estado y equipamiento',
      'Ubicación y entorno',
      'Comercios y servicios',
      'Características especiales',
      'Mascotas'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para optimizar búsquedas
amenitySchema.index({ name: 'text' });
amenitySchema.index({ category: 1 });
amenitySchema.index({ isActive: 1 });

export const Amenity = mongoose.model<IAmenity>("Amenity", amenitySchema);
