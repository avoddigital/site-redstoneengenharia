import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import logo from '../assets/logo.png';

interface ProposalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ open, onClose, onSubmit }) => {
  const [audience, setAudience] = useState<'empresa' | 'pessoa'>('empresa');
  const [serviceType, setServiceType] = useState('Projeto');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
      // Focus on name input when modal opens with a slight delay for animation
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ ...formData, serviceType, audience });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Phone Mask Logic
      let numbers = value.replace(/\D/g, '');
      
      // Limit to 11 digits (DDD + 9 digits)
      if (numbers.length > 11) numbers = numbers.slice(0, 11);

      let formattedValue = numbers;
      
      if (numbers.length > 10) {
        formattedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      } else if (numbers.length > 6) {
        formattedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
      } else if (numbers.length > 2) {
        formattedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      }

      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const services = ['Projeto', 'Execução', 'Gerenciamento', 'Consultoria', 'Outro'];

  const isEmpresa = audience === 'empresa';

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto bg-white/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-full items-center justify-center p-4">
      <div 
        className="relative w-full max-w-full md:max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo Watermark */}
        <div className="absolute top-10 right-10 pointer-events-none opacity-[0.05] grayscale">
          <img src={logo} alt="" className="w-32 h-auto" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-50 text-gray-400 hover:text-gray-600"
        >
          <Icon name="close" className="text-2xl" />
        </button>

        <div className="p-6 md:p-10">
          {/* Audience Toggle */}
          <div className="flex justify-center mb-5 relative z-10">
             <div className="inline-flex items-center bg-gray-100 rounded-full p-1 relative">
                <button 
                  onClick={() => setAudience('empresa')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isEmpresa 
                      ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Para Empresas
                </button>
                <button 
                  onClick={() => setAudience('pessoa')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    !isEmpresa
                      ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Para Você
                </button>
              </div>
          </div>

          {/* Header */}
          <div className="mb-6 relative z-10 text-center md:text-left">
            <h3 className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-1">
              {isEmpresa ? 'ÁREA CORPORATIVA' : 'ÁREA PESSOAL'}
            </h3>
            <h2 className="text-2xl md:text-4xl font-light text-gray-900 tracking-tight mb-2 leading-tight">
              {isEmpresa ? 'Formulário para empresas' : 'Solicitar orçamento'}
            </h2>
            <p className="text-gray-500 font-light text-sm max-w-md mx-auto md:mx-0">
              {isEmpresa 
                ? 'Preencha os dados abaixo para conectar sua empresa à nossa engenharia de precisão.'
                : 'Preencha os dados abaixo para iniciarmos o seu projeto com excelência e precisão.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Name */}
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  ref={nameInputRef}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block py-2 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-200 group-hover:border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="name" 
                  className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nome do responsável
                </label>
              </div>

               {/* Company - Only for B2B */}
               {isEmpresa && (
                 <div className="relative group">
                  <input 
                    type="text" 
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-200 group-hover:border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                    placeholder=" "
                    required={isEmpresa}
                  />
                  <label 
                    htmlFor="company" 
                    className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Empresa
                  </label>
                </div>
               )}

              {/* Email */}
              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-200 group-hover:border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="email" 
                  className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {isEmpresa ? 'E-mail corporativo' : 'Seu e-mail'}
                </label>
              </div>

              {/* Phone */}
              <div className="relative group">
                <input 
                  type="tel" 
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-200 group-hover:border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                  required
                  maxLength={15}
                />
                <label 
                  htmlFor="phone" 
                  className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Telefone / WhatsApp
                </label>
              </div>

              {/* City */}
              <div className={`relative group ${isEmpresa ? 'md:col-span-2' : ''}`}>
                <input 
                  type="text" 
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-200 group-hover:border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                />
                <label 
                  htmlFor="city" 
                  className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Cidade / Estado
                </label>
              </div>
            </div>

            {/* Service Type */}
            <div className="pt-0">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                TIPO DE SERVIÇO
              </label>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <label 
                    key={service} 
                    className={`
                      relative cursor-pointer px-4 py-2 rounded-full border text-xs transition-all duration-300
                      ${serviceType === service 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-transparent border-gray-100 text-gray-500 hover:border-gray-200 font-light'
                      }
                    `}
                  >
                    <input 
                      type="radio" 
                      name="serviceType" 
                      value={service}
                      checked={serviceType === service}
                      onChange={() => setServiceType(service)}
                      className="sr-only"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="relative group md:col-span-2 space-y-2">
              <label 
                htmlFor="message" 
                className="text-xs font-bold text-gray-500 uppercase tracking-wider block"
              >
                MENSAGEM
              </label>
              <textarea 
                name="message"
                id="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                className="block w-full text-base text-gray-900 bg-gray-50 border-none rounded-2xl appearance-none focus:outline-none focus:ring-0 placeholder-gray-400 resize-none p-3"
                placeholder="Descreva brevemente sua necessidade..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                {isEmpresa ? 'Solicitar consultoria' : 'Solicitar Orçamento'}
                <span className="transition-transform group-hover:translate-x-1">
                  <Icon name="arrow_forward" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProposalModal;
