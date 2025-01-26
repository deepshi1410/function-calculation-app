import FunctionCard from "./FunctionCard";

interface FunctionsListProps {
  functions: { id: number; equation: string; nextId: number | null }[];
  onEquationChange: (id: number, newEquation: string) => void;
  updatePoint: (key: string, position: { x: number; y: number }) => void;
  onNextFunctionChange: (id: number, newNextFunction: number | null) => void;
}

const FunctionsList: React.FC<FunctionsListProps> = ({ functions, onEquationChange, updatePoint, onNextFunctionChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-[130px] flex-1">
      {functions.map((func) => (
        <FunctionCard
          key={func.id}
          id={func.id}
          equation={func.equation}
          nextFunction={func.nextId}
          functions={functions}
          onEquationChange={onEquationChange}
          onNextFunctionChange={onNextFunctionChange}
          onInputPositionUpdate={(position) => updatePoint(`function-${func.id}-input`, position)}
          onOutputPositionUpdate={(position) => updatePoint(`function-${func.id}-output`, position)}
        />
      ))}
    </div>
  );
};

export default FunctionsList;
