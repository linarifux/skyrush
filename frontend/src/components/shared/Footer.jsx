import { Package, Facebook, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
        
      {/* Background Decor (Optional Subtle Glow) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-16">
          
          {/* 1. Brand Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-linear-to-tr from-blue-600 to-purple-600 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                <Package className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SkyRush</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed text-center md:text-left max-w-xs">
              Your gateway to global shopping. We consolidate and ship your US packages worldwide with speed and care.
            </p>
            {/* Social Icons (Moved here for better mobile balance, or keep in col 4) */}
            <div className="flex space-x-3">
               {[Facebook, Twitter, Instagram].map((Icon, i) => (
                 <a key={i} href="#" className="p-2 bg-white/5 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/5 hover:border-transparent">
                   <Icon size={16} />
                 </a>
               ))}
            </div>
          </div>

          {/* 2. Company */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400 text-center md:text-left">
              {['About Us', 'Services', 'Pricing', 'Testimonials'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors duration-200 flex items-center justify-center md:justify-start gap-1 group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 text-center md:text-left">
               {['FAQ', 'Terms of Service', 'Privacy Policy', 'Shipping Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors duration-200 flex items-center justify-center md:justify-start gap-1 group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter / Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-slate-400 text-xs text-center md:text-left mb-4">
              Get the latest shipping rates and news.
            </p>
            
            {/* Newsletter Input */}
            <form className="w-full max-w-xs relative mb-6">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                />
                <button type="button" className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition-colors">
                    <ArrowRight size={14} />
                </button>
            </form>

            <div className="flex items-center text-slate-500 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              System Status: Operational
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} SkyRush Inc. All rights reserved.</p>
          <div className="flex space-x-6">
             <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
             <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
             <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;