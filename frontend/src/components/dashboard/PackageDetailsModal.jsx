import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Calendar, MapPin, Truck, AlertCircle, ExternalLink } from 'lucide-react';

const PackageDetailsModal = ({ isOpen, onClose, pkg }) => {
  if (!isOpen || !pkg) return null;

  // Mock Timeline Data (In real app, use pkg.history)
  const history = [
    { status: 'In Transit', date: 'Oct 24, 08:30 AM', location: 'Portland, OR', desc: 'Departed from facility.' },
    { status: 'Processed', date: 'Oct 23, 02:15 PM', location: 'Portland, OR', desc: 'Package processed and weighed.' },
    { status: 'Received', date: 'Oct 23, 10:00 AM', location: 'Portland, OR', desc: 'Package received at warehouse.' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
                <Package size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-none">{pkg.title}</h2>
                <p className="text-sm text-gray-400 mt-1 font-mono">{pkg.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatBox label="Carrier" value={pkg.carrier} icon={Truck} />
               <StatBox label="Tracking #" value={pkg.tracking} icon={ExternalLink} isLink />
               <StatBox label="Weight" value={pkg.weight} icon={Package} />
               <StatBox label="Received" value={pkg.date} icon={Calendar} />
            </div>

            {/* Layout: Image + Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Left: Package Image */}
               <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Package Photo</h3>
                  <div className="aspect-video bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center relative group overflow-hidden">
                     {/* Placeholder for actual image */}
                     <Package className="text-gray-700 w-16 h-16" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium text-sm">View Full Image</button>
                     </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    * Photos are taken upon arrival to verify condition.
                  </p>
               </div>

               {/* Right: Timeline */}
               <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Tracking History</h3>
                  <div className="space-y-0 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-white/10"></div>

                     {history.map((event, i) => (
                        <div key={i} className="relative pl-6 pb-6 last:pb-0">
                           <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${i === 0 ? 'bg-blue-500 border-blue-500' : 'bg-slate-900 border-gray-600'}`}></div>
                           <div className="flex flex-col">
                              <span className={`text-sm font-medium ${i === 0 ? 'text-white' : 'text-gray-400'}`}>{event.status}</span>
                              <span className="text-xs text-gray-500 mb-0.5">{event.date} • {event.location}</span>
                              <p className="text-xs text-gray-400 mt-1">{event.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Additional Details / Note */}
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3">
               <AlertCircle className="text-blue-400 shrink-0" size={20} />
               <div>
                  <h4 className="text-blue-400 text-sm font-bold mb-1">Special Handling</h4>
                  <p className="text-blue-200/70 text-sm">
                     This package contains electronics (Lithium Ion Batteries). It requires special handling during international shipment.
                  </p>
               </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/10 bg-slate-900/50 flex justify-end gap-3">
            <button 
               onClick={onClose}
               className="px-4 py-2 text-gray-300 hover:text-white font-medium text-sm transition-colors"
            >
               Close
            </button>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-lg shadow-blue-500/20 transition-all">
               Request Shipping
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Helper Component for Stats
const StatBox = ({ label, value, icon: Icon, isLink }) => (
   <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 mb-1">
         <Icon size={14} className="text-gray-500" />
         <span className="text-xs text-gray-400 uppercase">{label}</span>
      </div>
      <p className={`font-medium truncate ${isLink ? 'text-blue-400 cursor-pointer hover:underline' : 'text-white'}`}>
         {value}
      </p>
   </div>
);

export default PackageDetailsModal;