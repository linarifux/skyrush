import { motion } from 'framer-motion';
import { Box, Truck, CreditCard, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <Box className="w-8 h-8 text-blue-400" />,
    title: "US Address Allocation",
    description: "Get a tax-free US address instantly upon registration to shop at your favorite retailers."
  },
  {
    icon: <Truck className="w-8 h-8 text-purple-400" />,
    title: "Fast Forwarding",
    description: "We process your items within 24 hours of arrival and ship them with premium carriers."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-green-400" />,
    title: "Consolidation",
    description: "Combine multiple purchases into one box to save up to 80% on international shipping costs."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-400" />,
    title: "Secure Handling",
    description: "Your packages are photographed, inspected, and repackaged securely before leaving."
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose SkyRush?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We bridge the gap between US retailers and global shoppers with efficiency and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="mb-4 p-3 rounded-lg bg-slate-900 inline-block group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;