import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box, Globe, Layers, Monitor, MapPin, ClipboardCheck, 
  ArrowRight, Calculator, Truck 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Truck, // Represents "Package Forwarding"
      title: "Package Forwarding",
      desc: "Efficient forwarding for single packages. Simply alert us when your package is on the way, and we'll expedite it to your doorstep.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: Layers, // Represents "Package Consolidation"
      title: "Package Consolidation",
      desc: "Shop from multiple stores and combine them into one shipment. We consolidate your items to reduce volume and save you up to 80% on shipping.",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      icon: Monitor, // Represents "Large Package" (Appliances)
      title: "Large Package Handling",
      desc: "We specialize in handling oversized items like appliances, furniture, and electronics. Alert us in advance for special freight arrangements.",
      color: "text-orange-400",
      bg: "bg-orange-400/10"
    },
    {
      icon: MapPin, // Represents "Local Pickup"
      title: "Local Pickup",
      desc: "Prefer to pick it up yourself? Schedule a local pickup for your packages, barrels, and crates at our secure facility.",
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      icon: ClipboardCheck, // Represents "Package Check"
      title: "Package Check",
      desc: "Ensure you got what you paid for. We can verify package contents, check for damage, and send you photos before international shipping.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      icon: Globe, // Matches the Globe image in your reference
      title: "Global Distribution",
      desc: "We deliver extraordinary services worldwide. From documents to containers, we connect you to over 220 countries and territories.",
      color: "text-pink-400",
      bg: "bg-pink-400/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Delivering Extraordinary <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
              Services Worldwide.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            We forward packages worldwide. From single items to large crates, we have a solution for every shipping need.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 hover:bg-slate-900 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.bg}`}>
                  <Icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
           {/* Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-3xl -z-10" />
           
           <h2 className="text-3xl font-bold text-white mb-4">Ready to start shipping?</h2>
           <p className="text-gray-300 mb-8 max-w-xl mx-auto">
             Get your tax-free US address instantly and start shipping your favorite brands today.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Get My Address <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                <Calculator className="mr-2 w-5 h-5" /> Check Rates
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Services;