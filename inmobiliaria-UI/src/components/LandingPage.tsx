import React from 'react';
import Hero from './Hero';
import FeaturedProperties from './FeaturedProperties';
import Services from './Services';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Services />
      <Footer />
    </>
  );
};

export default LandingPage;
