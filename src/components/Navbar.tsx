import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import logo from '../assets/logo.png';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${scrolled ? 'bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-sm border-gray-200 dark:border-white/10' : 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-gray-100 dark:border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
            <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
              Redstone Engenharia<span className="text-primary font-bold">.</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-light tracking-wide text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center bg-gray-100 dark:bg-white/10 rounded-full p-1 relative">
              <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-surface-dark shadow-sm text-gray-900 dark:text-white transition-all">
                Para Empresas (B2B)
              </button>
              <button className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                Para Você (B2C)
              </button>
            </div>
            
            <a 
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none transition-all duration-300 hover:scale-105"
            >
              Iniciar conversa
              <span className="ml-2">
                <Icon name="arrow_forward" className="text-base" />
              </span>
            </a>

            {/* Mobile Menu Button (Simple implementation) */}
            <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
               <Icon name="menu" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;