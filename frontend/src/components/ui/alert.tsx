import React from 'react';
export const Alert = ({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) => <div className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${className}`} {...props} />
export const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />
