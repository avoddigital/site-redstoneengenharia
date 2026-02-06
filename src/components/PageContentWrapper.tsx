import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from '../context/TransitionContext';

export const PageContentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isTransitioning } = usePageTransition();

  return (
    <motion.div
      animate={isTransitioning ? {
        scale: 0.98,
        filter: 'blur(2px) brightness(0.9)',
        transformPerspective: 1000,
        rotateX: 1, // subtle 3d effect
        y: 10
      } : {
        scale: 1,
        filter: 'blur(0px) brightness(1)',
        transformPerspective: 1000,
        rotateX: 0,
        y: 0
      }}
      transition={{ duration: 0.8, ease: [0.32, 0, 0.24, 1] }}
      className="w-full min-h-screen bg-background-light dark:bg-background-dark origin-center"
    >
      {children}
    </motion.div>
  );
};
