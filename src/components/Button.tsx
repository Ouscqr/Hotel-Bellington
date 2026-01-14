import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging classes (even without Tailwind, it handles conflicts well if we used utilities)
// Since we are using custom CSS, we can just use clsx, but keeping twMerge pattern is fine for future proofing
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    
    // Base styles defined here or in CSS. 
    // For now, I'll use inline styles or utility classes if I had them.
    // Since I'm using vanilla CSS variables, I'll use a mix of style objects and class names
    // But to keep it clean, I should probably define these in a CSS file or use style objects.
    // Let's use a CSS module approach or just a BEM-like class structure.
    
    // Base styles are handled by the 'btn' class in CSS
    
    // Mapping variants to styles (using standard Tailwind classes for now as placeholders or I need to define them in index.css)
    // WAIT. I am NOT using Tailwind. I should not use Tailwind classes unless I installed it.
    // I did NOT install Tailwind. I installed `tailwind-merge` but that doesn't give me styles.
    // I should use my own CSS classes defined in index.css or a new component css.
    // Let's create a `components.css` or add to `index.css`.
    // For now, I will add a `btn` class to `index.css` and use that.
    
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          `btn-${variant}`,
          `btn-${size}`,
          fullWidth && 'btn-full',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
