import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Package, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Redux login action will go here
  };

  return (
    <div className="min-h-screen flex text-white relative bg-slate-950 overflow-hidden">
      
      {/* --- Left Side: Branding / Visuals --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-slate-900 border-r border-white/5 overflow-hidden">
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 w-fit">
             <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="text-white h-6 w-6" />
             </div>
             <span className="text-2xl font-bold tracking-wide">SkyRush</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
              Global Shopper.
            </span>
          </h1>
          <p className="text-lg text-gray-400">
            Login to access your dashboard, track your shipments, and manage your forwarding addresses.
          </p>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <span>Real-time Package Tracking</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <span>Secure Payment Gateway</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          © 2026 SkyRush Inc. Secure Login.
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 relative z-20">
        
        {/* Mobile Header */}
        <div className="lg:hidden mb-8">
           <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
              <Package className="text-blue-500" /> <span>SkyRush</span>
           </Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Log In</h2>
            <p className="text-gray-400 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Sign up for free</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Forgot Password Row */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transform transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 group"
              >
                Sign In to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </form>

          {/* Alternative Login (Optional Placeholder) */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs mb-4 uppercase tracking-wider">Or continue with</p>
            <div className="flex gap-4 justify-center">
               <button className="p-3 bg-slate-900 rounded-lg hover:bg-slate-800 transition border border-white/5">
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
               </button>
               <button className="p-3 bg-slate-900 rounded-lg hover:bg-slate-800 transition border border-white/5">
                 <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-6 h-6 invert" alt="Apple" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;