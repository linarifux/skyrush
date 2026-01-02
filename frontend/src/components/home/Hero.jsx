import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Globe size={14} /> Global Shopping, Local Feeling
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Shop in the US, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
              Ship to the World.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8 leading-relaxed">
            Get your own US shipping address instantly. We receive your packages, consolidate them, and forward them to your doorstep anywhere in the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900"
            >
              Get My US Address
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white focus:outline-none"
            >
              How it Works
            </Link>
          </div>
        </motion.div>

        {/* Mockup / Visual Element */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 relative w-full max-w-4xl"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-4">
             {/* Simple visual representation of a dashboard or map */}
             <div className="aspect-video bg-linear-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/5">
                <span className="text-gray-600 font-mono text-sm">[ Dashboard / Map Visual Placeholder ]</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;