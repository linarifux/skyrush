import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useGetCustomerMutation, useGetRatesMutation } from '../redux/slices/shipStationApiSlice'; 
import { 
  Package, Search, User, MapPin, Box, DollarSign, Truck, ArrowRight, CheckCircle2, Loader2, Building2, Phone, Globe 
} from 'lucide-react';

const Ship = () => {
  const [step, setStep] = useState(1);
  const [rates, setRates] = useState([]);
  
  // API Hooks
  const [getCustomer, { isLoading: isLookupLoading }] = useGetCustomerMutation();
  const [getRates, { isLoading: isRatesLoading }] = useGetRatesMutation();
  
  const [formData, setFormData] = useState({
    searchInput: '', 
    name: '', company: '', street: '', streetLine2: '', city: '', state: '', zip: '', country: 'US', phone: '',
    length: '', width: '', height: '', weight: '', description: '', value: '',
    selectedCarrier: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIC: Step 1 (Fetch User) ---
  const handleLookup = async (e) => {
    e.preventDefault();
    const term = formData.searchInput.trim();
    if (!term) return toast.error("Please enter an email or phone number");

    try {
      const isEmail = term.includes('@');
      const queryParams = isEmail ? `email=${term}` : `phone=${term}`;
      const customer = await getCustomer(queryParams).unwrap();
      
      setFormData(prev => ({
        ...prev,
        name: customer.name || '',
        company: customer.company || '',
        street: customer.street1 || '',
        streetLine2: customer.street2 || '',
        city: customer.city || '',
        state: customer.state || '',
        zip: customer.postalCode || '',
        country: customer.countryCode || 'US',
        phone: customer.phone || ''
      }));
      
      toast.success("Customer found!");
      setStep(2);
    } catch (err) {
      toast.error("Customer not found.");
    }
  };

  // --- LOGIC: Step 2 (Get Real Rates) ---
  useEffect(() => {
    const checkRates = async () => {
        const { length, width, height, weight, city, zip, country, state } = formData;
        
        if (length && width && height && weight && city && zip) {
            try {
                const payload = {
                    toAddress: { city, state, zip, country },
                    packageInfo: { length, width, height, weight }
                };
                const fetchedRates = await getRates(payload).unwrap();
                setRates(fetchedRates);
                if(fetchedRates.length === 0) toast.error("No rates found for these dimensions.");
            } catch (err) {
                console.error("Rate fetch failed", err);
            }
        }
    };

    if (parseFloat(formData.weight) > 0) {
        const timer = setTimeout(() => { checkRates(); }, 800);
        return () => clearTimeout(timer);
    }
  }, [formData.length, formData.width, formData.height, formData.weight, formData.city, formData.zip]);

  const handlePay = () => {
     if(!formData.selectedCarrier) return toast.error("Please select a shipping carrier");
     toast.success(`Generated Label: $${formData.selectedCarrier.shipmentCost.toFixed(2)}`);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <div className="min-h-screen flex text-white relative bg-slate-950 overflow-hidden">
      
      {/* Left Side (Unchanged) */}
      <div className="hidden lg:flex lg:w-1/3 relative flex-col justify-between p-12 bg-slate-900 border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 w-fit">
             <div className="bg-blue-600 p-2 rounded-lg"><Package className="text-white h-6 w-6" /></div>
             <span className="text-2xl font-bold tracking-wide">SkyRush</span>
          </Link>
        </div>
        <div className="relative z-10 space-y-6">
           <h1 className="text-4xl font-bold leading-tight">Ship Your <br/> <span className="text-blue-500">Package Now</span></h1>
           <p className="text-gray-400">Get instant rates from top carriers. We auto-fill details for existing customers.</p>
           <div className="space-y-4 pt-4">
              <FeatureItem text="Live ShipStation Rates" />
              <FeatureItem text="Instant Label Generation" />
              <FeatureItem text="Secure Payment" />
           </div>
        </div>
        <div className="relative z-10 text-xs text-gray-500">Powered by ShipStation API</div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center px-4 md:px-16 py-12 relative z-20 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full">
           
           <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{step === 1 ? 'Customer Lookup' : 'Details & Rates'}</h2>
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
                         <p className="text-gray-400 text-sm">Enter email or phone to fetch address.</p>
                      </div>

                      <div className="max-w-sm mx-auto space-y-4">
                         <InputField 
                            icon={Search} name="searchInput" placeholder="Customer Email or Phone" 
                            value={formData.searchInput} onChange={handleChange} autoFocus
                         />
                         <button 
                            onClick={handleLookup} disabled={isLookupLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                         >
                            {isLookupLoading ? <Loader2 className="animate-spin" /> : <>Find Customer <ArrowRight size={18} /></>}
                         </button>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* === STEP 2: DETAILS & RATES === */}
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
                   {/* 1. Address Breakdown (Editable Boxes) */}
                   <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold flex items-center gap-2"><MapPin size={18} /> Shipping Address</h3>
                        <button onClick={() => setStep(1)} className="text-xs text-blue-400 hover:text-blue-300">New Search</button>
                      </div>
                      
                      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 space-y-4">
                          {/* Row 1: Name & Company */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <InputField icon={User} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                             <InputField icon={Building2} name="company" placeholder="Company (Optional)" value={formData.company} onChange={handleChange} />
                          </div>
                          
                          {/* Row 2: Street 1 & 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="md:col-span-2">
                                <InputField icon={MapPin} name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />
                             </div>
                             <InputField name="streetLine2" placeholder="Apt, Suite, Unit" value={formData.streetLine2} onChange={handleChange} />
                          </div>

                          {/* Row 3: City, State, Zip, Country */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             <InputField name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                             <InputField name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                             <InputField name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} />
                             <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input name="country" value={formData.country} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                             </div>
                          </div>
                          
                          {/* Row 4: Phone */}
                          <div>
                              <InputField icon={Phone} name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                          </div>
                      </div>
                   </div>

                   {/* 2. Package Dimensions */}
                   <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Box size={18} /> Package Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {['length', 'width', 'height'].map(dim => (
                            <div key={dim} className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase">{dim} (in)</label>
                                <input type="number" name={dim} placeholder="0" className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                            </div>
                         ))}
                         <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase text-blue-400 font-bold">Weight (lbs)*</label>
                            <input type="number" name="weight" placeholder="0.0" className="w-full bg-slate-900 border border-blue-500/30 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
                         </div>
                      </div>
                   </div>

                   {/* 3. Carrier Selection */}
                   <AnimatePresence>
                      {rates.length > 0 && (
                         <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 pt-4 border-t border-white/5"
                         >
                            <h3 className="text-white font-semibold flex items-center gap-2"><Truck size={18} /> Best Rates Found</h3>
                            <div className="grid grid-cols-1 gap-3">
                               {rates.map((rate, idx) => (
                                  <div 
                                     key={idx} 
                                     onClick={() => setFormData({ ...formData, selectedCarrier: rate })}
                                     className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                                        formData.selectedCarrier?.serviceCode === rate.serviceCode 
                                        ? 'bg-blue-600/10 border-blue-500 shadow-md' 
                                        : 'bg-slate-900 border-white/10 hover:border-white/20'
                                     }`}
                                  >
                                     <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.selectedCarrier?.serviceCode === rate.serviceCode ? 'border-blue-500' : 'border-gray-500'}`}>
                                            {formData.selectedCarrier?.serviceCode === rate.serviceCode && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                        </div>
                                        <div>
                                           <p className="font-bold text-white">{rate.serviceName}</p>
                                           <p className="text-xs text-gray-400">Carrier: {rate.carrierCode}</p>
                                        </div>
                                     </div>
                                     <span className="font-mono font-bold text-lg">${rate.shipmentCost.toFixed(2)}</span>
                                  </div>
                               ))}
                            </div>

                            <div className="pt-4">
                               <button onClick={handlePay} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                                  Pay ${formData.selectedCarrier ? formData.selectedCarrier.shipmentCost.toFixed(2) : '0.00'} & Print Label
                               </button>
                            </div>
                         </motion.div>
                      )}
                      
                      {isRatesLoading && (
                          <div className="flex items-center justify-center py-8 text-blue-400">
                              <Loader2 className="animate-spin w-6 h-6 mr-2" /> Calculating Best Rates...
                          </div>
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

// --- Helper Component ---
const InputField = ({ icon: Icon, ...props }) => (
   <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />}
      <input 
         className={`w-full bg-slate-900 border border-white/10 rounded-xl py-3 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${Icon ? 'pl-12 pr-4' : 'px-4'}`}
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