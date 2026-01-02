import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Calculator, Package, Globe, Zap, ArrowRight, Info } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [weight, setWeight] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);

  const plans = [
    {
      name: "Standard",
      price: "Free",
      desc: "Perfect for occasional shoppers.",
      features: [
        "Tax-Free US Address",
        "90 Days Free Storage",
        "Package Consolidation",
        "Standard Shipping Rates",
        "Basic Support"
      ],
      notIncluded: ["Priority Handling", "Reduced Shipping Rates"],
      cta: "Get Started Free",
      popular: false,
      color: "bg-slate-900",
      border: "border-white/10"
    },
    {
      name: "Premium",
      price: isAnnual ? "$60" : "$9",
      period: isAnnual ? "/year" : "/month",
      desc: "For high-volume shippers & businesses.",
      features: [
        "Tax-Free US Address",
        "180 Days Free Storage",
        "Free Consolidation",
        "20% Off Shipping Rates",
        "Priority Handling & Support",
        "Free Photos (3 per package)"
      ],
      notIncluded: [],
      cta: "Go Premium",
      popular: true,
      color: "bg-gradient-to-b from-blue-900/40 to-slate-900",
      border: "border-blue-500/50"
    }
  ];

  const additionalServices = [
    { name: "Incoming Packages", price: "Free" },
    { name: "Consolidation", price: "Free" },
    { name: "Storage (up to 90 days)", price: "Free" },
    { name: "Extra Photos", price: "$2.00 / request" },
    { name: "Special Handling", price: "$5.00 / package" },
    { name: "Insurance", price: "$2 per $100 value" },
  ];

  const handleCalculate = () => {
    if(!weight) return;
    // Simple mock calculation logic
    const baseRate = 15;
    const ratePerLb = 4.5;
    const total = baseRate + (parseFloat(weight) * ratePerLb);
    setEstimatedCost(total.toFixed(2));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            No hidden fees. Choose the plan that fits your shopping habits.
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-slate-800 rounded-full p-1 transition-colors border border-white/10"
            >
              <motion.div 
                layout 
                className="w-6 h-6 bg-blue-500 rounded-full shadow-md"
                animate={{ x: isAnnual ? 24 : 0 }}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-green-400 text-xs ml-1">(Save 40%)</span>
            </span>
          </div>
        </div>

        {/* --- Pricing Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 border ${plan.border} ${plan.color} backdrop-blur-sm flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-500 text-sm mt-2">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-green-500/10 text-green-400 mt-0.5">
                      <Check size={14} />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <div className="p-1 rounded-full bg-slate-800 text-gray-500 mt-0.5">
                      <X size={14} />
                    </div>
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/register"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- Shipping Calculator --- */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Calculator size={120} />
             </div>

             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-4">Shipping Estimator</h2>
                   <p className="text-gray-400 mb-8">
                     Get a quick estimate of your shipping costs. Prices vary based on destination, weight, and carrier.
                   </p>
                   
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Weight (lbs)</label>
                            <input 
                              type="number" 
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              placeholder="1.5" 
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Destination</label>
                            <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none">
                               <option>United Kingdom</option>
                               <option>Canada</option>
                               <option>Australia</option>
                               <option>Japan</option>
                               <option>Germany</option>
                            </select>
                         </div>
                      </div>
                      <button 
                        onClick={handleCalculate}
                        className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                         Calculate Estimate
                      </button>
                   </div>
                </div>

                {/* Result Display */}
                <div className="bg-slate-950 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center text-center h-full">
                   {estimatedCost ? (
                     <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <p className="text-gray-400 mb-2">Estimated Shipping Cost</p>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4">
                           ${estimatedCost}
                        </div>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                           *Estimate only. Does not include customs duties or taxes. Actual price determined upon warehouse receipt.
                        </p>
                     </motion.div>
                   ) : (
                     <div className="text-gray-600">
                        <Globe className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Enter details to see pricing</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* --- Additional Services Table --- */}
        <div className="max-w-3xl mx-auto">
           <h3 className="text-xl font-bold text-white mb-6 text-center">Additional Services</h3>
           <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 bg-white/5 p-4 border-b border-white/5 text-sm font-semibold text-gray-300">
                 <div>Service</div>
                 <div className="text-right">Cost</div>
              </div>
              <div className="divide-y divide-white/5">
                 {additionalServices.map((service, index) => (
                    <div key={index} className="grid grid-cols-2 p-4 text-sm hover:bg-white/5 transition-colors">
                       <div className="text-white">{service.name}</div>
                       <div className="text-right text-gray-400">{service.price}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;