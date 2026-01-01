import React from 'react';
import { useParams } from 'react-router-dom';
// Card from utility is available if needed: import { Card } from 'utilityApp/Card';

const IndexDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
  <div className="bg-linear-to-r from-purple-700 to-pink-600 text-white rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Index Execution Flow</h1>
            <p className="text-sm opacity-90 mt-1">{id}</p>
            <p className="text-sm opacity-70">Monitor step-by-step execution and performance metrics</p>
          </div>
          <div>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg">Export Report</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 text-center bg-white/10 rounded-lg">
            <div className="text-3xl font-semibold">4</div>
            <div className="text-sm">Total Steps</div>
          </div>
          <div className="p-4 text-center bg-white/10 rounded-lg">
            <div className="text-3xl font-semibold">2</div>
            <div className="text-sm">Completed</div>
          </div>
          <div className="p-4 text-center bg-white/10 rounded-lg">
            <div className="text-3xl font-semibold">1</div>
            <div className="text-sm">Failed</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Execution Progress</h3>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className="h-full bg-linear-to-r from-purple-600 to-pink-500" style={{width: '50%'}}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Diagram</h3>
        <div className="h-96 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-gray-400">Workflow diagram placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default IndexDetails;
