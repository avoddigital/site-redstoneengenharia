import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../context/TransitionContext';
import clsx from 'clsx';

export const TransitionOverlay: React.FC = () => {
  const { isTransitioning, transitionOrigin, transitionText } = usePageTransition();

  // Disable scroll when transitioning
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTransitioning]);

  if (!isTransitioning || !transitionOrigin) return null;

  // Calculate the scale needed to cover the screen from the button's position
  // We approximate heavily or calculate precise dist. 
  // For a circular expansion, max distance to a corner is the radius needed.
  
  // Viewport dimensions
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  // Distances to corners
  const distTL = Math.hypot(transitionOrigin.x, transitionOrigin.y);
  const distTR = Math.hypot(vw - transitionOrigin.x, transitionOrigin.y);
  const distBL = Math.hypot(transitionOrigin.x, vh - transitionOrigin.y);
  const distBR = Math.hypot(vw - transitionOrigin.x, vh - transitionOrigin.y);
  
  const maxDist = Math.max(distTL, distTR, distBL, distBR);
  
  // The button is likely wider than tall. 
  // We want to expand from the button's size to the full screen.
  // We can animate "scale" of a circle or rect.
  // A clean portal usually starts as the shape of the button and morphs or just a giant circle expanding.
  // Let's go with a giant circle expanding from center of button.
  
  const initialSize = Math.max(transitionOrigin.width, transitionOrigin.height);
  const finalSize = maxDist * 2.5; // Safety margin
  
  const centerX = transitionOrigin.x + transitionOrigin.width / 2;
  const centerY = transitionOrigin.y + transitionOrigin.height / 2;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
            {/* Backdrop Blur / Dim - Stays fixed */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-md"
            />
            
            {/* The Portal (Expanding Circle/Shape) */}
            <motion.div
                initial={{ 
                    width: initialSize,
                    height: initialSize,
                    x: centerX - initialSize/2,
                    y: centerY - initialSize/2,
                    borderRadius: '50px', // Matches button likely
                    opacity: 0.8
                }}
                animate={{ 
                    width: finalSize,
                    height: finalSize,
                    x: centerX - finalSize/2,
                    y: centerY - finalSize/2,
                    borderRadius: '50%', // Morphs to circle
                    opacity: 1
                }}
                transition={{ 
                    duration: 0.8,
                    ease: [0.32, 0, 0.24, 1], // Custom easing for "pop"
                }}
                className="absolute bg-[#881B1B] shadow-[0_0_40px_rgba(136,27,27,0.4)] z-10 overflow-hidden"
            >
                 {/* Inner decorative layers for depth/parallax feel */}
                 {/* We simulate parallax by moving these shapes slightly differently or just rotating them */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1.5, rotate: 10 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 border-[40px] border-white/10 rounded-full"
                 />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 2, rotate: -5 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 border-[20px] border-black/10 rounded-full"
                 />
            </motion.div>

             {/* Text Overlay - Appears after expansion starts */}
            <motion.div
                className="absolute z-20 flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h2 className="text-white text-3xl md:text-5xl font-light tracking-wider drop-shadow-lg">
                    {/* Character staggered reveal if we wanted, but simple fade is clean */}
                    {transitionText || "Abrindo portfólio"}
                </h2>
                <div className="mt-4 w-12 h-1 bg-white/50 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-white"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
