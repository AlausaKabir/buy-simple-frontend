import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200';
  const normalClasses = 'border-gray-300 focus:ring-purple-500';
  const errorClasses = 'border-red-300 focus:ring-red-500';
  
  const inputClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;