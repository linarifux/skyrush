import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, ShoppingCart, PackageSearch, Plane, 
  ArrowRight, HelpCircle, ChevronDown, CheckCircle2 
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Join SkyRush",
      desc: "Register for free and instantly receive your own tax-free US shipping address. No credit card required to sign up.",
      icon: UserPlus,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      num: "02",
      title: "Shop Online",
      desc: "Shop at Amazon, eBay, Nike, or any US retailer. Simply use your unique SkyRush address as the shipping address at checkout.",
      icon: ShoppingCart,
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      num: "03",
      title: "We Receive & Alert",
      desc: "When your package arrives at our warehouse, we inspect it for damage, weigh it, and send you a notification with photos.",
      icon: PackageSearch,
      color: "text-orange-400",
      bg: "bg-orange-400/10"
    },
    {
      num: "04",
      title: "Ship Worldwide",
      desc: "Login to your dashboard, select your carrier (DHL, FedEx, UPS), and pay for shipping. We'll forward it to your doorstep.",
      icon: Plane,
      color: "text-green-400",
      bg: "bg-green-400/10"
    }
  ];

  const faqs = [
    {
      question: "Is there a monthly fee?",
      answer: "No, our standard plan is completely free. You only pay for shipping when you forward a package. We also offer premium memberships for high-volume shippers."
    },
    {
      question: "How long can I store my packages?",
      answer: "We offer 90 days of free storage for all members. This gives you plenty of time to shop from multiple stores and consolidate your items."
    },
    {
      question: "Do you consolidate packages?",
      answer: "Yes! Consolidation is our specialty. We can combine multiple small boxes into one larger box to reduce dimensional weight and save you up to 80% on shipping."
    },
    {
      question: "What if I don't have a US credit card?",
      answer: "Use our 'Assisted Purchase' service. Tell us what you want to buy, and we'll purchase it for you using our company card."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            <HelpCircle size={14} /> Simple 4-Step Process
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            From the US to You <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              In 4 Easy Steps.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            We've simplified international logistics so you can focus on shopping. Here is exactly how SkyRush gets your packages to your door.
          </motion.p>
        </div>

        {/* --- Steps Section --- */}
        <div className="relative mb-32">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bg}`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className="text-4xl font-black text-white/5 font-sans">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Video / Visual Section (Optional Placeholder) --- */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-slate-900 border border-white/10 rounded-3xl p-2 mb-32"
        >
           <div className="aspect-video bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              {/* Fake Play Button */}
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                 <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <p className="absolute bottom-8 font-medium text-white tracking-wide">Watch: The SkyRush Journey</p>
           </div>
        </motion.div>

        {/* --- FAQ Section --- */}
        <div className="max-w-3xl mx-auto mb-20">
           <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} />
              ))}
           </div>
        </div>

        {/* --- CTA --- */}
        <div className="text-center">
           <Link 
             to="/register"
             className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all"
           >
             Start Shipping Now <ArrowRight className="ml-2 w-5 h-5" />
           </Link>
           <p className="mt-4 text-sm text-gray-500">No credit card required • Cancel anytime</p>
        </div>

      </div>
    </div>
  );
};

// Helper Component for FAQ Accordion
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl bg-white/5 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        <ChevronDown 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HowItWorks;