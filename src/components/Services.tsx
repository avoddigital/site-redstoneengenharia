import React from 'react';
import Icon from './Icon';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
  const services = SERVICES_DATA;

  return (
    <section id="services" className="py-24 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Nossa Expertise</h3>
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">Soluções de Ponta a Ponta</h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-gray-900 dark:text-white font-medium hover:text-primary transition-colors">
            Ver todos os serviços
            <span className="group-hover:translate-x-1 transition-transform">
               <Icon name="arrow_forward" />
            </span>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-background-light dark:bg-background-dark rounded-[2rem] p-4 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full border border-white/20">
                  <span className="text-white rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center w-full h-full">
                     <Icon name="arrow_forward" />
                  </span>
                </div>

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-medium text-white mb-1">{service.title}</h3>
                  <p className="text-gray-300 font-light text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;