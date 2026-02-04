import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { IMAGES } from '../constants';

const CaseStudy: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-black grid lg:grid-cols-2">
          
          {/* Image Side */}
          <div className="relative min-h-[400px]">
            <img 
              src={IMAGES.CASE_STUDY_MODEL} 
              alt="Blueprints and architecture model" 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          {/* Content Side */}
          <div className="p-12 lg:p-20 flex flex-col justify-center relative bg-[#1A1A1A]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
            
            <span className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Último Case</span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Torre Horizon: <br />Vida Vertical Sustentável</h2>
            <p className="text-gray-400 font-light mb-8 leading-relaxed">
              A Redstone Engenharia superou desafios geológicos significativos para entregar um complexo residencial certificado LEED Platinum em tempo recorde. Utilizando nossos sistemas de tensão pré-fabricados exclusivos.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl text-white font-medium">24 meses</p>
                <p className="text-xs text-gray-500 mt-1">Prazo</p>
              </div>
              <div>
                <p className="text-2xl text-white font-medium">$120M</p>
                <p className="text-xs text-gray-500 mt-1">Orçamento</p>
              </div>
              <div>
                <p className="text-2xl text-white font-medium">Zero</p>
                <p className="text-xs text-gray-500 mt-1">Acidentes</p>
              </div>
            </div>

            <Link to="/projetos" className="inline-flex items-center text-white font-medium hover:text-primary transition-colors">
              Ver projetos
              <span className="ml-2">
                 <Icon name="arrow_forward" className="text-sm" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudy;