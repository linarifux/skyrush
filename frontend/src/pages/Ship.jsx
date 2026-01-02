import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Package, Search, User, MapPin, Box, Scale, DollarSign, Truck, ArrowRight, ArrowLeft, CheckCircle2 
} from 'lucide-react';

const Ship = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState([]);
  
  const [formData, setFormData] = useState({
    // Step 1: Lookup
    customerEmail: '',
    
    // Address (Auto-filled)
    name: '',
    company: '',
    street: '',
    streetLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',

    // Step 2: Package Details
    length: '',
    width: '',
    height: '',
    weight: '',
    description: '',
    value: '',
    selectedCarrier: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIC: Step 1 (Fetch User) ---
  const handleLookup = (e) => {
    e.preventDefault();
    if (!formData.customerEmail) return toast.error("Please enter an email or phone number");

    setIsLoading(true);

    // SIMULATION: Fetching data from ShipStation API
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock Data Response
      setFormData(prev => ({
        ...prev,
        name: 'Jane Doe',
        company: 'Doe Inc.',
        street: '123 Shipping Lane',
        city: 'Beverly Hills',
        state: 'CA',
        zip: '90210',
        phone: '+1 555 0199'
      }));
      
      toast.success("Customer found! Address loaded.");
      setStep(2);
    }, 1500);
  };

  // --- LOGIC: Step 2 (Calculate Rates) ---
  // Check if dimensions are filled to show carrier options
  const isPackageInfoComplete = formData.length && formData.width && formData.height && formData.weight;

  useEffect(() => {
    if (isPackageInfoComplete) {
       // SIMULATION: Fetching Rates based on dimensions
       const mockRates = [
         { id: 'ups', name: 'UPS Ground', price: 14.50, time: '3-5 Days' },
         { id: 'fedex', name: 'FedEx Express', price: 28.90, time: '1-2 Days' },
         { id: 'usps', name: 'USPS Priority', price: 9.20, time: '2-4 Days' }
       ];
       setRates(mockRates);
    } else {
       setRates([]);
       setFormData(prev => ({ ...prev, selectedCarrier: null }));
    }
  }, [formData.length, formData.width, formData.height, formData.weight]);


  const handlePay = () => {
     if(!formData.selectedCarrier) return toast.error("Please select a shipping carrier");
     toast.success(`Processing payment of $${formData.selectedCarrier.price}...`);
     console.log("PAYLOAD:", formData);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <div className="min-h-screen flex text-white relative bg-slate-950 overflow-hidden">
      
      {/* --- Left Side: Branding / Info --- */}
      <div className="hidden lg:flex lg:w-1/3 relative flex-col justify-between p-12 bg-slate-900 border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 w-fit">
             <div className="bg-blue-600 p-2 rounded-lg"><Package className="text-white h-6 w-6" /></div>
             <span className="text-2xl font-bold tracking-wide">SkyRush</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
           <h1 className="text-4xl font-bold leading-tight">
              Ship Your <br/> <span className="text-blue-500">Package Now</span>
           </h1>
           <p className="text-gray-400">
              Get instant rates from top carriers. We auto-fill details for existing customers to save you time.
           </p>
           
           <div className="space-y-4 pt-4">
              <FeatureItem text="Live ShipStation Rates" />
              <FeatureItem text="Instant Label Generation" />
              <FeatureItem text="Secure Payment" />
           </div>
        </div>

        <div className="relative z-10 text-xs text-gray-500">
           Powered by ShipStation API
        </div>
      </div>

      {/* --- Right Side: The Form --- */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center px-4 md:px-16 py-12 relative z-20 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full">
           
           {/* Progress Header */}
           <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{step === 1 ? 'Customer Lookup' : 'Package & Rates'}</h2>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                 <span className={step === 1 ? 'text-blue-400' : ''}>Step 1</span>
                 <span>/</span>
                 <span className={step === 2 ? 'text-blue-400' : ''}>Step 2</span>
              </div>
           </div>

           <AnimatePresence mode='wait' custom={step}>
              
              {/* === STEP 1: USER LOOKUP === */}
              {step === 1 && (
                <motion.div
                   key="step1"
                   custom={step}
                   variants={slideVariants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={{ duration: 0.3 }}
                   className="space-y-6"
                >
                   <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500">
                         <User size={32} />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-white">Who are we shipping to?</h3>
                         <p className="text-gray-400 text-sm">Enter the customer's email or phone to fetch their saved address.</p>
                      </div>

                      <div className="max-w-sm mx-auto space-y-4">
                         <InputField 
                            icon={Search} 
                            name="customerEmail" 
                            placeholder="Customer Email or Phone" 
                            value={formData.customerEmail}
                            onChange={handleChange}
                            autoFocus
                         />
                         
                         <button 
                            onClick={handleLookup}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            {isLoading ? 'Searching...' : 'Find Customer'} <ArrowRight size={18} />
                         </button>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* === STEP 2: PACKAGE DETAILS === */}
              {step === 2 && (
                <motion.div
                   key="step2"
                   custom={step}
                   variants={slideVariants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={{ duration: 0.3 }}
                   className="space-y-8"
                >
                   {/* Address Recap (Read Only) */}
                   <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex justify-between items-start">
                      <div className="flex gap-3">
                         <MapPin className="text-gray-500 mt-1" size={18} />
                         <div>
                            <p className="text-sm font-semibold text-white">Ship To: {formData.name}</p>
                            <p className="text-xs text-gray-400">{formData.street}, {formData.city}, {formData.state} {formData.zip}</p>
                         </div>
                      </div>
                      <button onClick={() => setStep(1)} className="text-xs text-blue-400 hover:underline">Change</button>
                   </div>

                   {/* Dimensions Grid */}
                   <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Box size={18} /> Package Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase">Length (in)</label>
                            <input type="number" name="length" placeholder="0" className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase">Width (in)</label>
                            <input type="number" name="width" placeholder="0" className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase">Height (in)</label>
                            <input type="number" name="height" placeholder="0" className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase text-blue-400 font-bold">Weight (lbs)*</label>
                            <input type="number" name="weight" placeholder="0.0" className="w-full bg-slate-900 border border-blue-500/30 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                         </div>
                      </div>
                   </div>

                   {/* International (Optional) */}
                   <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><DollarSign size={18} /> International (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="md:col-span-2 space-y-1">
                            <input type="text" name="description" placeholder="Item Description" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm" onChange={handleChange} />
                         </div>
                         <div className="space-y-1">
                            <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                               <input type="number" name="value" placeholder="Value" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-7 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm" onChange={handleChange} />
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Conditional Carrier Selection */}
                   <AnimatePresence>
                      {isPackageInfoComplete && (
                         <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 pt-4 border-t border-white/5"
                         >
                            <h3 className="text-white font-semibold flex items-center gap-2"><Truck size={18} /> Select Carrier Rate</h3>
                            <div className="grid grid-cols-1 gap-3">
                               {rates.map((rate) => (
                                  <div 
                                     key={rate.id}
                                     onClick={() => setFormData({ ...formData, selectedCarrier: rate })}
                                     className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                                        formData.selectedCarrier?.id === rate.id 
                                        ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-900/20' 
                                        : 'bg-slate-900 border-white/10 hover:border-white/20'
                                     }`}
                                  >
                                     <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.selectedCarrier?.id === rate.id ? 'border-blue-500' : 'border-gray-500'}`}>
                                            {formData.selectedCarrier?.id === rate.id && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                        </div>
                                        <div>
                                           <p className="font-bold text-white">{rate.name}</p>
                                           <p className="text-xs text-gray-400">Est. {rate.time}</p>
                                        </div>
                                     </div>
                                     <span className="font-mono font-bold text-lg">${rate.price.toFixed(2)}</span>
                                  </div>
                               ))}
                            </div>

                            {/* Pay Button */}
                            <div className="pt-4">
                               <button 
                                  onClick={handlePay}
                                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
                               >
                                  Pay ${formData.selectedCarrier ? formData.selectedCarrier.price.toFixed(2) : '0.00'} & Print Label
                               </button>
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>

                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---
const InputField = ({ icon: Icon, ...props }) => (
   <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />}
      <input 
         className={`w-full bg-slate-900 border border-white/10 rounded-xl py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${Icon ? 'pl-12 pr-4' : 'px-4'}`}
         {...props}
      />
   </div>
);

const FeatureItem = ({ text }) => (
   <div className="flex items-center space-x-2 text-gray-300">
      <CheckCircle2 className="w-5 h-5 text-blue-500" />
      <span>{text}</span>
   </div>
);

export default Ship;