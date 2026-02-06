import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProposalModal from '../components/ProposalModal';

// Mock Data
const PROJECTS = [
  {
    id: 1,
    category: 'Residencial',
    imageSrc: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800', // Lake House
    title: 'Casa do Lago',
    location: 'São Paulo, SP'
  },
  {
    id: 2,
    category: 'Corporativo',
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    title: 'Sede Redstone',
    location: 'Barueri, SP'
  },
  {
    id: 3,
    category: 'Industrial',
    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    title: 'Galpão Logístico Alpha',
    location: 'Cajamar, SP'
  },
  {
    id: 4,
    category: 'Reformas',
    imageSrc: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    title: 'Apartamento Jardins',
    location: 'São Paulo, SP'
  },
  {
    id: 5,
    category: 'Residencial',
    imageSrc: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    title: 'Residência Morumbi',
    location: 'São Paulo, SP'
  },
   {
    id: 6,
    category: 'Corporativo',
    imageSrc: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    title: 'Escritório Paulista',
    location: 'São Paulo, SP'
  }
];

  // Constants
const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'residencial', label: 'Residencial' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'reformas', label: 'Reformas' }
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Robust Filtering Logic
  const filteredProjects = useMemo(() => {
    // Immutable copy strategy not strictly needed for filter but good practice if sorting
    const projects = [...PROJECTS]; 

    if (activeCategory === 'todos') {
        return projects;
    }

    return projects.filter(project => {
        // Safe case-insensitive comparison
        const normalizedProjectCategory = project.category.trim().toLowerCase();
        return normalizedProjectCategory === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 flex flex-col font-sans">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <main className="flex-grow pt-32 pb-20 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 w-full max-w-[1200px] 2xl:max-w-[1400px]">
            {/* Header */}
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight text-gray-900 dark:text-white">
                    Portfólio de Projetos
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-light">
                    Onde a precisão de engenharia encontra a pureza do design minimalista.<br className="hidden md:block" />
                    Explore nossa seleção de obras.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6 mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
                {CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`text-sm md:text-base font-medium transition-all duration-300 relative pb-2
                            ${activeCategory === category.id 
                                ? 'text-primary' 
                                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                            }
                        `}
                    >
                        {category.label}
                        {activeCategory === category.id && (
                            <motion.span 
                                layoutId="activeCategory"
                                className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-primary rounded-full" 
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="min-h-[400px] relative">
                <AnimatePresence mode="wait">
                    {filteredProjects.length > 0 ? (
                        <motion.div 
                            key={activeCategory} // Keying by category triggers full re-mount for stagger
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { 
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.05
                                    }
                                },
                                exit: { 
                                    opacity: 0,
                                    transition: { duration: 0.2 } // Fast fade out
                                }
                            }}
                        >
                            {filteredProjects.map((project) => (
                                <motion.div 
                                    key={project.id} 
                                    layoutId={`project-${project.id}`} // Optional: keeps same items stable if we weren't unmounting, but with mode="wait" keying category usually unmounts all. 
                                    // However, for pure category switch, if we want cross-fade, mode="wait" is best.
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
                                        visible: { 
                                            opacity: 1, 
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                                        }
                                    }}
                                    className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl h-[400px] w-full"
                                >
                                    <img 
                                        src={project.imageSrc} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-white text-xl font-medium">{project.title}</h3>
                                        <p className="text-white/80 text-sm mt-1">{project.location}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400"
                        >
                            <p className="text-xl font-light">Nenhum projeto encontrado nesta categoria.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </main>

        <Footer onOpenModal={() => setIsModalOpen(true)} />
        <ProposalModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectsPage;
