import React from 'react';
import { MetricCardProps } from '@/types';

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  subtitleColor = 'text-gray-500'
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm ${subtitleColor} mt-2`}>{subtitle}</div>
    </div>
  );
};

export default MetricCard;