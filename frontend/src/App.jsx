import React from 'react';
import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';

function App() {
  return (
    <div className="flex h-screen bg-darkBg overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">CrimeLens India Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time crime analytics and ML hotspot prediction</p>
        </header>

        {/* Top Cards */}
        <DashboardCards />

        {/* Charts & Analytics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-darkCard p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Crime Types Distribution</h2>
            <Charts type="pie" />
          </div>
          <div className="bg-darkCard p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Monthly Crime Trends</h2>
            <Charts type="line" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
