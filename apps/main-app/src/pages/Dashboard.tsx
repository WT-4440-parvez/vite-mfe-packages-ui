import React from 'react';
import { LayoutGrid } from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';
import ActiveIndices from '../components/Dashboard/ActiveIndices';
import { IndexItem, MetricCardProps } from '../types';
import CustomTabsDemo from '../components/Demo/CustomTabsDemo';

const Dashboard: React.FC = () => {
  const indices: IndexItem[] = [
    { id: 'iedge-apac-dividend', name: 'iEdge APAC Financials Dividend Plus Index', time: '2 hours ago', status: 'Running', performance: '98.5%', health: 'healthy' },
    { id: 'sgx-asia-50', name: 'SGX S&P Asia 50 Index', time: '5 hours ago', status: 'Completed', performance: '99.2%', health: 'healthy' },
    { id: 'sgx-china-a50', name: 'SGX FTSE China A50 Index', time: '7 hours ago', status: 'Running', performance: '97.1%', health: 'issues' },
    { id: 'msci-em', name: 'MSCI Emerging Markets Index', time: '3 hours ago', status: 'Completed', performance: '99.8%', health: 'healthy' },
  ];

    const metricData: MetricCardProps[] = [
        {
            title: "Overall SLA",
            value: "94.2%",
            subtitle: "↗ +0.3 from last period",
            icon: <LayoutGrid className="text-purple-600" size={20} />,
            iconBgColor: "bg-purple-100",
            subtitleColor: "text-purple-600",
        },
        {
            title: "Completed",
            value: "156",
            subtitle: "This month",
            icon: (
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white">
                    ✓
                </div>
            ),
            iconBgColor: "bg-green-100",
            subtitleColor:"text-green-600"
        },
        {
            title: "Failed",
            value: "12",
            subtitle: "Needs attention",
            icon: (
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white">
                    !
                </div>
            ),
            iconBgColor: "bg-red-100",
            subtitleColor:"text-red-600"
        },
        {
            title: "In Progress",
            value: "8",
            subtitle: "Running now",
            icon: (
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white">
                    ⟳
                </div>
            ),
            iconBgColor: "bg-orange-100",
            subtitleColor:"text-orange-600"
        },
    ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Service Level Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring and performance insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricData.map((metric, index) => (
            <MetricCard key={index} {...metric} />
        ))}
        </div>

      <ActiveIndices indices={indices} />
      <CustomTabsDemo />
    </div>
  );
};

export default Dashboard;