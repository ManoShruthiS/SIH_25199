import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Lock, ChevronRight, BarChart3 } from 'lucide-react';
import api from '../../lib/api';

interface Milestone {
  id: string;
  title: string;
  description: string;
  nsqfLevel: number;
  status: 'completed' | 'current' | 'pending';
  credits: number;
  expectedCompletion?: string;
  actualCompletion?: string;
}

interface MilestoneTrackerProps {
  pathwayId?: string;
  userId?: string;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ pathwayId, userId }) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        // Endpoint aligned with SIH 25199 NSQF specifications
        const response = await api.get(`/nsqf/pathway/${pathwayId || 'default'}/milestones`);
        setMilestones(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch NSQF milestones:', err);
        setError('Failed to load milestone data. Please try again later.');
        
        // Fallback for development if API is not yet reachable during crunch
        const mockData: Milestone[] = [
          { id: '1', title: 'Level 3: Foundation', description: 'Core vocational skills and basic knowledge.', nsqfLevel: 3, status: 'completed', credits: 40, actualCompletion: '2024-02-15' },
          { id: '2', title: 'Level 4: Intermediate', description: 'Operational knowledge in familiar context.', nsqfLevel: 4, status: 'completed', credits: 40, actualCompletion: '2024-04-10' },
          { id: '3', title: 'Level 5: Advance Certificate', description: 'Specialized technical skill and theoretical knowledge.', nsqfLevel: 5, status: 'current', credits: 60, expectedCompletion: '2024-06-30' },
          { id: '4', title: 'Level 6: Professional', description: 'Command of wide-ranging cognitive and practical skills.', nsqfLevel: 6, status: 'pending', credits: 60 },
        ];
        setMilestones(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [pathwayId]);

  const calculateProgress = () => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-amber-500 animate-pulse" />;
      default:
        return <Lock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusStyles = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-emerald-200 bg-emerald-50/50';
      case 'current':
        return 'border-amber-200 bg-amber-50/50 ring-2 ring-amber-100';
      default:
        return 'border-slate-200 bg-slate-50/30 opacity-75';
    }
  };

  if (loading && milestones.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">NSQF Milestone Tracker</h2>
          <p className="text-slate-500 text-sm mt-1">Project SIH 25199 - Enterprise Qualification Framework</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="text-right">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</span>
            <span className="text-2xl font-bold text-indigo-600">{calculateProgress()}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 -z-0 hidden md:block"></div>

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.id} 
              className={`relative z-10 flex flex-col md:flex-row gap-4 p-5 rounded-lg border transition-all duration-200 ${getStatusStyles(milestone.status)}`}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-inherit">
                {getStatusIcon(milestone.status)}
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{milestone.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 uppercase">
                    NSQF Level {milestone.nsqfLevel}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-3 max-w-2xl">{milestone.description}</p>
                
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    Credits: {milestone.credits}
                  </div>
                  {milestone.actualCompletion && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      Completed: {new Date(milestone.actualCompletion).toLocaleDateString()}
                    </div>
                  )}
                  {milestone.status === 'current' && milestone.expectedCompletion && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                      Target: {new Date(milestone.expectedCompletion).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center justify-end">
                {milestone.status === 'current' ? (
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
                    Continue Learning
                  </button>
                ) : milestone.status === 'completed' ? (
                  <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-semibold">
                    View Certificate <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-slate-400 text-sm italic font-medium flex items-center gap-1">
                    Locked <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 p-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
        <p>Enterprise Compliance: May 18 Release Build</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> Completed</span>
          <span className="flex items-center gap-1"><Circle className="w-2 h-2 fill-amber-500 text-amber-500" /> In Progress</span>
          <span className="flex items-center gap-1"><Circle className="w-2 h-2 fill-slate-300 text-slate-300" /> Locked</span>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;