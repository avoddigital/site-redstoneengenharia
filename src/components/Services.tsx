import React from 'react';
import Icon from './Icon';
import { SERVICES_DATA } from '../constants';
import { Reveal, RevealStagger } from './Reveal';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = SERVICES_DATA;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // tolerance
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Scroll 80% of view
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="services" className="py-24 bg-surface-light dark:bg-surface-dark overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 w-full max-w-[1200px] 2xl:max-w-[1400px] relative group/section">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <Reveal>
            <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Nossa Expertise</h3>
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">Soluções de Ponta a Ponta</h2>
          </Reveal>
        </div>

        {/* Carousel Container */}
        <Reveal width="100%">
          <div className="relative">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -mt-6 z-40 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-300 -ml-4 md:-ml-6 shadow-lg hidden md:flex items-center justify-center opacity-0 group-hover/section:opacity-100"
                aria-label="Anterior"
              >
                <Icon name="west" className="text-2xl" />
              </button>
            )}

            {/* Right Arrow */}
            {showRightArrow && (
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mt-6 z-40 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-300 -mr-4 md:-mr-6 shadow-lg hidden md:flex items-center justify-center opacity-0 group-hover/section:opacity-100"
                aria-label="Próximo"
              >
                <Icon name="east" className="text-2xl" />
              </button>
            )}

            {/* Horizontal Scroll Layout */}
            <RevealStagger 
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 -mb-12 px-2 no-scrollbar"
              stagger={0.1}
            >
              <div ref={scrollContainerRef} className="contents"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {services.map((service, index) => (
                  <div key={index} className="min-w-[85vw] sm:min-w-[45%] lg:min-w-[360px] snap-center group relative bg-background-light dark:bg-background-dark rounded-[2rem] p-4 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl relative">
                      <a href={service.href} className="block w-full h-full" aria-label={`Ver detalhes sobre ${service.title}`}>
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                      </a>
                      
                      <a 
                        href={service.href}
                        className="absolute top-6 right-6 bg-white/10 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/20 transition-colors z-20"
                        aria-label={`Ir para ${service.title}`}
                      >
                        <span className="text-white flex items-center justify-center w-full h-full transform transition-transform duration-500 group-hover:rotate-45">
                           <Icon name="north_east" />
                        </span>
                      </a>

                      <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
                        <a href={service.href} className="pointer-events-auto inline-block">
                          <h3 className="text-2xl font-medium text-white mb-1 hover:underline decoration-white/50 underline-offset-4 transition-all">
                            {service.title}
                          </h3>
                        </a>
                        <p className="text-gray-300 font-light text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealStagger>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Services;