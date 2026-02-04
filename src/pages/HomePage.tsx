import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import About from '../components/About';
import Services from '../components/Services';
import CaseStudy from '../components/CaseStudy';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ProposalModal from '../components/ProposalModal';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
        <CaseStudy />
        <Testimonials />
      </main>
      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <ProposalModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
