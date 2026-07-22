// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   Facebook, Twitter, Instagram, Linkedin, Mail, Phone, 
//   MapPin, Send, Sparkles, ArrowRight, Globe, Shield, 
//   Zap, Code, Users, BookOpen 
// } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const footerLinks = [
//     {
//       title: 'Platform',
//       links: [
//         { name: 'Home', path: '/' },
//         { name: 'Services', path: '/services' },
//         { name: 'Projects', path: '/projects' },
//         { name: 'Blogs', path: '/blogs' },
//       ]
//     },
//     {
//       title: 'Resources',
//       links: [
//         { name: 'Documentation', path: '/docs' },
//         { name: 'Case Studies', path: '/projects' },
//         { name: 'Help Center', path: '/help' },
//       ]
//     }
//   ];

//   const contactItems = [
//     { icon: <MapPin size={16} />, text: 'Pune, MH, India', color: 'text-emerald-400' },
//     { icon: <Mail size={16} />, text: 'webcarftservices@gmail.com', color: 'text-purple-400' },
//   ];

//   return (
//     <footer className="relative bg-[#030712] pt-24 pb-12 px-6 border-t border-white/5 overflow-hidden">
//       {/* Background Glows */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          
//           {/* Brand Section */}
//           <div className="lg:col-span-4 space-y-6">
//             <Link to="/" className="flex items-center gap-3 group">
//               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald-500/20">
//                 <img src="/logo.jpg" alt="Web Craft" className="w-full h-full object-cover" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black tracking-tighter text-white">WEB CRAFT</h2>
//                 <p className="text-[10px] text-emerald-400 font-bold tracking-[0.3em] uppercase">Craft Your Web</p>
//               </div>
//             </Link>
//             <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
//               Crafting high-performance digital solutions that turn your ideas into scalable business realities.
//             </p>
//             <div className="flex gap-4">
//               {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
//                 <a key={i} href="#" className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
//                   <Icon size={18} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links Grid */}
//           <div className="lg:col-span-5 grid grid-cols-2 gap-8">
//             {footerLinks.map((col, i) => (
//               <div key={i} className="space-y-6">
//                 <h4 className="text-white text-xs font-bold uppercase tracking-widest">{col.title}</h4>
//                 <ul className="space-y-4">
//                   {col.links.map((link, j) => (
//                     <li key={j}>
//                       <Link to={link.path} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2 group">
//                         <span className="w-0 group-hover:w-4 h-[1px] bg-emerald-400 transition-all" />
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Newsletter / Contact */}
//           <div className="lg:col-span-3 space-y-6">
//             <h4 className="text-white text-xs font-bold uppercase tracking-widest">Newsletter</h4>
//             <div className="relative group">
//               <input 
//                 type="email" 
//                 placeholder="Email address"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
//               />
//               <button className="absolute right-2 top-1.5 p-1.5 bg-emerald-500 rounded-lg text-black hover:bg-emerald-400 transition-colors">
//                 <ArrowRight size={16} />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {contactItems.map((item, i) => (
//                 <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
//                   <span className={item.color}>{item.icon}</span>
//                   {item.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats Section - Clean & Fast */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5 mb-12">
//           {[
//             { v: '100+', l: 'Projects', i: <Code size={14} /> },
//             { v: '50+', l: 'Clients', i: <Users size={14} /> },
//             { v: '24/7', l: 'Support', i: <Sparkles size={14} /> },
//             { v: '99.9%', l: 'Uptime', i: <Zap size={14} /> },
//           ].map((s, i) => (
//             <div key={i} className="text-center group cursor-default">
//               <div className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{s.v}</div>
//               <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter flex items-center justify-center gap-1">
//                 {s.i} {s.l}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-gray-500 text-xs font-medium">
//             © {currentYear} SSS GROW IT ❤️. Built for growth.
//           </p>
//           <div className="flex gap-6">
//             <Link to="/privacy" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
//             <Link to="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">Terms</Link>
//             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
//               <Shield size={10} className="text-emerald-400" />
//               <span className="text-[10px] text-gray-400 font-bold uppercase">Secure</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, 
  MapPin, Send, Sparkles, ArrowRight, Globe, Shield, 
  Zap, Code, Users, BookOpen 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Blogs', path: '/blogs' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Case Studies', path: '/projects' },
        { name: 'Help Center', path: '/help' },
      ]
    }
  ];

  const contactItems = [
    { icon: <MapPin size={16} />, text: 'Pune, MH, India', color: 'text-emerald-400', href: null },
    { icon: <Mail size={16} />, text: 'itserviceswebcraft@gmail.com', color: 'text-purple-400', href: 'mailto:itserviceswebcraft@gmail.com' },
  ];

  const socialLinks = [
    { Icon: Facebook,  href: 'https://facebook.com' },
    { Icon: Twitter,   href: 'https://twitter.com' },
    { Icon: Instagram, href: 'https://www.instagram.com/web_craft_services?igsh=aDVtazJpeWxmdm9h' },
    { Icon: Linkedin,  href: 'https://linkedin.com' },
  ];

  return (
    <footer className="relative bg-[#030712] pt-24 pb-12 px-6 border-t border-white/5 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald-500/20">
                <img src="/logo.jpg" alt="SSS Grow IT" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-white">SSS GROW IT</h2>
                <p className="text-[10px] text-emerald-400 font-bold tracking-[0.3em] uppercase">Grow With Technology</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting high-performance digital solutions that turn your ideas into scalable business realities.
            </p>
            {/* Social Media Icons — replace hrefs with real URLs */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {footerLinks.map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link to={link.path} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2 group">
                        <span className="w-0 group-hover:w-4 h-[1px] bg-emerald-400 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Newsletter</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-emerald-500 rounded-lg text-black hover:bg-emerald-400 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                  <span className={item.color}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="hover:text-emerald-400 transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5 mb-12">
          {[
            { v: '100+', l: 'Projects', i: <Code size={14} /> },
            { v: '50+', l: 'Clients', i: <Users size={14} /> },
            { v: '24/7', l: 'Support', i: <Sparkles size={14} /> },
            { v: '99.9%', l: 'Uptime', i: <Zap size={14} /> },
          ].map((s, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{s.v}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter flex items-center justify-center gap-1">
                {s.i} {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium">
            © {currentYear} SSS GROW IT ❤️. Empowering Digital Growth.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">Terms</Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <Shield size={10} className="text-emerald-400" />
              <span className="text-[10px] text-gray-400 font-bold uppercase">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;