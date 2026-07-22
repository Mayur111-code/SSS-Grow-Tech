import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Layers, PenTool, ExternalLink, Sparkles, Globe, Cpu, ArrowRight } from 'lucide-react';
import { ShinyText, AntigravityBackground, AnimatedCounter } from '../ui/ReactBits';

const FLOATING_DATA = [
  { icon: Layers, text: "Case Studies", color: "from-purple-500 to-pink-600", pos: "top-5 right-5 lg:top-10 lg:right-20", delay: 0 },
  { icon: PenTool, text: "UI/UX Design", color: "from-cyan-500 to-blue-600", pos: "bottom-20 left-5 lg:bottom-1/3 lg:left-10", delay: 1 },
  { icon: Globe, text: "Web Apps", color: "from-emerald-500 to-teal-600", pos: "top-1/4 left-10 lg:top-1/3 lg:left-20", delay: 0.5 },
  { icon: Cpu, text: "AI Projects", color: "from-amber-500 to-orange-600", pos: "bottom-10 right-10 lg:bottom-20 lg:right-25", delay: 1.5 }
];

const ProjectsHero = () => {
  return (
    <section className="page-hero page-hero-purple relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#030014] pt-24 pb-16">
      
      {/* Background Particles */}
      <AntigravityBackground count={45} speed={0.4} particleColor="rgba(168, 85, 247, 0.4)" lineColor="rgba(236, 72, 153, 0.12)" />

      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:bg-white/10 transition-colors cursor-default">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-purple-200 uppercase">Portfolio Showcase</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
            Future <br />
            <ShinyText text="Defined." speed={4} className="font-black" />
          </h1>

          <p className="text-lg text-gray-300 max-w-md leading-relaxed mb-8 font-medium">
            Turning complex ideas into seamless digital realities through precision engineering and artistic design.
          </p>

          <div className="flex flex-wrap gap-10">
            {[
              { val: '200+', lab: 'Projects Live' },
              { val: '99%', lab: 'Client Satisfaction' }
            ].map((s, i) => (
              <div key={i} className="p-3 px-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h3 className="text-3xl font-black text-white leading-none">
                  <AnimatedCounter to={s.val} />
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-purple-300 mt-2">{s.lab}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual Showcase */}
        <div className="relative group perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-20 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-2xl shadow-2xl"
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img 
                src="/project.jpg" 
                alt="Showcase" 
                className="w-full object-cover aspect-[4/3] opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Floating Elements */}
          {FLOATING_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              className={`absolute ${item.pos} z-30 hidden md:block`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0a0a0c]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-200">{item.text}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Background Glows */}
          <div className="absolute -inset-4 bg-purple-500/20 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-10 bg-gradient-to-b from-purple-400 to-transparent" 
        />
      </div>
    </section>
  );
};

export default ProjectsHero;

