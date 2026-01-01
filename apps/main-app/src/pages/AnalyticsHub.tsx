import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Activity } from '../types';
import Card from 'utilityApp/Card';
import { Button as MyButton } from 'utilityApp/Button';

const Analytics: React.FC = () => {
  const activities: Activity[] = [
    { action: 'Index execution completed', index: 'SGX S&P Asia 50 Index', time: '2 minutes ago', status: 'success' },
    { action: 'Performance threshold met', index: 'MSCI Emerging Markets Index', time: '15 minutes ago', status: 'success' },
    { action: 'Index execution started', index: 'iEdge APAC Financials Index', time: '1 hour ago', status: 'info' },
    { action: 'Warning: Performance degradation', index: 'SGX FTSE China A50 Index', time: '2 hours ago', status: 'warning' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive index analytics and insights</p>
      </div>
      <Card>
        <MyButton variant='success'>Click Me</MyButton>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Performance Trends">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart3 className="text-gray-400" size={48} />
          </div>
        </Card>

        <Card title="Success Rate">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart3 className="text-gray-400" size={48} />
          </div>
        </Card>
      </div>

      <Card title="Recent Activity">
        <div className="space-y-3">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' : 
                activity.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.index}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;