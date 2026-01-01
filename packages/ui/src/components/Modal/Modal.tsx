import React, { useEffect } from 'react';
import { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const sizeMap: Record<string, string> = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full mx-4 ${sizeMap[size]}`}>
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          <button onClick={onClose} aria-label="Close" className="ml-4 text-slate-500 hover:bg-slate-100 rounded-md p-2">
            ×
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto text-slate-700">{children}</div>
        {footer && <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
