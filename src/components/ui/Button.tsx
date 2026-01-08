import React from 'react';
import { ButtonProps } from '../../types/portfolio';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 rounded-full';
  
  const variantClasses = {
    primary: 'bg-black text-white hover:scale-[1.02] active:scale-95 shadow-2xl',
    secondary: 'bg-white border-2 border-black text-black hover:bg-black hover:text-white',
    outline: 'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-xs',
    md: 'px-10 py-5 text-sm',
    lg: 'px-12 py-6 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;