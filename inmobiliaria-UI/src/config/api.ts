// Configuración centralizada para el backend
export const API_BASE_URL = "http://localhost:5001/api";

// Endpoints específicos
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
  PROPERTIES: {
    BASE: `${API_BASE_URL}/properties`,
    BY_ID: (id: string) => `${API_BASE_URL}/properties/${id}`,
  },
};

// Headers comunes
export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getAuthHeadersForFormData = () => {
  const token = localStorage.getItem("adminToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Función para hacer fetch con manejo de CORS
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Configuración simplificada para evitar problemas de CORS
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    return response;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
