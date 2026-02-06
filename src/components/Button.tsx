import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  variant?: 'primary' | 'outline' | 'ghost'; // For future extensibility, though current request focuses on primary
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  variant = 'primary', 
  fullWidth = false,
  className = "",
  ...props 
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none";
  const variants = {
    primary: "bg-primary text-white shadow-sm border border-transparent",
    outline: "bg-transparent text-white border border-white/30 backdrop-blur-sm hover:bg-white/10",
    ghost: "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full px-6 py-3' : 'px-6 py-2.5 sm:px-8 sm:py-3'} ${className}`}
      whileHover={shouldReduceMotion ? {} : { 
        y: -1, 
        backgroundColor: variant === 'primary' ? 'rgba(136, 27, 27, 0.9)' : undefined, // Primary 90%
        boxShadow: variant === 'primary' ? "0 10px 15px -3px rgba(136, 27, 27, 0.3), 0 4px 6px -2px rgba(136, 27, 27, 0.1)" : undefined
      }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1 }} // Fast tap response
      {...props as any} // Framer motion types compatibility
    >
      {children}
      {icon && (
        <motion.span 
          className="ml-2"
          variants={{
            hover: { x: shouldReduceMotion ? 0 : 3 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon name={icon} />
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;
