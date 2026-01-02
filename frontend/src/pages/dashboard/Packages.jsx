import { useState } from 'react';
import { Search, Filter, Package, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import PackageDetailsModal from '../../components/dashboard/PackageDetailsModal'; // 1. Import the Modal

const Packages = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Add State for Modal
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const packages = [
    {
      id: 'SR-8842-001',
      title: 'Amazon Shipment - Electronics',
      tracking: 'TBA092492342',
      carrier: 'Amazon Logistics',
      weight: '2.4 lbs',
      date: 'Oct 24, 2025',
      status: 'Ready to Ship',
      statusColor: 'text-green-400',
      statusBg: 'bg-green-500/10',
      progress: 30 
    },
    {
      id: 'SR-8842-002',
      title: 'Nike Store - Sneakers',
      tracking: '1Z999AA10123456784',
      carrier: 'UPS',
      weight: '1.1 lbs',
      date: 'Oct 22, 2025',
      status: 'In Transit',
      statusColor: 'text-blue-400',
      statusBg: 'bg-blue-500/10',
      progress: 60
    },
    {
      id: 'SR-8842-003',
      title: 'eBay - Vintage Camera',
      tracking: '9400100000000000000000',
      carrier: 'USPS',
      weight: '0.8 lbs',
      date: 'Oct 20, 2025',
      status: 'Action Required',
      statusColor: 'text-orange-400',
      statusBg: 'bg-orange-500/10',
      progress: 10
    },
    {
      id: 'SR-8842-004',
      title: 'Sephora - Beauty Box',
      tracking: '4201000092612900000000',
      carrier: 'FedEx',
      weight: '3.2 lbs',
      date: 'Oct 15, 2025',
      status: 'Delivered',
      statusColor: 'text-gray-400',
      statusBg: 'bg-slate-800',
      progress: 100
    }
  ];

  // Filtering Logic
  const filteredPackages = packages.filter(pkg => {
    const matchesFilter = filter === 'All' || pkg.status === filter;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.tracking.includes(searchQuery) ||
                          pkg.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tabs = ['All', 'Action Required', 'Ready to Ship', 'In Transit', 'Delivered'];

  // 3. Create Handler Function
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Packages</h1>
          <p className="text-gray-400 mt-1">Manage and track your incoming shipments.</p>
        </div>
        <Link to="/dashboard/add-package" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <Package size={18} />
          <span>Register New Package</span>
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by tracking #, store, or ID..." 
            className="w-full bg-slate-800 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Info */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
           <Filter size={16} />
           <span>Showing {filteredPackages.length} packages</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filter === tab 
                ? 'bg-white text-slate-900' 
                : 'bg-slate-900 text-gray-400 hover:bg-slate-800 hover:text-white border border-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Packages List */}
      <div className="space-y-4">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Icon & Main Info */}
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl shrink-0">
                    <Package className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h3 className="font-bold text-white text-lg">{pkg.title}</h3>
                       <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pkg.statusBg} ${pkg.statusColor}`}>
                         {pkg.status}
                       </span>
                    </div>
                    <p className="text-gray-400 text-sm flex flex-wrap items-center gap-x-3">
                       <span className="font-mono text-gray-500">#{pkg.id}</span>
                       <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                       <span>{pkg.carrier}: {pkg.tracking}</span>
                    </p>
                  </div>
                </div>

                {/* Meta Details */}
                <div className="flex items-center gap-8 text-sm text-gray-400">
                   <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Weight</p>
                      <p className="text-white font-medium">{pkg.weight}</p>
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Received</p>
                      <p className="text-white font-medium">{pkg.date}</p>
                   </div>
                </div>

                {/* Action - 4. Updated Button with onClick */}
                <div className="flex items-center gap-3 mt-2 lg:mt-0">
                   <button 
                      onClick={() => handleViewDetails(pkg)} 
                      className="flex-1 lg:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-white/5"
                   >
                      View Details
                   </button>
                   <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
                      <MoreVertical size={20} />
                   </button>
                </div>

              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                   <span>Processing</span>
                   <span>Transit</span>
                   <span>Delivered</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                   <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${pkg.progress}%` }}
                   ></div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-900/50 border border-white/5 rounded-2xl border-dashed">
            <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-gray-600" size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">No packages found</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
              We couldn't find any packages matching your filters. Try changing the status or search term.
            </p>
            <button onClick={() => setFilter('All')} className="text-blue-400 hover:text-blue-300 font-medium text-sm">
               Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Render Modal Component */}
      <PackageDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pkg={selectedPackage} 
      />

    </div>
  );
};

export default Packages;