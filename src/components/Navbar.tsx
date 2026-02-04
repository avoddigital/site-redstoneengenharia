import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from './Icon';
import logo from '../assets/logo.png';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // ... existing scroll logic ...
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${scrolled ? 'bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-sm border-gray-200 dark:border-white/10' : 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-gray-100 dark:border-white/5'}`}>
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
                 // If we are on home:
                 // 1. If link is an anchor (has #), remove the leading slash (/#anchor -> #anchor)
                 // 2. If link is exactly '/', change to '#' to avoid reload and scroll to top
                 const href = isHome 
                    ? (link.href.startsWith('/#') ? link.href.substring(1) : (link.href === '/' ? '#' : link.href))
                    : link.href;

                 return (
                    <a 
                      key={link.name}
                      href={href}
                      className="text-sm font-light tracking-wide text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors uppercase"
                    >
                      {link.name}
                    </a>
                 );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">

              
              <button 
                onClick={onOpenModal}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none transition-all duration-300 hover:scale-105"
              >
                Iniciar conversa
                <span className="ml-2">
                  <Icon name="arrow_forward" className="text-base" />
                </span>
              </button>

              {/* Mobile Menu Button (Simple implementation) */}
              <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                 <Icon name="menu" className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;