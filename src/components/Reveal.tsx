import React, { useRef, useEffect } from 'react';
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
  delay = 0.15, // Cinematic start
  className = "",
  duration = 0.8, // Cinematic duration
  threshold = 0.3 
}) => {
  const ref = useRef(null);
  // once: false ensures it triggers every time.
  const isInView = useInView(ref, { once: false, amount: threshold });
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout;

    if (isInView) {
      // If entering view, animate immediately
      controls.start("visible");
    } else {
      // If leaving view, wait a bit before hiding to avoid flicker/micro-scroll issues
      timeoutId = setTimeout(() => {
        controls.start("hidden");
      }, 150); // 150ms debounce/cooldown
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, controls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 16, // Reduced displacement
      scale: shouldReduceMotion ? 1 : 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
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
        animate={controls}
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
  stagger = 0.2, // Slower ripple (0.2s)
  threshold = 0.2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  const controls = useAnimation();
  
  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout;

    if (isInView) {
      controls.start("visible");
    } else {
      timeoutId = setTimeout(() => {
        controls.start("hidden");
      }, 150);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.15 // Consistent initial delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
