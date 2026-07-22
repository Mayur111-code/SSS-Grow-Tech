import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Globe, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { AntigravityBackground, ShinyText, Magnetic } from '../ui/ReactBits';

// 3D Tilt Hook
const useTilt = () => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: -dy * 8, y: dx * 8 });
    };
    const handleLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return { ref, tilt };
};

const Hero = () => {
  const containerRef = useRef(null);
  const { ref: tiltRef, tilt } = useTilt();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const springTiltX = useSpring(tilt.x, { stiffness: 150, damping: 20 });
  const springTiltY = useSpring(tilt.y, { stiffness: 150, damping: 20 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      ref={containerRef}
      className="hero-scene relative min-h-[92vh] flex items-center overflow-hidden bg-[#030712] pt-24 pb-16"
      style={{ perspective: '1200px' }}
    >
      {/* Antigravity Interactive Particle Canvas */}
      <AntigravityBackground count={50} speed={0.5} particleColor="rgba(168, 85, 247, 0.35)" lineColor="rgba(56, 189, 248, 0.12)" />

      {/* Large Ambient Gradient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Dynamic Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full"
      >
        {/* Left Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-500/30 px-5 py-2.5 rounded-full text-violet-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-violet-500/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={14} className="text-violet-400" />
            </motion.div>
            India's Premier Growth Agency
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black text-white leading-[0.96] tracking-tighter"
          >
            We Power{' '}
            <br />
            <ShinyText text="Digital Growth." speed={4} className="font-black" />
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300/90 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            SSS Grow IT delivers high-impact web applications, intelligent AI solutions, and scalable
            digital ecosystems that help businesses thrive in the modern era.
          </motion.p>

          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {[
              { icon: <Star size={12} className="fill-amber-400 text-amber-400" />, text: '5.0 Rated Agency' },
              { icon: <ShieldCheck size={12} className="text-emerald-400" />, text: 'Enterprise Security' },
              { icon: <TrendingUp size={12} className="text-cyan-400" />, text: '200+ Projects' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-200 font-semibold backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                {badge.icon} {badge.text}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2"
          >
            <Magnetic strength={0.3}>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 45px rgba(139,92,246,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-violet-600/30"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Growth
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: 'rgba(139,92,246,0.6)', backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/5 text-white border border-white/15 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-md shadow-lg"
                >
                  View Our Work
                </motion.button>
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Visuals */}
        <motion.div
          ref={tiltRef}
          style={{
            rotateX: springTiltX,
            rotateY: springTiltY,
            transformStyle: 'preserve-3d',
          }}
          className="hero-visual relative cursor-pointer flex justify-center items-center"
        >
          {/* Main Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-art-shell relative z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/30 to-cyan-500/30 blur-2xl scale-105" />
            
            <img
              src="/home.jpg"
              alt="SSS Grow IT - Digital Growth"
              className="hero-art w-full max-w-[500px] mx-auto rounded-[2rem]"
              style={{ animation: 'float3d 8s ease-in-out infinite' }}
            />

            {/* Spinning Ring Decoration */}
            <div className="absolute -inset-4 rounded-[2.5rem] border border-violet-500/30 opacity-60 pointer-events-none"
              style={{ animation: 'borderSpin 20s linear infinite' }}
            />
          </motion.div>

          {/* 3D Floating Cards */}
          <FloatingCard
            icon={<ShieldCheck className="text-emerald-400" size={20} />}
            label="STATUS"
            title="Enterprise Secure"
            pos="top-2 -right-6"
            delay={0}
            color="from-emerald-500/20 to-teal-500/20"
            depth="translateZ(40px)"
          />
          <FloatingCard
            icon={<Zap className="text-amber-400" size={20} />}
            label="PERFORMANCE"
            title="Lightning Fast"
            pos="bottom-16 -left-6"
            delay={1.5}
            color="from-amber-500/20 to-orange-500/20"
            depth="translateZ(30px)"
          />
          <FloatingCard
            icon={<Cpu className="text-violet-400" size={20} />}
            label="TECHNOLOGY"
            title="AI Powered"
            pos="top-1/3 -left-10"
            delay={0.8}
            color="from-violet-500/20 to-indigo-500/20"
            depth="translateZ(50px)"
          />
          <FloatingCard
            icon={<Globe className="text-cyan-400" size={20} />}
            label="REACH"
            title="Global Scale"
            pos="bottom-4 right-2"
            delay={2.2}
            color="from-cyan-500/20 to-blue-500/20"
            depth="translateZ(35px)"
          />

          {/* Live Counter Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6, type: 'spring' }}
            className="absolute top-1/2 -right-4 hidden lg:flex items-center gap-2 bg-gradient-to-r from-violet-600/80 to-cyan-600/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-violet-400/30 shadow-2xl z-30"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">200+ Projects Live</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 border-2 border-gray-600 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// 3D Floating Card Component
const FloatingCard = ({ icon, label, title, pos, delay, color, depth }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 1 + delay * 0.15, duration: 0.6, type: 'spring' }}
    whileHover={{ scale: 1.08, z: 20 }}
    className={`hero-float-card absolute ${pos} hidden md:block backdrop-blur-2xl p-4 rounded-2xl border border-white/10 z-20 shadow-2xl`}
    style={{
      background: `linear-gradient(135deg, rgba(10,15,30,0.9), rgba(15,20,40,0.8))`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      animation: `float ${4 + delay}s ease-in-out infinite`,
      animationDelay: `${delay * 0.5}s`,
      transform: depth,
    }}
  >
    <div className="flex items-center gap-3">
      <div className={`bg-gradient-to-br ${color} p-2.5 rounded-xl border border-white/10 backdrop-blur-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-white leading-none">{title}</p>
      </div>
    </div>
  </motion.div>
);

export default Hero;

