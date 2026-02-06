import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import { IMAGES } from '../constants';

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

const CaseStudy: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Repeatable
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInView) {
      controls.start("visible");
    } else {
      timeoutId = setTimeout(() => {
        controls.start("hidden");
      }, 150);
    }
    return () => clearTimeout(timeoutId);
  }, [isInView, controls]);

  // Variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 16 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: PREMIUM_EASE }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 1.02,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)' 
    },
    visible: { 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: PREMIUM_EASE, delay: 0.10 }
    }
  };

  const panelVariants = {
    hidden: { 
      opacity: 0,
      x: shouldReduceMotion ? 0 : 16
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: PREMIUM_EASE, delay: 0.16 }
    }
  };

  const textVariants = (delay: number) => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: PREMIUM_EASE, delay } 
    }
  });

  const metricsContainerVariants = {
    visible: {
      transition: { staggerChildren: 0.16, delayChildren: 0.4 } // Start staggering after texts
    }
  };

  const metricItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: PREMIUM_EASE } 
    }
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, delay: 0.8 } // Appear last
    }
  };

  return (
    <section id="projetos" className="py-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative rounded-3xl overflow-hidden bg-black grid lg:grid-cols-2 group shadow-2xl"
        >
          
          {/* Image Side */}
          <div className="relative min-h-[400px] overflow-hidden">
            <motion.img 
              variants={imageVariants}
              src={IMAGES.CASE_STUDY_MODEL} 
              alt="Blueprints and architecture model" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          {/* Content Side */}
          <motion.div 
            variants={panelVariants}
            className="p-12 lg:p-20 flex flex-col justify-center relative bg-[#1A1A1A]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
            
            <motion.span variants={textVariants(0.22)} className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">
              Último Case
            </motion.span>
            
            <motion.h2 variants={textVariants(0.28)} className="text-3xl lg:text-4xl font-light text-white mb-6">
              Torre Horizon: <br />Vida Vertical Sustentável
            </motion.h2>
            
            <motion.p variants={textVariants(0.34)} className="text-gray-400 font-light mb-8 leading-relaxed">
              A Redstone Engenharia superou desafios geológicos significativos para entregar um complexo residencial certificado LEED Platinum em tempo recorde. Utilizando nossos sistemas de tensão pré-fabricados exclusivos.
            </motion.p>

            <motion.div 
              variants={metricsContainerVariants}
              className="grid grid-cols-3 gap-6 mb-8 border-t border-white/10 pt-8"
            >
              <motion.div variants={metricItemVariants}>
                <p className="text-2xl text-white font-medium">24 meses</p>
                <p className="text-xs text-gray-500 mt-1">Prazo</p>
              </motion.div>
              <motion.div variants={metricItemVariants}>
                <p className="text-2xl text-white font-medium">$120M</p>
                <p className="text-xs text-gray-500 mt-1">Orçamento</p>
              </motion.div>
              <motion.div variants={metricItemVariants}>
                <p className="text-2xl text-white font-medium">Zero</p>
                <p className="text-xs text-gray-500 mt-1">Acidentes</p>
              </motion.div>
            </motion.div>

            <motion.div variants={linkVariants}>
              <Link to="/projetos" className="inline-flex items-center text-white font-medium hover:text-primary transition-colors group/link">
                Ver projetos
                <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                  <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;