import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

// Container animation settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // Ek-ek flag thodya gap ne yeil
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const GlobalPresence = () => {
  const locations = [
    { country: 'India', code: 'in', desc: 'Main Tech Hub' },
    { country: 'USA', code: 'us', desc: 'Strategy Office' },
    { country: 'UK', code: 'gb', desc: 'Design Studio' },
    { country: 'Singapore', code: 'sg', desc: 'Business Ops' },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-24 px-6 border-t border-gray-900/50 bg-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-8">
          <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">Global Presence</span>
        </motion.div>
        
        <motion.h3 variants={itemVariants} className="text-4xl font-black text-white mb-4">
          Serving Clients <span className="text-emerald-400">Worldwide</span>
        </motion.h3>
        <motion.p variants={itemVariants} className="text-gray-500 max-w-xl mx-auto mb-16">
          Scaling businesses across borders with high-performance digital solutions.
        </motion.p>
        
        {/* Flags Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <motion.div
              key={loc.country}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 bg-gray-900/20 backdrop-blur-sm rounded-[2.5rem] border border-gray-800/50 hover:border-emerald-500/30 transition-all cursor-default"
            >
              <div className="relative w-16 h-12 mx-auto mb-6 overflow-hidden rounded-lg shadow-xl shadow-black/40">
                <img
                  src={`https://flagcdn.com/w160/${loc.code}.png`}
                  alt={loc.country}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-white font-bold text-xl mb-1">{loc.country}</div>
              <div className="text-emerald-500/60 text-xs font-medium uppercase tracking-wider">{loc.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GlobalPresence;