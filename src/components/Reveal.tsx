import React, { useRef } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';

// Premium Easing from user request
const PREMIUM_EASE = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
  duration?: number;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  className = "",
  duration = 0.6,
  threshold = 0.5 // Start when 50% is visible, or customize
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        ease: PREMIUM_EASE,
        delay: delay
      }
    }
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}

export const RevealStagger: React.FC<RevealStaggerProps> = ({ 
  children, 
  className = "",
  stagger = 0.1,
  threshold = 0.2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1 // small initial delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
