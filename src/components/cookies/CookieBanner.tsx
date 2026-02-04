import React from 'react';
import { useCookieConsent } from '../../context/CookieConsentContext';

const CookieBanner: React.FC = () => {
  const { bannerOpen, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!bannerOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-[24px] p-6 w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-6">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-gray-900 font-semibold mb-2 text-base">Sua privacidade é importante</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
            Utilizamos cookies para aprimorar sua experiência de navegação, exibir anúncios personalizados e analisar nosso tráfego. 
            Ao clicar em <span className="font-semibold text-gray-700">"Aceitar todos"</span>, você concorda com nosso uso de cookies.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[300px]">
          <button 
            onClick={acceptAll}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            Aceitar todos
          </button>
          
          <button 
            onClick={rejectNonEssential}
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-all active:scale-95 whitespace-nowrap"
          >
            Rejeitar
          </button>

          <button 
            onClick={openPreferences}
            className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline-offset-4 hover:underline whitespace-nowrap"
          >
            Configurar
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookieBanner;
