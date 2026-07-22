import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { Sparkles, Zap, Code, Globe, ArrowRight, TrendingUp, Rocket } from 'lucide-react';
import { useRef } from 'react';
import { SpotlightCard, AnimatedCounter, ShinyText, Magnetic } from '../components/ui/ReactBits';

const ServiceCard = ({ service, index, scrollProgress, variants }) => {
  const depth = useTransform(scrollProgress, [0, 0.3, 0.65, 1], [index === 1 ? -10 : 20, 0, -16, index === 1 ? 12 : -8]);
  const rotateX = useTransform(scrollProgress, [0, 0.35, 0.7, 1], [index === 1 ? 8 : -5, 0, index === 1 ? -5 : 7, 0]);
  const rotateY = useTransform(scrollProgress, [0, 0.5, 1], [index === 0 ? 7 : index === 2 ? -7 : 0, 0, index === 0 ? -5 : index === 2 ? 5 : 0]);
  const y = useTransform(scrollProgress, [0, 0.5, 1], [index * 16, 0, index === 1 ? -10 : 14]);
  const smoothDepth = useSpring(depth, { stiffness: 80, damping: 22, mass: 0.6 });
  const smoothRotateX = useSpring(rotateX, { stiffness: 80, damping: 22, mass: 0.6 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 80, damping: 22, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 22, mass: 0.6 });

  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -16, rotateX: 6, rotateY: index === 0 ? 3 : index === 2 ? -3 : 0, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative group"
      style={{
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        z: smoothDepth,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className={`absolute -inset-px bg-gradient-to-br ${service.color} rounded-3xl opacity-0 group-hover:opacity-25 blur-xl transition-all duration-500`} />
      <SpotlightCard className="relative h-full p-8 rounded-3xl bg-gray-900/50 border border-white/10 group-hover:border-white/20 backdrop-blur-xl transition-all duration-500 overflow-hidden">
        <span className="absolute -bottom-2 -right-2 text-[7rem] font-black text-white/[0.03] select-none leading-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-7 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
          style={{ boxShadow: `0 8px 30px ${service.glow}`, transform: 'translateZ(34px)' }}
        >
          <span className="text-white">{service.icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white" style={{ transform: 'translateZ(24px)' }}>{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-7">{service.desc}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all duration-300"
          style={{ color: service.color.includes('violet') ? '#a78bfa' : service.color.includes('cyan') ? '#67e8f9' : '#f0abfc' }}
        >
          Explore Service <ArrowRight size={16} />
        </Link>
      </SpotlightCard>
    </motion.div>
  );
};

// Reusable animated counter with ReactBits
const AnimatedStat = ({ value, label, icon }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="text-center group cursor-default p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300"
  >
    <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-500">
      <AnimatedCounter to={value} />
    </div>
    <div className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  </motion.div>
);

const Home = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const services = [
    {
      title: 'Web Development',
      desc: 'Modern, blazing-fast websites built with cutting-edge stacks that convert visitors into clients.',
      icon: <Code size={26} />,
      color: 'from-violet-500 to-indigo-600',
      glow: 'rgba(139,92,246,0.3)',
    },
    {
      title: 'App Design',
      desc: 'Intuitive UI/UX that wow users from first click — designed to engage, retain, and convert.',
      icon: <Zap size={26} />,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.3)',
    },
    {
      title: 'AI Integration',
      desc: 'Smart automation and machine learning solutions that give your business a real competitive edge.',
      icon: <Sparkles size={26} />,
      color: 'from-fuchsia-500 to-pink-600',
      glow: 'rgba(217,70,239,0.3)',
    },
  ];

  const stats = [
    { value: '200+', label: 'Projects', icon: '🚀' },
    { value: '100+', label: 'Clients', icon: '🌟' },
    { value: '99%', label: 'Success Rate', icon: '✨' },
    { value: '24/7', label: 'Support', icon: '⚡' },
  ];

  const steps = [
    { s: '01', t: 'Discovery', d: 'Deep dive into your goals, audience, and competitive landscape.', color: 'from-violet-500 to-indigo-600' },
    { s: '02', t: 'Design & Build', d: 'Agile development with real-time collaboration and sprints.', color: 'from-cyan-500 to-blue-600' },
    { s: '03', t: 'Launch & Grow', d: 'Quality assurance, deployment, and continuous optimization.', color: 'from-fuchsia-500 to-pink-600' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }),
  };

  return (
    <div className="bg-[#030712] text-white overflow-x-hidden">
      {!reduceMotion && (
        <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 mix-blend-screen md:flex">
          <span className="[writing-mode:vertical-rl] text-[9px] font-bold uppercase tracking-[0.35em] text-white/35">Scroll to explore</span>
          <div className="relative h-28 w-px overflow-hidden bg-white/10">
            <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400" style={{ scaleY: pageProgress, height: '100%' }} />
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Teaser - 3D Cards */}
      <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <TrendingUp size={14} className="text-violet-400" />
              <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tighter">
              Our{' '}
              <ShinyText text="Expertise" speed={4} className="font-black" />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
              Future-ready digital solutions built with precision, passion, and cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3" style={{ perspective: '1400px' }}>
            {services.map((service, i) => <ServiceCard key={i} service={service} index={i} scrollProgress={scrollYProgress} variants={cardVariants} />)}
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden bg-gradient-to-b from-transparent via-violet-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process Flow - 3D Timeline */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              How We Make It{' '}
              <ShinyText text="Happen" speed={4} className="font-black" />
            </h2>
            <p className="text-gray-400 text-lg">A proven 3-step process to turn your vision into reality.</p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 10, scale: 1.01 }}
                className="flex items-center gap-8 p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md group cursor-default transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.06] shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`w-14 h-14 min-w-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <span className="text-white font-black text-sm">{step.s}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    {step.t}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.d}</p>
                </div>
                <ArrowRight className="text-gray-600 group-hover:text-violet-400 transition-colors duration-300 min-w-5" size={22} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="relative rounded-[3rem] overflow-hidden p-0.5 bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-cyan-500/40 shadow-2xl">
            <div className="relative bg-gradient-to-br from-violet-950/90 via-[#0f0620]/95 to-cyan-950/80 backdrop-blur-2xl p-12 md:p-20 text-center rounded-[2.9rem]">
              {/* Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/60 pointer-events-none"
                  style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
                  animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Rocket size={38} className="text-violet-400 opacity-90" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Ready to{' '}
                <ShinyText text="Grow?" speed={3} className="font-black" />
              </h2>
              <p className="text-violet-100/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                Let's build something extraordinary together. Your vision, our technology — unlimited growth.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Magnetic strength={0.3}>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(255,255,255,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      className="px-10 py-4 bg-white text-violet-950 rounded-2xl font-black hover:bg-violet-50 transition-all shadow-2xl"
                    >
                      Start Your Project
                    </motion.button>
                  </Link>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link to="/projects">
                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(139,92,246,0.3)' }}
                      whileTap={{ scale: 0.97 }}
                      className="px-10 py-4 bg-violet-500/20 text-white rounded-2xl font-black border border-violet-400/30 transition-all backdrop-blur-md shadow-lg"
                    >
                      View Our Work
                    </motion.button>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

