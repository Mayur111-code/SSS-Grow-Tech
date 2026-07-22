import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, Mail, Shield, Users, Globe, Lock, CheckCircle, PhoneCall } from 'lucide-react';
import ContactHero from '../components/Contact/ContactHero';
import API from '../api/api';
import { SpotlightCard, ShinyText, Magnetic } from '../components/ui/ReactBits';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '', category: 'general' });

  const categories = useMemo(() => [
    { value: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
    { value: 'project', label: 'Project', icon: <Shield className="w-4 h-4" /> },
    { value: 'support', label: 'Support', icon: <Users className="w-4 h-4" /> },
    { value: 'partnership', label: 'Partner', icon: <Mail className="w-4 h-4" /> },
  ], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');

    setLoading(true);
    try {
      const { data } = await API.post('/inquiries', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (data.success) {
        setSuccess(true);
        setFormData({ subject: '', message: '', category: 'general' });
        toast.success("Message Sent Successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#030712] text-white min-h-screen font-sans selection:bg-emerald-500/30">
      <ContactHero />

      <main className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Let's build <ShinyText text="Future." speed={4} className="font-black" />
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed font-medium">
            Have an ambitious idea? We have the engineering power and design precision to bring it to life.
          </p>
          
          <div className="space-y-4 pt-4">
            {[
              { icon: <MapPin className="w-5 h-5 text-emerald-400" />, label: "LOCATION", text: "Pune, Maharashtra, India" },
              { icon: <Mail className="w-5 h-5 text-cyan-400" />, label: "EMAIL US", text: "itserviceswebcraft@gmail.com" },
              { icon: <PhoneCall className="w-5 h-5 text-violet-400" />, label: "WHATSAPP / CALL", text: "+91 Support Team" }
            ].map((item, i) => (
              <SpotlightCard key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                  <span className="font-bold text-white text-sm">{item.text}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <div className="relative group">
          <AnimatePresence>
            {!user && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 backdrop-blur-md bg-[#030712]/60 flex items-center justify-center rounded-[2.5rem] border border-white/10 p-6 text-center shadow-2xl"
              >
                <div className="max-w-xs space-y-4">
                  <Lock className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm text-gray-300 font-medium">Please sign in to send a direct message to our engineering team.</p>
                  <Magnetic strength={0.3}>
                    <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform w-full">
                      Unlock Form
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <SpotlightCard className={`p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-gray-900/40 backdrop-blur-2xl shadow-2xl transition-all ${!user ? 'blur-xs opacity-50 pointer-events-none' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Inquiry Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(cat => (
                    <button 
                      key={cat.value} type="button" 
                      onClick={() => setFormData(p => ({ ...p, category: cat.value }))}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${formData.category === cat.value ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-emerald-400 shadow-md' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
                    >
                      {cat.icon}
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Subject</label>
                <input 
                  name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="e.g. Next.js Web Application Inquiry" required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Describe your goals, tech requirements, or project vision..." rows="5" required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-400 outline-none transition-all resize-none"
                />
              </div>

              <Magnetic strength={0.3} className="w-full">
                <button 
                  type="submit" disabled={loading || !user}
                  className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 disabled:opacity-50 text-black font-black py-4 rounded-xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending Message..." : "Send Message"}
                </button>
              </Magnetic>
            </form>
          </SpotlightCard>
        </div>
      </main>
    </div>
  );
};

export default Contact;