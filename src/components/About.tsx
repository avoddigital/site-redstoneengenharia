import React from 'react';
import Icon from './Icon';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              Construímos as <span className="text-primary italic font-normal">estruturas</span> que definem o horizonte.
            </h2>
            <div className="mt-8 flex gap-4">
              <div className="h-[1px] w-20 bg-primary mt-3"></div>
              <p className="text-gray-600 dark:text-gray-400 font-light text-lg leading-relaxed max-w-md">
                De complexas instalações industriais a torres residenciais, a Redstone Engenharia traz uma mistura única de maestria técnica e visão estética. Nós não apenas construímos; criamos legados duradouros.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-colors group">
              <div className="mb-4">
                 <Icon name="engineering" className="text-4xl text-primary group-hover:scale-110 transition-transform inline-block" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Anos de experiência</p>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-colors group">
              <div className="mb-4">
                 <Icon name="domain" className="text-4xl text-primary group-hover:scale-110 transition-transform inline-block" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Projetos entregues</p>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-colors group col-span-2">
              <div className="flex items-center justify-between mb-4">
                 <Icon name="safety_check" className="text-4xl text-primary group-hover:scale-110 transition-transform" />
                 {/* <Icon name="arrow_forward" className="text-gray-300 dark:text-gray-600" /> - Voltar quando tiver algo para adicionar*/}
              </div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Protocolo de Segurança</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nossa estrutura de segurança garante execução com zero incidentes em todos os megaprojestos.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;