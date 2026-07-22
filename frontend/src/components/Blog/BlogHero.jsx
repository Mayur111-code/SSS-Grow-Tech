import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, PenTool, Sparkles, Zap, TrendingUp, Users, Clock, MessageSquare, Rocket, ChevronRight } from 'lucide-react';
import { ShinyText, AntigravityBackground, Magnetic } from '../ui/ReactBits';

const BlogHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const floatingElements = useMemo(() => [
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "Latest News",
      color: "from-orange-500 to-amber-600",
      position: "top-5 right-5 lg:top-10 lg:right-20",
      animation: { y: [0, -15, 0], x: [0, 10, 0] },
      delay: 0
    },
    {
      icon: <PenTool className="w-4 h-4" />,
      text: "Coding Tips",
      color: "from-yellow-500 to-orange-600",
      position: "bottom-20 left-5 lg:bottom-1/3 lg:left-10",
      animation: { y: [0, 15, 0], x: [0, -8, 0] },
      delay: 1
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "Tech Trends",
      color: "from-rose-500 to-pink-600",
      position: "top-1/4 left-10 lg:top-1/3 lg:left-20",
      animation: { y: [0, -12, 0], x: [0, 12, 0] },
      delay: 0.5
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "AI Insights",
      color: "from-cyan-500 to-blue-600",
      position: "bottom-10 right-10 lg:bottom-20 lg:right-25",
      animation: { y: [0, -18, 0], x: [0, -15, 0] },
      delay: 1.5
    }
  ], []);

  return (
    <section className="page-hero page-hero-orange relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 pt-24 pb-12">
      
      {/* Background Particles */}
      <AntigravityBackground count={40} speed={0.4} particleColor="rgba(249, 115, 22, 0.4)" lineColor="rgba(245, 158, 11, 0.12)" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 w-full">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-800 mb-8 group hover:border-orange-500/50 transition-all cursor-pointer">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Knowledge Hub</span>
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-8 text-white tracking-tight">
            Tech <ShinyText text="Insights" speed={4} className="font-black" />
            <br />
            <span className="text-gray-300">& Digital</span> Wisdom<span className="text-orange-500">.</span>
          </h1>

          <p className="text-xl text-gray-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
            Dive into cutting-edge tech trends, expert coding insights, and strategic growth perspectives from industry leaders.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
            <Magnetic strength={0.3}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl font-bold text-white overflow-hidden transition-all shadow-xl shadow-orange-500/20">
                <span className="relative z-10 flex items-center gap-2">
                  Start Reading <Rocket className="w-5 h-5" />
                </span>
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className="px-8 py-4 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl font-bold text-gray-200 hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg">
                Browse Categories <ChevronRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 border-t border-gray-800/80 pt-8">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-orange-500" />
              <span className="text-gray-300 font-semibold text-sm">10K+ Readers</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-gray-300 font-semibold text-sm">Weekly Updates</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visuals */}
        <div className="relative flex justify-center items-center h-[460px] lg:h-[540px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group w-full max-w-[480px]"
          >
            {/* Main Image Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-gray-800/80 shadow-2xl group-hover:border-orange-500/40 transition-all duration-500 aspect-square bg-gray-900 flex items-center justify-center">
              <img 
                src="/blog.jpg" 
                alt="Tech Blog"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Elements */}
            {!shouldReduceMotion && floatingElements.map((element, index) => (
              <motion.div
                key={index}
                className={`absolute ${element.position} z-30 hidden sm:flex`}
                animate={element.animation}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: element.delay }}
              >
                <div className="bg-gray-900/90 backdrop-blur-xl p-3 rounded-2xl border border-gray-800 shadow-2xl flex items-center gap-3 min-w-[140px]">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${element.color} text-white`}>
                    {element.icon}
                  </div>
                  <span className="font-bold text-white text-sm">{element.text}</span>
                </div>
              </motion.div>
            ))}

            {/* Trending Zap */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 z-40 bg-orange-600 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl"
            >
              <Zap className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-[10px] font-black uppercase tracking-tighter">Trending Now</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;

