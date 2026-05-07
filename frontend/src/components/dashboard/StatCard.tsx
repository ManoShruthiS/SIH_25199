import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    percentage: number;
    isPositive: boolean;
  };
  subText?: string;
  className?: string;
}

/**
 * SIH 25199 - StatCard Component
 * Optimized for high-density enterprise dashboard views.
 * Part of the core component library for the May 18 release.
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  subText,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl">
          <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
        </div>
      </div>
      
      {(trend || subText) && (
        <div className="mt-4 flex items-center overflow-hidden whitespace-nowrap">
          {trend && (
            <div className={`flex items-center text-sm font-bold mr-3 ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1 flex-shrink-0" />
              )}
              <span>{trend.isPositive ? '+' : '-'}{trend.percentage}%</span>
            </div>
          )}
          {subText && (
            <span className="text-sm text-gray-400 truncate">
              {subText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;