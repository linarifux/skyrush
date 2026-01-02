import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { 
  Mail, Lock, ArrowRight, Package, Loader2 
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Get the login function from our API slice
  const [login, { isLoading }] = useLoginMutation();

  // 2. Check if user is already logged in
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 3. Call the API
      const res = await login({ email, password }).unwrap();
      
      // 4. Save to Redux Store & LocalStorage
      dispatch(setCredentials(res));
      
      toast.success(`Welcome back, ${res.name.split(' ')[0]}!`);
      navigate('/dashboard');

    } catch (err) {
      // 5. Handle Errors (Wrong password, server down, etc.)
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex text-white relative bg-slate-950 overflow-hidden">
      
      {/* --- Left Side: Branding --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-slate-900 border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 w-fit">
             <div className="bg-blue-600 p-2 rounded-lg"><Package className="text-white h-6 w-6" /></div>
             <span className="text-2xl font-bold tracking-wide">SkyRush</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Back.</span>
          </h1>
          <p className="text-lg text-gray-400">
            Login to your dashboard to track your shipments, consolidate packages, and manage your US address.
          </p>
        </div>
        <div className="relative z-10 text-sm text-gray-500">© 2026 SkyRush Inc.</div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 relative z-20">
        
        {/* Mobile Header */}
        <div className="lg:hidden mb-12">
           <Link to="/" className="flex items-center space-x-2 font-bold text-2xl"><Package className="text-blue-500" /> <span>SkyRush</span></Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Member Login</h2>
            <p className="text-gray-400 text-sm">New to SkyRush? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Create an account</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
               {/* Email Input */}
               <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                  />
               </div>

               {/* Password Input */}
               <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    required
                  />
               </div>
            </div>

            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-800 border-white/10 text-blue-600 focus:ring-blue-600" />
                  <span>Remember me</span>
               </label>
               <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
                </>
              ) : (
                <>
                  Login to Dashboard <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;