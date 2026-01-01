import React from 'react';
import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const wrapperClass = fullWidth ? 'w-full' : 'inline-block';
  const inputBase = 'w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none';
  const inputError = 'border-red-500 focus:ring-2 focus:ring-red-200';
  const inputNormal = 'border-slate-200 focus:ring-2 focus:ring-blue-100';

  return (
    <div className={`${wrapperClass} ${className}`}>
      {label && <label className="block mb-2 text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{leftIcon}</span>}
        <input
          className={`${inputBase} ${error ? inputError : inputNormal} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{rightIcon}</span>}
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : (
        helperText && <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
