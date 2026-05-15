import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  TooltipProps
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

/**
 * SIH 25199 - Enterprise UI Kit
 * Reusable Chart Component
 * release_deadline: 2024-05-18
 * 
 * Provides a unified interface for Line, Bar, and Area charts using Recharts.
 * Optimized for dashboard data visualization.
 */

export type ChartType = 'area' | 'bar' | 'line';

interface ChartDataPoint {
  [key: string]: string | number;
}

interface DataKeyConfig {
  key: string;
  color: string;
  label?: string;
}

interface ChartProps {
  type?: ChartType;
  data: ChartDataPoint[];
  dataKeys: DataKeyConfig[];
  xAxisKey: string;
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md dark:bg-slate-800 dark:border-slate-700">
        <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600 dark:text-slate-400">{entry.name}:</span>
              <span className="font-medium text-slate-900 dark:text-white ml-auto">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const Chart: React.FC<ChartProps> = ({
  type = 'area',
  data,
  dataKeys,
  xAxisKey,
  height = 350,
  showGrid = true,
  showLegend = true,
  className = ""
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.4 }} />
            {showLegend && (
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingBottom: '20px' }} 
              />
            )}
            {dataKeys.map((item) => (
              <Bar
                key={item.key}
                name={item.label || item.key}
                dataKey={item.key}
                fill={item.color}
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingBottom: '20px' }} 
              />
            )}
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                name={item.label || item.key}
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );
      case 'area':
      default:
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {dataKeys.map((item) => (
                <linearGradient key={`grad-${item.key}`} id={`gradient-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={item.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={item.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingBottom: '20px' }} 
              />
            )}
            {dataKeys.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                name={item.label || item.key}
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${item.key})`}
              />
            ))}
          </AreaChart>
        );
    }
  };

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;