import React from 'react';
import { IndexItem } from '../../types';
import IndexCard from './IndexCard';

interface ActiveIndicesProps {
  indices: IndexItem[];
}

const ActiveIndices: React.FC<ActiveIndicesProps> = ({ indices }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Active Indices</h2>
          <p className="text-sm text-gray-500">Click to view execution details</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Issues</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {indices.map((index, i) => (
          <IndexCard
            key={i}
            id={index.id}
            name={index.name}
            time={index.time}
            health={index.health}
            status={index.status}
            performance={index.performance}
            onHistoryClick={() => console.log(`Viewing history for ${index.name}`)}
          />
        ))}
      </div>

    </div>
  );
};

export default ActiveIndices;