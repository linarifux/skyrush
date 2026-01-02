import { Package, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';

const Overview = () => {
  const stats = [
    { label: 'Packages in Warehouse', value: '12', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Ready to Ship', value: '3', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'In Transit', value: '5', icon: ArrowUpRight, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Action Required', value: '1', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, here is what's happening with your shipments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-400">+2 new</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity / Packages Placeholder */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-bold text-white">Recent Packages</h2>
           <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
        </div>
        
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
           <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
           <p>No recent activity found.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;