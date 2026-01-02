import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bridging Borders for <br/>
              <span className="text-blue-500">Global Shoppers</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Most retailers based in the United States ship only to local states or Canada, creating an inconvenience for shoppers from other countries to get their goods.
              </p>
              <p>
                To solve this issue, we at <strong className="text-white">SkyRush</strong> provide you with a US-based address where you can have your online purchases shipped. We then forward them to you at a low cost.
              </p>
              <p>
                Our mission is simple: to provide high-quality services for our valued clients. Our team goes above and beyond to cater to each customer’s specific needs. Through open communication and exceptional service, we hope you’ll find satisfaction in our package forwarding.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Trusted Industry Name', 'Open Communication', 'Cost-Effective', 'Client-Centric Approach'].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-white font-medium">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800 h-125 group">
              {/* This would act as a placeholder for a real image of a warehouse or plane */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Logistics Warehouse" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-bold text-xl">Trusted Since 2025</p>
                <p className="text-blue-400 text-sm">Delivering happiness worldwide</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;