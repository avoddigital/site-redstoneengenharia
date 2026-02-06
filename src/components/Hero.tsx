import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import TransitionLink from './TransitionLink';
import Icon from './Icon';
import { IMAGES } from '../constants';

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: PREMIUM_EASE
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: PREMIUM_EASE
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: PREMIUM_EASE,
        delay: 0.2 // Additional delay relative to stagger
      }
    }
  };

  return (
    <section id="home" className="pt-12 pb-12 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 w-full max-w-[1200px] 2xl:max-w-[1400px] relative group">
        <div className="relative w-full h-[85vh] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700">
          <img 
            src={IMAGES.HERO_BG}
            alt="Abstract architectural structure of a modern skyscraper" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
            <motion.div 
              className="max-w-4xl space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
              {/* Badge */}
              <motion.div 
                variants={titleVariants}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-light tracking-widest text-white uppercase">Desde 2025</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                variants={titleVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-light text-white leading-[1.1] tracking-tighter"
              >
                Engenharia de precisão <br />
                para o seu próximo <span className="font-medium italic">grande projeto.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                variants={subtitleVariants}
                className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-xl leading-relaxed"
              >
                A Redstone Engenharia entrega soluções de infraestrutura ultramodernas. Unimos engenharia rigorosa com elegância arquitetônica para construir a base do amanhã.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={ctaVariants}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 w-full sm:w-auto"
              >
                <TransitionLink 
                  to="/projetos" 
                  className="w-full sm:w-auto justify-center bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 group/btn"
                  label="Abrindo portfólio"
                >
                  Ver projetos
                  <span className="transition-transform group-hover/btn:translate-x-1">
                     <Icon name="arrow_outward" />
                  </span>
                </TransitionLink>
                <button className="w-full sm:w-auto justify-center px-8 py-4 rounded-full font-light text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2">
                  <Icon name="play_circle" />
                  Assistir Showreel
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Floater Stats - HIDDEN - Voltar quando tiver mais clientes
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hidden md:flex items-center gap-4 max-w-xs">
            <div className="flex -space-x-3">
              <img src={IMAGES.USER_AVATAR_1} alt="User avatar" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
              <img src={IMAGES.USER_AVATAR_2} alt="User avatar" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-bold text-black">+2k</div>
            </div>
            <div className="text-white">
              <p className="text-2xl font-semibold leading-none">500+</p>
              <p className="text-xs text-gray-300 font-light">Projetos entregues</p>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Hero;