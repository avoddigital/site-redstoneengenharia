import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import { IMAGES } from '../constants';

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 }); // Repeatable, waits for 40% visibility
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
  const quoteVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: PREMIUM_EASE }
    }
  };

  const textBlockVariants = (delay: number) => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: PREMIUM_EASE, delay } 
    }
  });

  const highlightVariants = {
    hidden: { 
      color: "rgba(17, 24, 39, 1)" // text-gray-900 equivalent (approx) or inherit
    },
    visible: { 
      color: "#881B1B", // Primary color (Bordô)
      transition: { duration: 0.4, delay: 0.3, ease: "easeOut" }
    }
  };

  const authorVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: PREMIUM_EASE, delay: 0.40 } 
    }
  };

  return (
    <section className="py-20 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={quoteVariants}
          className="mb-8"
        >
           <Icon name="format_quote" className="text-6xl text-gray-200 dark:text-gray-800" style={{ fontVariationSettings: "'FILL' 1" }} />
        </motion.div>
        
        <h3 className="text-2xl md:text-4xl font-light text-gray-900 dark:text-white leading-snug mb-8">
          <motion.span 
             initial="hidden"
             animate={controls}
             variants={textBlockVariants(0.12)}
             className="inline-block"
          >
            "A Redstone Engenharia trouxe um nível de{' '}
            <motion.span 
              variants={highlightVariants}
              className="text-primary font-normal"
            >
              clareza e precisão
            </motion.span>{' '}
            para nossa expansão industrial que não víamos há décadas.
          </motion.span>
          <br className="hidden md:inline" /> {/* Optional break for editorial look */}
          <motion.span 
             initial="hidden"
             animate={controls}
             variants={textBlockVariants(0.24)}
             className="inline-block"
          >
             Eles não apenas seguem planos; eles os aprimoram."
          </motion.span>
        </h3>
        
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={authorVariants}
          className="flex items-center justify-center gap-4 group cursor-default"
        >
          <motion.img 
            src={IMAGES.TESTIMONIAL_AVATAR} 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 transition-transform duration-300 group-hover:-translate-y-1" 
          />
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white relative inline-block">
              Murillo Alvarez Alves
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CEO, Engenheiro Civil</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;