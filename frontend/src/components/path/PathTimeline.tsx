import React from 'react';
import { CheckCircle2, Lock, PlayCircle, Clock, ChevronRight } from 'lucide-react';

/**
 * SIH 25199 - PathTimeline Component
 * Release Target: May 18
 * Visualizes the hierarchical progression of courses within a learning path.
 */

export interface CourseStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  order: number;
}

interface PathTimelineProps {
  steps: CourseStep[];
  onStepClick?: (stepId: string) => void;
}

const PathTimeline: React.FC<PathTimelineProps> = ({ steps, onStepClick }) => {
  // Sort by order to ensure visual consistency regardless of API response sequence
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="relative flex flex-col space-y-8 py-6 px-2">
      {/* Main vertical connector line */}
      <div 
        className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800" 
        aria-hidden="true" 
      />

      {sortedSteps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        const isLocked = step.status === 'locked';

        return (
          <div key={step.id} className="relative flex items-start group">
            {/* Timeline Marker Indicator */}
            <div className="flex h-12 w-12 items-center justify-center shrink-0">
              <div className={`
                relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
                ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : ''}
                ${isCurrent ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none scale-110 ring-4 ring-blue-50 dark:ring-blue-900/20' : ''}
                ${isLocked ? 'bg-slate-50 border-slate-300 text-slate-400 dark:bg-slate-900 dark:border-slate-700' : ''}
              `}>
                {isCompleted && <CheckCircle2 className="h-6 w-6" />}
                {isCurrent && <PlayCircle className="h-6 w-6 animate-pulse" />}
                {isLocked && <Lock className="h-5 w-5" />}
              </div>
            </div>

            {/* Course Content Card */}
            <div 
              className={`
                ml-8 flex-1 rounded-2xl border p-6 transition-all duration-200 transform
                ${isCurrent 
                  ? 'border-blue-300 bg-white dark:bg-slate-900 shadow-md ring-1 ring-blue-100 dark:ring-blue-900/30' 
                  : 'border-slate-200 bg-white/80 dark:bg-slate-900/50 dark:border-slate-800 shadow-sm'
                }
                ${!isLocked ? 'cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-0.5' : 'opacity-80 grayscale-[0.5]'}
              `}
              onClick={() => !isLocked && onStepClick?.(step.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Step {step.order + 1}
                  </span>
                  <h3 className={`font-bold text-lg leading-tight ${isLocked ? 'text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                    {step.title}
                  </h3>
                </div>
                
                <div className="flex items-center h-fit text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {step.duration}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {step.description}
              </p>

              {isCurrent && (
                <div className="mt-5 flex items-center">
                  <button className="group/btn inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
                    Resume Module
                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {isLocked && (
                <div className="mt-4 flex items-center text-xs font-medium text-slate-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    Complete previous steps to unlock
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Completion Marker (End of Path) */}
      <div className="relative flex items-center pl-4">
        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-slate-400" />
        </div>
        <span className="ml-10 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Path End
        </span>
      </div>
    </div>
  );
};

export default PathTimeline;