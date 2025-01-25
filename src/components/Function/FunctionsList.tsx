import FunctionCard from "./FunctionCard";

interface FunctionsListProps {
  functions: any[];
  onEquationChange: (id: number, newEquation: string) => void;
  updatePoint: (key: string, position: { x: number; y: number }) => void;
}

const FunctionsList: React.FC<FunctionsListProps> = ({ functions, onEquationChange, updatePoint }) => {
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
          onInputPositionUpdate={(position) => updatePoint(`function-${func.id}-input`, position)}
          onOutputPositionUpdate={(position) => updatePoint(`function-${func.id}-output`, position)}
        />
      ))}
    </div>
  );
};

export default FunctionsList;
