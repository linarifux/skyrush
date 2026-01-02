import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 1. Import Hooks
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, Package, MapPin, Settings, LogOut, Menu, X, Bell, User
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 2. Get User Info from Redux
  const { userInfo } = useSelector((state) => state.auth);
  
  // 3. Logout Mutation
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Package, label: 'My Packages', path: '/dashboard/packages' },
    { icon: MapPin, label: 'My US Address', path: '/dashboard/address' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/5 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
             <div className="bg-blue-600 p-1.5 rounded-lg"><Package className="text-white h-5 w-5" /></div>
             <span>SkyRush</span>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
          <button 
             onClick={handleLogout} // 4. Attach Logout Handler
             className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content Wrapper --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
          
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-end w-full space-x-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>

            {/* User Profile - 5. Dynamic Data */}
            <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">
                    {userInfo ? userInfo.name : 'Guest'}
                </p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                   {/* Fallback to initial if no image */}
                   <span className="font-bold text-white text-sm">
                      {userInfo ? userInfo.name.charAt(0) : <User size={20} />}
                   </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
           
           <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;