import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Zap, Eye, Github, Globe, ExternalLink, Code2, Sparkles } from 'lucide-react';
import ProjectsHero from '../components/Projects/ProjectsHero';
import API from '../api/api';
import { SpotlightCard, ShinyText, Magnetic } from '../components/ui/ReactBits';

const ProjectCard = memo(({ project, index, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Glow Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-[2rem] blur opacity-0 group-hover:opacity-30 transition duration-500`} />
      
      <SpotlightCard className="relative h-full bg-[#0d0d12]/90 border border-white/10 group-hover:border-white/20 rounded-[1.8rem] overflow-hidden flex flex-col">
        {/* Image Container */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-black/70 backdrop-blur-md border border-white/15 text-white shadow-lg">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-6 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.techStack?.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-[10px] font-bold text-purple-300/90 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <Magnetic strength={0.2} className="w-full">
            <a
              href={project.projectLink || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 border border-white/15 hover:border-transparent text-white text-sm font-bold transition-all duration-300 group/btn shadow-lg"
            >
              View Project
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </a>
          </Magnetic>
        </div>
      </SpotlightCard>
    </motion.div>
  );
});

// --- 2. Main Projects Component ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        if (data.success) setProjects(data.data);
      } catch (error) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category))).filter(Boolean)];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getColorByCategory = (cat) => {
    const colors = {
      'Web': 'from-blue-500 to-indigo-600',
      'AI/ML': 'from-purple-500 to-fuchsia-600',
      'Design': 'from-orange-400 to-rose-500',
      'default': 'from-purple-600 to-cyan-500'
    };
    return colors[cat] || colors.default;
  };

  return (
    <div className="bg-[#030014] min-h-screen text-white font-sans selection:bg-purple-500/30">
      <ProjectsHero />

      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Category Filter Tabs */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-20">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-300 border ${
                    isActive 
                      ? 'text-white border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                      : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20 bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="category-tab" className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full -z-10" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          // Optimized Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[460px] rounded-[2rem] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="relative z-10">
            {filteredProjects.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project._id} 
                      project={project} 
                      index={index} 
                      colorClass={getColorByCategory(project.category)} 
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Eye className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold">No projects found</h3>
                <p className="text-gray-400 mt-2">Check back soon for new project updates.</p>
              </motion.div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;