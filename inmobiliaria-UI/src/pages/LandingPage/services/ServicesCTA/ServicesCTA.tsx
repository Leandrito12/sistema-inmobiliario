/**
 * ServicesCTA - Componente para el Call-to-Action de servicios
 * Muestra una invitación a contactar para consulta gratuita
 */

import React from 'react';
import { servicesCTA } from '../servicesData';
import './ServicesCTA.styles.css';

const ServicesCTA: React.FC = () => {
  const handleConsultaClick = () => {
    console.log('Solicitud de consulta gratuita');
    // Aquí podrías agregar lógica para abrir un formulario de contacto
  };

  return (
    <div className="text-center mt-5" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div 
            className="services-cta-container p-5 rounded"
            style={{
              background: servicesCTA.background,
              color: servicesCTA.textColor
            }}
          >
            <h3 className="fw-bold mb-3 services-cta-title">
              {servicesCTA.title}
            </h3>
            <p className="mb-4 services-cta-description">
              {servicesCTA.description}
            </p>
            <button
              onClick={handleConsultaClick}
              className="btn btn-light btn-lg services-cta-button fw-bold px-5 py-3"
            >
              {servicesCTA.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCTA;
