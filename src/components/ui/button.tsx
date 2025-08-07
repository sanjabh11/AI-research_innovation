import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none';
    const variants: Record<string, string> = {
      primary: 'bg-aria-blue-600 text-white hover:bg-aria-blue-700',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
      ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
      default: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    };

    const sizes: Record<string, string> = {
      sm: 'px-2 h-8 text-xs',
      md: 'px-4 h-10',
      lg: 'px-6 h-12 text-lg',
      icon: 'p-2 h-10 w-10'
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
