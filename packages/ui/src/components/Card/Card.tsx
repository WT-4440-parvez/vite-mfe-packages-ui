import React from 'react';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  hoverable = false,
  bordered = true,
  className = '',
  ...props
}) => {
  const base = 'bg-white rounded-xl overflow-hidden';
  const borderedClass = bordered ? 'border border-slate-200 shadow-sm' : '';
  const hoverClass = hoverable ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer transition' : '';

  const classes = [base, borderedClass, hoverClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {(title || subtitle) && (
        <div className="px-5 py-4 border-b border-slate-100">
          {title && <h3 className="m-0 text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-5 text-slate-700">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">{footer}</div>}
    </div>
  );
};

export default Card;
