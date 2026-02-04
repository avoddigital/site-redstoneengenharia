import React, { useEffect, useState } from 'react';
import { useCookieConsent, ConsentOptions } from '../../context/CookieConsentContext';
import Icon from '../Icon';
import Toggle from './Toggle';

const CookiePreferencesModal: React.FC = () => {
  const { preferencesOpen, closePreferences, consent, updateConsent, acceptAll } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<ConsentOptions>(consent);

  // Sync local state when modal opens
  useEffect(() => {
    if (preferencesOpen) {
      setLocalConsent(consent);
    }
  }, [preferencesOpen, consent]);

  if (!preferencesOpen) return null;

  const handleSave = () => {
    updateConsent(localConsent);
  };

  const handleToggle = (key: keyof ConsentOptions) => {
    setLocalConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div 
      className="fixed inset-0 z-[110] overflow-y-auto bg-black/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Preferências de Cookies</h2>
          <button 
            onClick={closePreferences}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Personalize sua experiência selecionando quais categorias de cookies você deseja permitir. 
            Alguns cookies são essenciais para o funcionamento do site.
          </p>

          <div className="space-y-4">
            {/* Necessary */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <Toggle 
                label="Essenciais (Necessários)" 
                checked={true} 
                onChange={() => {}} 
                disabled 
              />
              <p className="text-xs text-gray-400 mt-1">
                Necessários para o site funcionar corretamente. Não podem ser desativados.
              </p>
            </div>

            {/* Analytics */}
            <div className="space-y-1">
              <Toggle 
                label="Analíticos (Estatísticas)" 
                checked={localConsent.analytics} 
                onChange={() => handleToggle('analytics')} 
              />
              <p className="text-xs text-gray-400">
                Ajudam-nos a entender como os visitantes interagem com o site, coletando informações anonimamente.
              </p>
            </div>

            {/* Marketing */}
            <div className="space-y-1">
              <Toggle 
                label="Marketing" 
                checked={localConsent.marketing} 
                onChange={() => handleToggle('marketing')} 
              />
              <p className="text-xs text-gray-400">
                Usados para exibir anúncios relevantes para você em outros sites.
              </p>
            </div>

            {/* Preferences */}
            <div className="space-y-1">
              <Toggle 
                label="Preferências" 
                checked={localConsent.preferences} 
                onChange={() => handleToggle('preferences')} 
              />
              <p className="text-xs text-gray-400">
                Permitem que o site lembre de suas escolhas (como nome de usuário ou idioma).
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end items-center">
          <button 
             onClick={acceptAll}
             className="w-full sm:w-auto text-sm font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline order-2 sm:order-1"
          >
            Aceitar todos
          </button>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-md active:scale-95 order-1 sm:order-2"
          >
            Salvar preferências
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookiePreferencesModal;
