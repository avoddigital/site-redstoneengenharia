import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTransition } from '../context/TransitionContext';
import { motion, useReducedMotion } from 'framer-motion';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
  label?: string; // Text to show during transition
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  to, 
  children, 
  className, 
  onClick, 
  label = "Abrindo portfólio",
  ...props 
}) => {
  const navigate = useNavigate();
  const { startTransition, endTransition, setTransitionText } = usePageTransition();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);

    if (shouldReduceMotion) {
        navigate(to);
        return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };

    setTransitionText(label);
    
    // Start the visual transition
    startTransition(position, () => {});

    // Navigate after the "cover" phase (approx 600ms-800ms)
    setTimeout(() => {
      navigate(to);
      // We don't verify if navigation ended here usually, 
      // but in a real app we might want to wait for "page load" if we had a router with events.
      // Since it's client side, it's instant.
      
      // Wait a bit more for the "reveal" then end transition
      // But typically we want the new page to perform its own "entrance" animation 
      // while the overlay fades out or uncovers.
      
      // For this specific request: 
      // "Quando o portal cobrir a tela (ou após ~600–900ms), navegar para /projetos."
      
      // Let's schedule the end of the transition shortly after navigation to allow smooth exit?
      // Actually, if we navigate, the Context Provider (if at App level) stays mounted.
      // We should tell the context "Okay, we are at the new page, now fade out/reveal".
      
      // For now, let's keep the overlay up for a bit longer?
      // Or simply unmount it?
      // If we navigate, the component might unmount if Provider is inside Routes (it shouldn't be).
      
      // Let's assume we want to "reset" the transition state manually after some time
      // or let the route change trigger it?
      
      // Simple timeout for now.
      setTimeout(() => {
        endTransition();
      }, 500); // 500ms after navigation
    }, 800);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
