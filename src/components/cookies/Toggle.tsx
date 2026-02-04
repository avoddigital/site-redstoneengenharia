import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, disabled = false }) => {
  return (
    <div className={`flex items-center justify-between py-3 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <span className="text-gray-700 font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative w-11 h-6 flex items-center rounded-full transition-colors duration-200 ease-in-out border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
          ${checked ? '!bg-primary' : 'bg-gray-200'}
        `}
      >
        <span
          className={`
            inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};

export default Toggle;
