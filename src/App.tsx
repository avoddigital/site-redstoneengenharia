import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import About from './components/About';
import Services from './components/Services';
import CaseStudy from './components/CaseStudy';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
        <CaseStudy />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;