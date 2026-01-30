import React from 'react';
import Icon from './Icon';
import logo from '../assets/logo.png';
import { FOOTER_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Redstone Engenharia" className="h-10 w-auto" />
              <span className="font-display font-light text-2xl tracking-tight text-gray-900 dark:text-white">
                Redstone Engenharia<span className="text-primary font-bold">.</span>
              </span>
            </div>
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Vamos construir algo <br />extraordinário juntos.
            </h2>
            <form className="flex flex-col gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="w-full bg-surface-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-6 py-3 text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
                <button type="submit" className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary/90 transition-colors flex-shrink-0">
                  <Icon name="arrow_forward" />
                </button>
              </div>
            </form>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.SERVICES.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-light">
                    {item}
                  </a>
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
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-light">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-light">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;