import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css'; // Minimal styles for the flag dropdown
import { 
  User, Mail, Lock, MapPin, Briefcase, Truck, ArrowRight, ArrowLeft, Package
} from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    companyName: '', shippingOption: 'Standard',
    street: '', streetLine2: '', city: '', state: '', zipCode: '', addressCountry: 'United States'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Data:', formData);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <div className="min-h-screen flex text-white relative bg-slate-950 overflow-hidden">
      
      {/* --- Left Side: Branding --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-slate-900 border-r border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 w-fit">
             <div className="bg-blue-600 p-2 rounded-lg"><Package className="text-white h-6 w-6" /></div>
             <span className="text-2xl font-bold tracking-wide">SkyRush</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Shop Globally, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Ship Locally.</span>
          </h1>
          <p className="text-lg text-gray-400">
            Create your account today and get instant access to your own US shipping address. We handle the logistics, you enjoy the shopping.
          </p>
        </div>
        <div className="relative z-10 text-sm text-gray-500">© 2026 SkyRush Inc. Logistics Simplified.</div>
      </div>

      {/* --- Right Side: The Form Wizard --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 relative z-20">
        
        {/* Mobile Header */}
        <div className="lg:hidden mb-8">
           <Link to="/" className="flex items-center space-x-2 font-bold text-2xl"><Package className="text-blue-500" /> <span>SkyRush</span></Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm mb-6">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link></p>
            <div className="flex items-center space-x-2">
              <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-800'}`} />
              <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-800'}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative overflow-hidden min-h-120">
            <AnimatePresence mode='wait' custom={step}>
              
              {/* === STEP 1: PERSONAL INFO === */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <InputField icon={User} name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                    <InputField name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                  </div>
                  
                  <InputField icon={Mail} type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} />
                  
                  {/* --- NEW Phone Input Component --- */}
                  <div className="w-full">
                    <PhoneInput
                      defaultCountry="bd"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      // These classes apply directly to the input field
                      inputClassName="!w-full !bg-slate-900 !border !border-white/10 !text-white !h-[54px] !text-sm !rounded-r-xl focus:!ring-2 focus:!ring-blue-600 focus:!border-transparent !transition-all placeholder:!text-gray-600"
                      // These classes apply to the flag dropdown button
                      countrySelectorStyleProps={{
                        buttonClassName: "!bg-slate-900 !border-white/10 !rounded-l-xl !h-[54px] hover:!bg-slate-800 !px-3",
                        dropdownStyleProps: {
                            className: "!bg-slate-900 !text-white !border-slate-700 custom-scrollbar",
                            listItemClassName: "hover:!bg-slate-800 !text-gray-200"
                        }
                      }}
                      inputStyle={{
                         width: '100%',
                         backgroundColor: 'transparent' // Fallback
                      }}
                    />
                  </div>

                  <InputField icon={Lock} type="password" name="password" placeholder="Create Password" onChange={handleChange} value={formData.password} />
                  
                  <button type="button" onClick={nextStep} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group">
                    Continue to Shipping <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* === STEP 2: SHIPPING INFO === */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <InputField icon={Briefcase} name="companyName" placeholder="Company (Optional)" onChange={handleChange} value={formData.companyName} />
                  <InputField icon={MapPin} name="street" placeholder="Street Address" onChange={handleChange} value={formData.street} />
                  <InputField name="streetLine2" placeholder="Apt, Suite, Unit (Optional)" onChange={handleChange} value={formData.streetLine2} />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="city" placeholder="City" onChange={handleChange} value={formData.city} />
                    <InputField name="state" placeholder="State / Prov" onChange={handleChange} value={formData.state} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="zipCode" placeholder="Zip / Postal" onChange={handleChange} value={formData.zipCode} />
                    <div className="relative">
                        <select name="addressCountry" className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-3.5 text-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none" onChange={handleChange} value={formData.addressCountry}>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Bangladesh</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                  </div>

                  <div className="relative">
                     <Truck className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                     <select name="shippingOption" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none appearance-none" onChange={handleChange} value={formData.shippingOption}>
                        <option>Standard Shipping</option>
                        <option>Express Air</option>
                        <option>Economy Saver</option>
                     </select>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={prevStep} className="w-1/3 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="submit" className="w-2/3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                      Create Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ icon: Icon, type = "text", ...props }) => (
  <div className="relative group">
    {Icon && <Icon className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />}
    <input
      type={type}
      className={`w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 text-white placeholder:text-gray-600 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all ${Icon ? 'pl-12 pr-4' : 'px-4'}`}
      {...props}
    />
  </div>
);

export default Register;