import React from 'react';
import { BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';

/**
 * LearningProgress Component
 * SIH 25199 Enterprise Portal - Dashboard Widget
 * Visualizes current learning path status for the authenticated user.
 */

interface ModuleProgress {
  id: string;
  title: string;
  percentage: number;
  status: 'in-progress' | 'completed' | 'not-started';
  lastAccessed: string;
}

const LearningProgress: React.FC = () => {
  // Mock data representing course progress fetched from the enterprise API
  const progressData: ModuleProgress[] = [
    {
      id: 'm1',
      title: 'Advanced System Architecture & Scalability',
      percentage: 75,
      status: 'in-progress',
      lastAccessed: '2 hours ago'
    },
    {
      id: 'm2',
      title: 'Enterprise Security Protocols (v2.4)',
      percentage: 100,
      status: 'completed',
      lastAccessed: 'Yesterday'
    },
    {
      id: 'm3',
      title: 'Data Compliance & Global Governance',
      percentage: 30,
      status: 'in-progress',
      lastAccessed: '3 days ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-slate-800 tracking-tight">Learning Progress</h2>
        </div>
        <button 
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors uppercase tracking-wider"
          onClick={() => window.location.href = '/learning-catalog'}
        >
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-grow divide-y divide-slate-100 overflow-y-auto">
        {progressData.map((item) => (
          <div key={item.id} className="p-4 hover:bg-slate-50/80 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <div className="max-w-[80%]">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Last active: {item.lastAccessed}</span>
                  </div>
                  {item.status === 'completed' && (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold uppercase tracking-tighter">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {item.percentage}%
              </span>
            </div>

            <div className="relative w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`absolute top-0 left-0 h-1.5 rounded-full transition-all duration-700 ease-out ${
                  item.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-2">
          <span>Overall Path Completion</span>
          <span className="text-slate-900">68%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1">
          <div 
            className="bg-slate-500 h-1 rounded-full transition-all duration-1000" 
            style={{ width: '68%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;