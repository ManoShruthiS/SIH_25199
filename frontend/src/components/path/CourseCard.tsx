import React from 'react';
import { Clock, BookOpen, Star, User, ChevronRight } from 'lucide-react';

/**
 * SIH 25199 Enterprise Portal
 * Component: CourseCard
 * Description: Modular card for displaying course summary and metadata within the learning path system.
 * Release Target: May 18
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  instructorName: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  category?: string;
}

interface CourseCardProps {
  course: Course;
  onClick?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  /**
   * Helper to determine badge color based on course difficulty
   */
  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(course.id);
    }
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Media Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {course.thumbnailUrl ? (
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="w-10 h-10 text-slate-300" />
          </div>
        )}
        
        {/* Level Badge Overlay */}
        <div className="absolute top-3 right-3 shadow-sm">
          <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getLevelStyles(course.level)}`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
            {course.category || 'Core Path'}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Metadata Footer */}
        <div className="mt-auto">
          <div className="flex items-center justify-between text-slate-400 pt-3 border-t border-slate-50">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 max-w-[120px]">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium truncate">{course.instructorName}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center w-full py-2.5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-all duration-200">
            <span className="text-xs font-bold mr-1">Continue Module</span>
            <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;