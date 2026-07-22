import { motion } from 'framer-motion';
import { Code, Cpu, Zap, Database, Sparkles } from 'lucide-react';
import { ShinyText, AntigravityBackground, Magnetic } from '../ui/ReactBits';

const ServiceHero = () => {
  const floatingCards = [
    {
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      title: "Clean Code",
      subtitle: "Development",
      color: "from-cyan-500/20 to-blue-600/20",
      position: "top-10 -right-4 lg:right-10",
      delay: 0
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: "AI Powered",
      subtitle: "Automation",
      color: "from-purple-500/20 to-pink-600/20",
      position: "top-1/4 -left-4 lg:left-0",
      delay: 1
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      title: "Big Data",
      subtitle: "Analytics",
      color: "from-emerald-500/20 to-teal-600/20",
      position: "bottom-20 -left-6 lg:left-5",
      delay: 2
    }
  ];

  return (
    <section className="page-hero page-hero-cyan relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#020617] pt-24 pb-16">
      
      {/* Background Particles */}
      <AntigravityBackground count={40} speed={0.4} particleColor="rgba(6, 182, 212, 0.35)" lineColor="rgba(168, 85, 247, 0.1)" />

      {/*  Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(2,6,23,1))]" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, white, transparent 80%)'
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-cyan-400" /> Digital Excellence
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
            Our <ShinyText text="Digital Expertise." speed={4} className="font-black" />
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
            We deliver high-performance software and AI-driven solutions that transform your business DNA for the digital age.
          </p>

          <div className="flex flex-wrap gap-3">
            {['React', 'Node.js', 'AI/ML', 'Cloud', 'Enterprise'].map((tech) => (
              <Magnetic key={tech} strength={0.15}>
                <span className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold backdrop-blur-md hover:bg-white/10 transition-colors">
                  {tech}
                </span>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Right: Interactive Visuals */}
        <div className="relative">
          {/* Main Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 bg-gray-900/40 backdrop-blur-md shadow-2xl"
          >
            <img src="services.jpg" alt="Services" className="w-full h-auto mix-blend-lighten scale-105" />
          </motion.div>

          {/* Floating Cards Component */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`absolute ${card.position} z-20 hidden md:block`}
            >
              <div className="animate-float" style={{ animationDelay: `${card.delay}s` }}>
                <div className="bg-gray-900/90 backdrop-blur-2xl p-4 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-4 min-w-[180px]">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.subtitle}</p>
                    <p className="text-white font-bold text-sm">{card.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🖱️ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold">Explore</span>
      </div>
    </section>
  );
};

export default ServiceHero;

