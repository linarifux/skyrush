import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 1. Redux Hooks
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
import { logout } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Menu, X, Package, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 2. Get Real Auth State
  const { userInfo } = useSelector((state) => state.auth);
  
  // 3. Logout Logic
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success("Logged out successfully");
      setIsOpen(false); // Close mobile menu if open
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ship Now', path: '/ship' },
    { name: 'Services', path: '/services' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4">
          
          {/* --- Logo Section --- */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="bg-linear-to-tr from-blue-500 to-purple-600 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
               <Package className="text-white h-6 w-6" />
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-wide">
              SkyRush
            </span>
          </Link>

          {/* --- Mobile Menu Button --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* --- Desktop Menu Links --- */}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${
                      isActive(link.path)
                        ? 'text-blue-400 font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Auth Buttons (Desktop) --- */}
          <div className="hidden md:flex space-x-4 items-center">
            {userInfo ? (
              // Logged In View
              <div className="flex items-center space-x-6">
                <Link to="/dashboard">
                    <span className="text-gray-300 hover:text-white cursor-pointer transition font-medium">
                      Dashboard
                    </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-red-400 hover:text-red-300 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </button>
              </div>
            ) : (
              // Guest View
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition font-medium text-sm">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 shadow-2xl">
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-600/20 text-blue-400 font-semibold'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {/* Mobile Auth Divider */}
            <div className="border-t border-white/10 my-2 pt-4 flex flex-col gap-3">
                {userInfo ? (
                     <>
                     <div className="px-4 text-sm text-gray-500 mb-2">Signed in as {userInfo.name}</div>
                     <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-gray-300 hover:bg-white/5 rounded-lg">Dashboard</Link>
                     <button onClick={handleLogout} className="w-full text-left py-2 px-4 text-red-400 hover:bg-white/5 rounded-lg">Logout</button>
                     </>
                ) : (
                    <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-center text-gray-300 hover:bg-white/5 rounded-lg border border-white/10">Log In</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20">Sign Up</Link>
                    </>
                )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;