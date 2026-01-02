import { useState } from 'react';
import { Copy, Check, MapPin, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Address = () => {
  // Mock User Data (In real app, this comes from Redux/DB)
  const userAddress = {
    name: "John Doe",
    suite: "SR-8842", // The critical unique identifier
    street: "14838 NE Airport Way",
    city: "Portland",
    state: "Oregon",
    zip: "97230",
    country: "United States",
    phone: "+1 (503) 555-0123"
  };

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My US Address</h1>
        <p className="text-gray-400 mt-1">
          Use this address at checkout on any US online store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: The Address Card --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Address Display */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between">
                 <div className="flex items-center space-x-3 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                    <MapPin size={20} />
                    <span className="font-semibold">Tax-Free Warehouse (Oregon)</span>
                 </div>
              </div>

              {/* Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AddressField 
                   label="Full Name" 
                   value={userAddress.name} 
                   onCopy={() => handleCopy(userAddress.name, 'name')}
                   isCopied={copiedField === 'name'}
                 />
                 <AddressField 
                   label="Address Line 1" 
                   value={userAddress.street} 
                   onCopy={() => handleCopy(userAddress.street, 'street')}
                   isCopied={copiedField === 'street'}
                 />
                 <AddressField 
                   label="Address Line 2 (Suite ID)" 
                   value={`Suite ${userAddress.suite}`} 
                   highlight
                   onCopy={() => handleCopy(`Suite ${userAddress.suite}`, 'suite')}
                   isCopied={copiedField === 'suite'}
                 />
                 <AddressField 
                   label="City" 
                   value={userAddress.city} 
                   onCopy={() => handleCopy(userAddress.city, 'city')}
                   isCopied={copiedField === 'city'}
                 />
                 <AddressField 
                   label="State / Province" 
                   value={userAddress.state} 
                   onCopy={() => handleCopy(userAddress.state, 'state')}
                   isCopied={copiedField === 'state'}
                 />
                 <AddressField 
                   label="Zip / Postal Code" 
                   value={userAddress.zip} 
                   onCopy={() => handleCopy(userAddress.zip, 'zip')}
                   isCopied={copiedField === 'zip'}
                 />
                 <AddressField 
                   label="Phone Number" 
                   value={userAddress.phone} 
                   onCopy={() => handleCopy(userAddress.phone, 'phone')}
                   isCopied={copiedField === 'phone'}
                 />
              </div>
            </div>
          </div>

          {/* Example Format */}
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
             <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Info size={18} className="text-gray-400" /> 
                How it should look on Amazon/eBay
             </h3>
             <div className="bg-white text-slate-900 p-4 rounded-lg font-mono text-sm leading-relaxed shadow-inner">
                <p>{userAddress.name}</p>
                <p>{userAddress.street}, <span className="text-blue-600 font-bold bg-blue-100 px-1">Suite {userAddress.suite}</span></p>
                <p>{userAddress.city}, {userAddress.state} {userAddress.zip}</p>
                <p>{userAddress.country}</p>
                <p>{userAddress.phone}</p>
             </div>
          </div>

        </div>

        {/* --- Right Column: Tips & Alerts --- */}
        <div className="space-y-6">
          
          {/* Important Alert */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
             <div className="flex items-start gap-4">
                <AlertTriangle className="text-orange-500 shrink-0" size={24} />
                <div>
                   <h3 className="text-orange-500 font-bold mb-1">Do not forget your Suite ID!</h3>
                   <p className="text-orange-200/80 text-sm leading-relaxed">
                      Your Suite ID (<span className="font-mono font-bold text-orange-400">Suite {userAddress.suite}</span>) is how we identify that a package belongs to you. Packages without this ID may be delayed or returned.
                   </p>
                </div>
             </div>
          </div>

          {/* Tips List */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
             <h3 className="text-white font-semibold mb-4">Shipping Tips</h3>
             <ul className="space-y-4">
                {[
                  "We are located in a Tax-Free state, so you save ~9% on sales tax.",
                  "Some stores don't accept 'Suite'. You can use 'Ste', 'Unit', or '#' instead.",
                  "If a phone number is required, use the warehouse number provided here."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                     {tip}
                  </li>
                ))}
             </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for individual fields
const AddressField = ({ label, value, onCopy, isCopied, highlight = false }) => (
  <div className="group relative">
     <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">
       {label}
     </label>
     <div className={`relative flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${highlight ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-800 border-white/5 hover:border-white/20'}`}>
        <span className={`font-mono text-sm md:text-base ${highlight ? 'text-blue-400 font-bold' : 'text-gray-200'}`}>
           {value}
        </span>
        <button 
           onClick={onCopy}
           className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
           title="Copy to clipboard"
        >
           {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
     </div>
  </div>
);

export default Address;