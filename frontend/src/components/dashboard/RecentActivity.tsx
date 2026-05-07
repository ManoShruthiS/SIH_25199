import React from 'react';
import { 
  UserPlus, 
  Settings, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';

/**
 * Activity Interface
 * Defines the structure for event logs within the SIH 25199 dashboard.
 */
export interface Activity {
  id: string;
  type: 'user_registration' | 'system_update' | 'document_upload' | 'security_alert' | 'task_completed';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  status?: 'success' | 'pending' | 'failed';
}

interface RecentActivityProps {
  activities?: Activity[];
  limit?: number;
  className?: string;
}

/**
 * Maps activity types to specific UI icons and color schemes.
 */
const getActivityStyles = (type: Activity['type']) => {
  switch (type) {
    case 'user_registration':
      return {
        icon: <UserPlus className="h-4 w-4" />,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100'
      };
    case 'system_update':
      return {
        icon: <Settings className="h-4 w-4" />,
        color: 'text-slate-600',
        bg: 'bg-slate-50',
        border: 'border-slate-100'
      };
    case 'document_upload':
      return {
        icon: <FileText className="h-4 w-4" />,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100'
      };
    case 'security_alert':
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100'
      };
    case 'task_completed':
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100'
      };
    default:
      return {
        icon: <Clock className="h-4 w-4" />,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-100'
      };
  }
};

/**
 * RecentActivity Component
 * Renders a vertical timeline of system and user events.
 * Optimized for the May 18 enterprise portal release.
 */
const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities = [], 
  limit = 5,
  className = ""
}) => {
  const displayActivities = activities.slice(0, limit);

  if (displayActivities.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
        <div className="p-3 bg-slate-50 rounded-full mb-4">
          <Clock className="h-6 w-6 text-slate-300" />
        </div>
        <p className="text-sm font-medium text-slate-900">No activity logs found</p>
        <p className="text-xs text-slate-500 mt-1">New events will appear here in real-time.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Audit Timeline</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase">
          Live Feed
        </span>
      </div>
      
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {displayActivities.map((activity, idx) => {
              const styles = getActivityStyles(activity.type);
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {idx !== displayActivities.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-100"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-4">
                      <div className="relative">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm ring-4 ring-white ${styles.bg} ${styles.color} ${styles.border}`}>
                          {styles.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {activity.title}
                            </p>
                          </div>
                          <div className="text-right text-[11px] font-medium text-slate-400 tabular-nums">
                            {activity.timestamp}
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {activity.description}
                            {activity.user && (
                              <span className="ml-1 inline-flex items-center font-medium text-slate-900">
                                • {activity.user}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="mt-6 border-t border-slate-50 pt-4">
          <button
            type="button"
            className="group flex w-full items-center justify-center space-x-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all duration-200"
          >
            <span>ACCESS SYSTEM LOGS</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;