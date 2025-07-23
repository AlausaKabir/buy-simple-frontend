import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  const checkboxClasses = `h-4 w-4 text-purple-700 focus:ring-purple-500 border-gray-300 rounded ${className}`.trim();
  
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={checkboxClasses}
        {...props}
      />
      {label && (
        <label className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;