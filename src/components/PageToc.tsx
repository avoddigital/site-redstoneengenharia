import React from 'react';

interface Section {
  id: string;
  title: string;
}

interface PageTocProps {
  sections: Section[];
}

const PageToc: React.FC<PageTocProps> = ({ sections }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Nesta página</h3>
      <nav className="space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="block text-sm text-gray-600 hover:text-primary transition-colors text-left w-full"
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PageToc;
