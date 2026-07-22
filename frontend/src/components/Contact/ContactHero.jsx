import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Clock,
  Shield,
  Zap,
  Users,
  ArrowRight
} from 'lucide-react';
import { ShinyText, AntigravityBackground, Magnetic } from '../ui/ReactBits';

const ContactHero = () => {
  const floatingElements = [
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Quick Response",
      color: "from-emerald-500 to-teal-600",
      position: "top-10 right-5 lg:top-20 lg:right-10",
      delay: 0
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "24/7 Support",
      color: "from-blue-500 to-cyan-600",
      position: "bottom-20 left-5 lg:bottom-32 lg:left-10",
      delay: 1
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Secure Protocol",
      color: "from-violet-500 to-indigo-600",
      position: "top-1/3 left-5 lg:top-1/3 lg:left-20",
      delay: 0.5
    }
  ];

  return (
    <section className="page-hero page-hero-emerald relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-28 pb-16">
      
      {/* Background Particles */}
      <AntigravityBackground count={40} speed={0.4} particleColor="rgba(16, 185, 129, 0.4)" lineColor="rgba(6, 182, 212, 0.12)" />

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-black to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 w-full">
        
        {/* Left Side: Copywriting */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Ready for takeoff
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
            Turn your <ShinyText text="Ideas" speed={4} className="font-black" /> <br />
            into <span className="italic font-light text-gray-400">Impact.</span>
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Whether you have a fully-fledged concept or just a spark of an idea, we're here to engineer your next digital breakthrough.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Magnetic strength={0.15}>
              <div className="flex items-center gap-3 bg-white/5 p-3 px-5 rounded-2xl border border-white/10 group hover:border-emerald-500/40 transition-all cursor-default backdrop-blur-md">
                <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm font-semibold">Fast Execution</span>
              </div>
            </Magnetic>
            <Magnetic strength={0.15}>
              <div className="flex items-center gap-3 bg-white/5 p-3 px-5 rounded-2xl border border-white/10 group hover:border-emerald-500/40 transition-all cursor-default backdrop-blur-md">
                <Users className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm font-semibold">Expert Team</span>
              </div>
            </Magnetic>
          </div>
        </motion.div>

        {/* Right Side: Visual Elements */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[440px]"
          >
            {/* Image Container */}
            <div className="relative z-20 rounded-[3rem] overflow-hidden border border-white/15 bg-gray-900 group shadow-2xl">
              <img 
                src="/contact.jpg" 
                alt="Collaboration" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badges */}
            {floatingElements.map((el, i) => (
              <motion.div
                key={i}
                className={`absolute ${el.position} z-30 hidden sm:block`}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, delay: el.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-black/70 backdrop-blur-xl border border-white/15 p-3 px-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${el.color} text-white shadow-md`}>
                    {el.icon}
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wider">{el.text}</span>
                </div>
              </motion.div>
            ))}

            {/* Glowing Backdrop */}
            <div className="absolute -inset-10 bg-emerald-500/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

