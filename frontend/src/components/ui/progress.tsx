import React from 'react';
export const Progress = ({ value, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: number }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-100 ${className}`} {...props}>
    <div className="h-full w-full flex-1 bg-slate-900 transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </div>
);
