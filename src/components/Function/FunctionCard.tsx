import {useState} from 'react';
import JoiningPoint from '../../common/JoiningPoint';
import FunctionDropdown from './FunctionDropdown';
import DragIcon from '../../assets/drag-icon.svg'
import { validator } from '../../utils/validator';

interface FunctionCardProps {
  id: number;
  equation: string;
  nextFunction: number | null;
  functions: { id: number; equation: string; nextId: number | null }[];
  onEquationChange: (id: number, newValue: string | number | null) => void;
  onInputPositionUpdate?: (position: { x: number; y: number }) => void;
  onOutputPositionUpdate?: (position: { x: number; y: number }) => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  onEquationChange,
  nextFunction,
  functions,
  onInputPositionUpdate,
  onOutputPositionUpdate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleEquationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newValue = e.target.value;
      const validationError = validator(newValue);

      if (validationError) {
        setError(validationError);
      } else {
        setError(null);
        onEquationChange(id, newValue);
      }
      
    } catch (err) {
      console.error('Error in handleEquationChange:', err);
      setError('An unexpected error occurred.');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm px-[20px] py-[15px] w-[235px] h-[251px] flex flex-col gap-4 border border-[#dfdfdf]">
      <div className="flex items-center gap-2">
        <img src={DragIcon} alt="Drag Icon" />
        <span className="font-sm font-semibold text-[#A5A5A5]">Function {id}</span>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#252525] mb-1">
            Equation
          </label>
          <input
            type="text"
            value={equation}
            onChange={handleEquationChange}
            className="w-full h-[33px] px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring focus:ring-indigo-100"
            placeholder="Enter equation..."
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#252525] mb-1">
            Next Function
          </label>
          <FunctionDropdown
            id={id}
            nextFunction={nextFunction}
            functions={functions}
            onEquationChange={(id, newNextFunction) =>
              onEquationChange(id, newNextFunction)
            }
            disabled
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <JoiningPoint
          title="input"
          titlePosition="end"
          onPositionUpdate={onInputPositionUpdate}
        />
        <JoiningPoint
          title="output"
          titlePosition="start"
          onPositionUpdate={onOutputPositionUpdate}
        />
      </div>
    </div>
  );
};

export default FunctionCard;
