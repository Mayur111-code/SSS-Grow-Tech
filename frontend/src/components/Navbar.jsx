import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, ChevronDown, Menu, X, Home, Briefcase, 
  FolderKanban, MessageSquare, Mail, Zap, Shield, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './ui/ReactBits';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync User from LocalStorage
  const syncUser = () => {
    try {
      const data = localStorage.getItem('user') || localStorage.getItem('userInfo');
      setUserInfo(data ? JSON.parse(data) : null);
    } catch (error) {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const userObj = userInfo?.user || userInfo;
  const displayName = userObj?.name || userObj?.displayName || userInfo?.email?.split('@')[0] || "User";
  const isAdmin = userObj?.role === 'admin';

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} />, color: 'text-blue-400' },
    { name: 'Services', path: '/services', icon: <Briefcase size={18} />, color: 'text-purple-400' },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={18} />, color: 'text-emerald-400' },
    { name: 'Blogs', path: '/blogs', icon: <MessageSquare size={18} />, color: 'text-amber-400' },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} />, color: 'text-rose-400' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#030712]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-1.5' 
          : 'bg-transparent backdrop-blur-xs py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Magnetic strength={0.2}>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-violet-500/60 transition-all duration-500 shadow-lg shadow-violet-500/20">
                <img src="/logo.jpg" alt="SSS Grow IT Logo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent uppercase">
                  SSS GROW IT
                </span>
                <span className="text-[9px] text-gray-400 font-bold tracking-[0.25em] uppercase">Grow With Technology</span>
              </div>
            </Link>
          </Magnetic>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Magnetic key={link.name} strength={0.15}>
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-violet-600/40 to-cyan-600/30 rounded-xl border border-violet-500/30 shadow-inner" />
                    )}
                    <span className={isActive ? link.color : 'text-current'}>{link.icon}</span>
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)} 
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} size={14} />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                      className="absolute right-0 mt-3 w-56 bg-gray-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-50"
                    >
                      <div className="px-3 py-3 mb-1 border-b border-white/5">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-white truncate mt-1">{displayName}</p>
                      </div>
                      
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 p-2.5 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all" onClick={() => setShowDropdown(false)}>
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}
                      
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Magnetic strength={0.25}>
                <Link to="/login" className="relative group overflow-hidden px-6 py-2 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 inline-block">
                  <span className="relative z-10 flex items-center gap-2 text-sm">
                    <TrendingUp size={14} /> Get Started
                  </span>
                </Link>
              </Magnetic>
            )}
            
            <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-[64px] bg-[#030712]/98 backdrop-blur-2xl z-[90] p-6 border-b border-white/10 shadow-2xl"
          >
            <div className="grid gap-3">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} 
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold border transition-all ${
                    location.pathname === link.path ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-gray-400 hover:text-white'
                  }`}>
                  <span className={location.pathname === link.path ? link.color : ''}>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;