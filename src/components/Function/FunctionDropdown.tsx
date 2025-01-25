import React from 'react';

interface FunctionDropdownProps {
  id: number;
  nextFunction: number | null;
  functions: { id: number; nextId: number | null }[];
  disabled?: boolean;
  onEquationChange: (id: number, newNextFunction: number | null) => void;
}

const FunctionDropdown: React.FC<FunctionDropdownProps> = ({
  id,
  nextFunction,
  functions,
  disabled = false,
  onEquationChange,
}) => {
  return (
    <div className="mb-2">
      <select
        value={nextFunction || ''}
        onChange={(e) => {
          const newNextFunction = e.target.value ? parseInt(e.target.value) : null;
          onEquationChange(id, newNextFunction);
        }}
        disabled={disabled}
        className={`w-full h-[33px] px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring focus:ring-indigo-100 ${
          disabled ? 'bg-[#f5f5f5] text-[#b7b7b7]' : 'bg-white'
        }`}>
        <option value="">-</option>
        {functions
          .filter((f) => f.id !== id)
          .map((f) => (
            <option key={f.id} value={f.id}>
              Function {f.id}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FunctionDropdown;
