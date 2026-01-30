import React from 'react';
import Icon from './Icon';

const TrustedBy: React.FC = () => {
  return (
    <section className="py-12 border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-light tracking-widest text-gray-500 dark:text-gray-400 mb-8 uppercase">
          Confiado por líderes da indústria
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-xl font-bold font-display text-gray-800 dark:text-gray-200">
            <Icon name="diamond" /> ONYX
          </div>
          <div className="flex items-center gap-2 text-xl font-bold font-display text-gray-800 dark:text-gray-200">
            <Icon name="pentagon" /> APEX
          </div>
          <div className="flex items-center gap-2 text-xl font-bold font-display text-gray-800 dark:text-gray-200">
            <Icon name="all_inclusive" /> INFINITY
          </div>
          <div className="flex items-center gap-2 text-xl font-bold font-display text-gray-800 dark:text-gray-200">
            <Icon name="change_history" /> DELTA
          </div>
          <div className="flex items-center gap-2 text-xl font-bold font-display text-gray-800 dark:text-gray-200">
            <Icon name="circle" /> ORBIT
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;