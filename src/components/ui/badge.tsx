import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'destructive';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  const variants: Record<string, string> = {
    default: 'bg-gray-200 text-gray-900',
    primary: 'bg-aria-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-900',
    destructive: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    outline: 'border border-gray-300 text-gray-900',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

Badge.displayName = 'Badge';

export default Badge;
