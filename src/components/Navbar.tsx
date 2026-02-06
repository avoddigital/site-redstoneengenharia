import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import Button from './Button';
import logo from '../assets/logo.png';
import { NAV_LINKS } from '../constants';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  
  // Extract section IDs from NAV_LINKS for the spy
  // NAV_LINKS format: /#id. We need just the id string.
  const sectionIds = NAV_LINKS.map(link => link.href.split('#')[1]).filter(Boolean);
  
  // State to track if we are scrolling programmatically
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  
  // Pass paused=true when scrolling programmatically to prevent spy from overwriting
  const activeSection = useScrollSpy(sectionIds, 0, isProgrammaticScroll);
  
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync internal activeLink state with ScrollSpy result when on home
  useEffect(() => {
     if (isProgrammaticScroll) return; // Ignore spy updates during programmatic scroll

     if (location.pathname === '/') {
        // If we have an active section from spy, use it.
        // But map it back to the Link Name?
        // NAV_LINKS has name and href.
        // If activeSection is 'sobre', we find link with href '/#sobre'.
        if (activeSection) {
            const link = NAV_LINKS.find(l => l.href.endsWith(`#${activeSection}`));
            if (link) setActiveLink(link.name);
        } else if (window.scrollY < 100) {
            // Default to Home/Início if at top
            setActiveLink('Início');
        }
     } else {
        // If not on home, matching logic based on path
        const currentPath = location.pathname;
        const found = NAV_LINKS.find(l => l.href === currentPath);
        if (found) setActiveLink(found.name);
     }
  }, [activeSection, location.pathname, isProgrammaticScroll]);

  // Helper to handle smooth scroll to section
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
        // OPTIMISTIC UI: Update immediate on click
        // Find link name for the target ID to set active state
        const link = NAV_LINKS.find(l => l.href.endsWith(`#${targetId}`));
        if (link) setActiveLink(link.name);
        
        // Set programmatic scroll to pause spy
        setIsProgrammaticScroll(true);
        
        // Update URL
        // If we are already on home, we can use replaceState.
        // If we just arrived from another page, the hash is already in URL from navigate(), so replaceState confirms it.
        if (window.location.hash !== `#${targetId}`) {
             window.history.replaceState(null, "", `#${targetId}`);
        }
        
        // Smooth scroll with offset for sticky header
        const headerOffset = 85; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: shouldReduceMotion ? 'auto' : 'smooth'
        });
        
        // Re-enable spy after scroll
        setTimeout(() => {
            setIsProgrammaticScroll(false);
        }, 800);
    }
  };

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string, linkName: string) => {
      // Check if it's a hash link for the One Page (e.g. /#home)
      if (href.includes('/#')) {
          e.preventDefault();
          const targetId = href.split('#')[1];

          // If we are already on the home page (or base path)
          if (location.pathname === '/') {
              scrollToSection(targetId);
          } else {
              // We are on an internal page (e.g. /politica-de-privacidade)
              // We need to navigate to Home first
              setActiveLink(linkName); // Optimistic update
              
              // Navigate to the hash URL
              navigate(href);

              // Retry mechanism to scroll after navigation completes and DOM is ready
              let attempts = 0;
              const maxAttempts = 15;
              
              const tryScroll = () => {
                  const element = document.getElementById(targetId);
                  if (element) {
                      scrollToSection(targetId);
                  } else if (attempts < maxAttempts) {
                      attempts++;
                      setTimeout(tryScroll, 100); // Retry every 100ms
                  }
              };
              
              // Start trying to scroll
              setTimeout(tryScroll, 100);
          }
      }
  };

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
              <Link 
                to="/#home" 
                className="flex items-center gap-2"
                onClick={(e) => handleLinkClick(e, '/#home', 'Início')}
              >
                 <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
                 <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
                   Redstone Engenharia<span className="text-primary font-bold">.</span>
                 </span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-10">
              {NAV_LINKS.map((link) => {
                 const isActive = activeLink === link.name;
                 const isHash = link.href.includes('#');

                 // Use standard <a> if on same page hash link to avoid Router overhead?
                 // Or use Link from router.
                 // We intercept click anyway.
                 
                 return (
                    <Link 
                      key={link.name}
                      to={link.href}
                      className={`relative text-sm font-medium tracking-wide transition-colors uppercase py-1
                        ${isActive 
                           ? 'text-primary' 
                           : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:opacity-80'
                        }
                      `}
                      onClick={(e) => handleLinkClick(e, link.href, link.name)}
                    >
                      {link.name}
                      {isActive && !shouldReduceMotion && (
                        <motion.span 
                            layoutId="navbar-underline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
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