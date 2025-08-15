import React from 'react';
import ContactSection from './ContactSection';
import FooterMain from './FooterMain';
import FooterBottom from './FooterBottom';

const Footer: React.FC = () => {
  return (
    <footer 
      id="contacto"
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white'
      }}
    >
      {/* Sección de contacto */}
      <ContactSection />

      {/* Footer principal */}
      <FooterMain />

      {/* Footer bottom */}
      <FooterBottom />
    </footer>
  );
};

export default Footer;
