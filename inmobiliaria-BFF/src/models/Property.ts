import mongoose, { Document, Schema } from "mongoose";

export interface IProperty extends Document {
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: "casa" | "apartamento" | "oficina" | "local" | "terreno";
  operacion: "venta" | "alquiler";
  ubicacion: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  caracteristicas: {
    habitaciones?: number;
    baños?: number;
    area: number;
    estacionamientos?: number;
    antiguedad?: number;
  };
  imagenes: Array<{
    _id?: string;
    url: string;
    alt: string;
    orden: number;
    nombreArchivo: string;
    tamano?: number;
    tamanoOriginal?: number;
    compresion?: number;
    tipo?: string;
    esPortada: boolean;
    thumbnail?: string;
    dimensiones?: {
      width: number;
      height: number;
    };
  }>;
  amenidades: string[];
  estado: "disponible" | "vendido" | "alquilado" | "reservado";
  destacado: boolean;
  fechaPublicacion: Date;
  fechaActualizacion: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    titulo: {
      type: String,
      required: [true, "El título es requerido"],
      trim: true,
      maxlength: [100, "El título no puede exceder 100 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      maxlength: [1000, "La descripción no puede exceder 1000 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio debe ser positivo"],
    },
    tipo: {
      type: String,
      required: [true, "El tipo de propiedad es requerido"],
      enum: {
        values: ["casa", "apartamento", "oficina", "local", "terreno"],
        message: "Tipo de propiedad no válido",
      },
    },
    operacion: {
      type: String,
      required: [true, "El tipo de operación es requerido"],
      enum: {
        values: ["venta", "alquiler"],
        message: "Tipo de operación no válido",
      },
    },
    ubicacion: {
      direccion: {
        type: String,
        required: [true, "La dirección es requerida"],
        trim: true,
      },
      ciudad: {
        type: String,
        required: [true, "La ciudad es requerida"],
        trim: true,
      },
      estado: {
        type: String,
        required: [true, "El estado es requerido"],
        trim: true,
      },
      codigoPostal: {
        type: String,
        required: [true, "El código postal es requerido"],
        trim: true,
      },
      coordenadas: {
        lat: Number,
        lng: Number,
      },
    },
    caracteristicas: {
      habitaciones: {
        type: Number,
        min: [0, "El número de habitaciones debe ser positivo"],
      },
      baños: {
        type: Number,
        min: [0, "El número de baños debe ser positivo"],
      },
      area: {
        type: Number,
        required: [true, "El área es requerida"],
        min: [1, "El área debe ser mayor a 0"],
      },
      estacionamientos: {
        type: Number,
        min: [0, "El número de estacionamientos debe ser positivo"],
      },
      antiguedad: {
        type: Number,
        min: [0, "La antigüedad debe ser positiva"],
      },
    },
    imagenes: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        url: {
          type: String,
          required: [true, "La URL de la imagen es requerida"],
        },
        alt: {
          type: String,
          required: [true, "El texto alternativo es requerido"],
        },
        orden: {
          type: Number,
          required: [true, "El orden de la imagen es requerido"],
        },
        nombreArchivo: {
          type: String,
          required: [true, "El nombre del archivo es requerido"],
        },
        tamano: {
          type: Number,
        },
        tamanoOriginal: {
          type: Number,
        },
        compresion: {
          type: Number,
        },
        tipo: {
          type: String,
        },
        esPortada: {
          type: Boolean,
          default: false,
        },
        thumbnail: {
          type: String,
        },
        dimensiones: {
          width: {
            type: Number,
          },
          height: {
            type: Number,
          },
        },
      },
    ],
    amenidades: [String],
    estado: {
      type: String,
      enum: {
        values: ["disponible", "vendido", "alquilado", "reservado"],
        message: "Estado de propiedad no válido",
      },
      default: "disponible",
    },
    destacado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "fechaPublicacion",
      updatedAt: "fechaActualizacion",
    },
  }
);

// Índices para mejor rendimiento
propertySchema.index({ tipo: 1, operacion: 1 });
propertySchema.index({ precio: 1 });
propertySchema.index({ estado: 1 });
propertySchema.index({ destacado: -1 });
propertySchema.index({ "ubicacion.ciudad": 1 });

export const Property = mongoose.model<IProperty>("Property", propertySchema);
