import React from 'react';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition transform disabled:opacity-60';

  const sizeMap: Record<string, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantMap: Record<string, string> = {
    primary: 'bg-sgx-blue-500 text-white hover:bg-blue-600 shadow-sm',
    secondary: 'bg-sgx-purple-500 text-sgx-white border border-slate-200 hover:bg-slate-50',
    danger: 'bg-sgx-red-500 text-white hover:bg-red-600 shadow-sm',
    success: 'bg-sgx-green-500 text-white hover:bg-green-600 shadow-sm',
  };

  const classes = [
    base,
    sizeMap[size] ?? sizeMap.medium,
    variantMap[variant] ?? variantMap.primary,
    fullWidth ? 'w-full' : 'inline-block',
    loading ? 'pointer-events-none opacity-80' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
