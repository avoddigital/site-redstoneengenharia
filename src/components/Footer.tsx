import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import logo from '../assets/logo.png';
import { FOOTER_LINKS } from '../constants';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer id="contact" className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Link to="/#home" className="flex items-center gap-2">
                <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
                <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
                  Redstone Engenharia<span className="text-primary font-bold">.</span>
                </span>
              </Link>
            </div>
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Vamos construir algo <br />extraordinário juntos.
            </h2>
            <div className="w-full max-w-[270px]">
              <button 
                onClick={onOpenModal}
                className="w-full bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                Entre em contato
                <span className="transition-transform group-hover:translate-x-1">
                  <Icon name="arrow_forward" />
                </span>
              </button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.SERVICES.map((item) => (
                <li key={item}>
                  <span className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-light cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.COMPANY.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-white/5">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            © 2026 Redstone Engenharia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/politica-de-privacidade" className="text-gray-400 hover:text-primary transition-colors text-sm font-light">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="text-gray-400 hover:text-primary transition-colors text-sm font-light">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;