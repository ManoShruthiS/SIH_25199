import React from 'react';
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string, size?: string }>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-slate-900 text-white hover:bg-slate-800 ${size === 'sm' ? 'h-8 px-3' : 'h-10 py-2 px-4'} ${className}`} {...props} />

));
Button.displayName = "Button";
