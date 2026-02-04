import React from 'react';
import Icon from './Icon';
import { IMAGES } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
           <Icon name="format_quote" className="text-6xl text-gray-200 dark:text-gray-800" style={{ fontVariationSettings: "'FILL' 1" }} />
        </div>
        <h3 className="text-2xl md:text-4xl font-light text-gray-900 dark:text-white leading-snug mb-8">
          "A Redstone Engenharia trouxe um nível de <span className="text-primary font-normal">clareza e precisão</span> para nossa expansão industrial que não víamos há décadas. Eles não apenas seguem planos; eles os aprimoram."
        </h3>
        
        <div className="flex items-center justify-center gap-4">
          <img 
            src={IMAGES.TESTIMONIAL_AVATAR} 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800" 
          />
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Murillo Alvarez Alves</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CEO, Engenheiro Civil</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;