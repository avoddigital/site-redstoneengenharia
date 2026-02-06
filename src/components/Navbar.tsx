import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import Button from './Button';
import logo from '../assets/logo.png';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple active link detection logic
  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    
    // Default active to home if at root
    if (currentPath === '/' && !currentHash) {
        setActiveLink('Início'); // Assuming 'Início' corresponds to '/' or '#home'
        return;
    }

    // Mapping logic ideally matches NAV_LINKS structure
    const foundLink = NAV_LINKS.find(link => {
       if (link.href === '/') return currentPath === '/' && !currentHash; // or #home
       if (link.href.startsWith('/#')) {
           return currentPath === '/' && currentHash === link.href.substring(1);
       }
       return currentPath === link.href;
    });

    if (foundLink) {
        setActiveLink(foundLink.name);
    } else {
        // Fallback for sub-routes or specific interactions
        if (currentPath === '/') setActiveLink('Início');
    }
  }, [location]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b
            ${scrolled 
                ? 'bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-sm border-neutral-200/60 dark:border-white/10' 
                : 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-transparent'
            }
        `}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 w-full max-w-[1200px] 2xl:max-w-[1400px]">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              {location.pathname === '/' ? (
                <a 
                  href="#home"
                  className="flex items-center gap-2"
                >
                  <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
                  <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
                    Redstone Engenharia<span className="text-primary font-bold">.</span>
                  </span>
                </a>
              ) : (
                <Link to="/#home" className="flex items-center gap-2">
                  <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
                  <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
                    Redstone Engenharia<span className="text-primary font-bold">.</span>
                  </span>
                </Link>
              )}
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-10">
              {NAV_LINKS.map((link) => {
                 const isHome = location.pathname === '/';
                 const href = isHome 
                    ? (link.href.startsWith('/#') ? link.href.substring(1) : (link.href === '/' ? '#' : link.href))
                    : link.href;
                 
                 const isActive = activeLink === link.name;

                 return (
                    <a 
                      key={link.name}
                      href={href}
                      className={`relative text-sm font-medium tracking-wide transition-colors uppercase py-1
                        ${isActive 
                           ? 'text-primary' 
                           : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:opacity-80'
                        }
                      `}
                      onClick={() => setActiveLink(link.name)}
                    >
                      {link.name}
                      {isActive && !shouldReduceMotion && (
                        <motion.span 
                            layoutId="navbar-underline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                 );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              
              <Button 
                onClick={onOpenModal}
                className="hidden sm:inline-flex text-sm"
                icon="arrow_forward"
              >
                Iniciar conversa
              </Button>

              {/* Mobile Menu Button (Simple implementation) */}
              <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                 <Icon name="menu" className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;