import React, { useState, useEffect } from 'react';

const DashboardCards = () => {
  const [stats, setStats] = useState({ total: 0, highSeverity: 0, activeAlerts: 0 });

  // Simulate real-time fetching
  useEffect(() => {
    // In real app, fetch from /api/crimes/analytics
    setStats({
      total: 12453,
      highSeverity: 284,
      activeAlerts: 12
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-darkCard p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
          <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total FIRs Processed</p>
        <h3 className="text-3xl font-bold text-white">{stats.total.toLocaleString()}</h3>
        <p className="text-success text-sm mt-2 flex items-center gap-1">
          <span>↑ 12%</span> from last week
        </p>
      </div>

      <div className="bg-darkCard p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">High Severity Crimes</p>
        <h3 className="text-3xl font-bold text-danger">{stats.highSeverity}</h3>
        <p className="text-danger text-sm mt-2 flex items-center gap-1">
          <span>↑ 5%</span> requires immediate attention
        </p>
      </div>

      <div className="bg-darkCard p-6 rounded-xl border border-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.15)] relative overflow-hidden group">
        <div className="absolute top-4 right-4 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-warning"></span>
        </div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Active ML Hotspot Alerts</p>
        <h3 className="text-3xl font-bold text-warning">{stats.activeAlerts}</h3>
        <p className="text-gray-400 text-sm mt-2">Predicted in next 24 hours</p>
      </div>
    </div>
  );
};

export default DashboardCards;
