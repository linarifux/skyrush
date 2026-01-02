import { useState } from 'react';
import { User, Lock, Bell, Shield, Mail, Phone, Camera, Save } from 'lucide-react';

const Settings = () => {
  // Mock User State
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 012-3456',
    bio: 'Global shopper based in Dhaka.'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    marketing: false,
    security: true
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account preferences and security.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
           <Save size={18} />
           <span>Save Changes</span>
        </button>
      </div>

      {/* --- Section 1: Profile Information --- */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
           <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
             <User size={20} />
           </div>
           <h2 className="text-lg font-bold text-white">Profile Information</h2>
        </div>
        
        <div className="p-6 md:p-8 space-y-8">
           
           {/* Avatar Upload */}
           <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                 <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Profile" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity" 
                    />
                    <Camera className="absolute text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                 </div>
              </div>
              <div>
                 <h3 className="text-white font-medium">Profile Photo</h3>
                 <p className="text-sm text-gray-500 mb-3">Accepts JPG, PNG or GIF. Max size 2MB.</p>
                 <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-colors">
                    Upload New
                 </button>
              </div>
           </div>

           {/* Form Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="First Name" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
              <InputGroup label="Last Name" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
              
              <InputGroup label="Email Address" name="email" value={profile.email} onChange={handleProfileChange} icon={Mail} />
              <InputGroup label="Phone Number" name="phone" value={profile.phone} onChange={handleProfileChange} icon={Phone} />
              
              <div className="md:col-span-2">
                 <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Bio / Notes</label>
                 <textarea 
                    name="bio"
                    rows="3"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 resize-none"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* --- Section 2: Notifications --- */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
           <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
             <Bell size={20} />
           </div>
           <h2 className="text-lg font-bold text-white">Notification Preferences</h2>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
           <ToggleRow 
              title="Shipment Updates" 
              desc="Get notified when your package arrives, ships, or is delivered." 
              isOn={notifications.emailAlerts} 
              onToggle={() => toggleNotification('emailAlerts')} 
           />
           <ToggleRow 
              title="SMS Alerts" 
              desc="Receive tracking updates via SMS (Charges may apply)." 
              isOn={notifications.smsAlerts} 
              onToggle={() => toggleNotification('smsAlerts')} 
           />
           <ToggleRow 
              title="Marketing & Offers" 
              desc="Receive shipping discounts and seasonal promo codes." 
              isOn={notifications.marketing} 
              onToggle={() => toggleNotification('marketing')} 
           />
        </div>
      </div>

      {/* --- Section 3: Security --- */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
           <div className="bg-green-500/10 p-2 rounded-lg text-green-400">
             <Shield size={20} />
           </div>
           <h2 className="text-lg font-bold text-white">Security & Password</h2>
        </div>
        
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <InputGroup label="Current Password" type="password" placeholder="••••••••" icon={Lock} />
           <div className="hidden md:block"></div> {/* Spacer */}
           
           <InputGroup label="New Password" type="password" placeholder="••••••••" icon={Lock} />
           <InputGroup label="Confirm New Password" type="password" placeholder="••••••••" icon={Lock} />
           
           <div className="md:col-span-2 mt-4 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                 <p>Last changed: Oct 2, 2025</p>
              </div>
              <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/5 transition-colors">
                 Update Password
              </button>
           </div>
        </div>
      </div>

      {/* Mobile Save Button (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-slate-900 border-t border-white/10 z-20">
         <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg">
           <Save size={18} />
           <span>Save Changes</span>
         </button>
      </div>

    </div>
  );
};

// --- Reusable Components ---

const InputGroup = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="space-y-2">
     <label className="block text-xs font-medium text-gray-400 uppercase">{label}</label>
     <div className="relative group">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />}
        <input 
           type={type}
           className={`w-full bg-slate-950 border border-white/10 rounded-xl py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
           {...props}
        />
     </div>
  </div>
);

const ToggleRow = ({ title, desc, isOn, onToggle }) => (
  <div className="flex items-center justify-between">
     <div>
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
     </div>
     <button 
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isOn ? 'bg-blue-600' : 'bg-slate-700'}`}
     >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
     </button>
  </div>
);

export default Settings;