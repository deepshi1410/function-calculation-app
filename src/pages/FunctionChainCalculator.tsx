import { useState, useEffect, useRef } from "react";
import { useJoiningPoints } from "../hooks/useJoiningPoints";
import { useFunctionConnections } from "../hooks/useFunctionConnections";
import { useOutputCalculator } from "../hooks/useOutputCalculator";
import InputOutput from "../components/Function/InputOutput";
import FunctionsList from "../components/Function/FunctionsList";
import ConnectionCanvas from "../components/Canvas/ConnectionCanvas";

const initialFunctions = [
  { id: 1, equation: "x^2", outputValue: null, nextId: 2 },
  { id: 2, equation: "2x + 4", outputValue: null, nextId: 4 },
  { id: 3, equation: "x^2 + 20", outputValue: null, nextId: null },
  { id: 4, equation: "x - 2", outputValue: null, nextId: 5 },
  { id: 5, equation: "x / 2", outputValue: null, nextId: 3 },
];

function FunctionChainCalculator() {
  const [functions, setFunctions] = useState(initialFunctions);
  const [inputValue, setInputValue] = useState<number>(2);
  const { points, updatePoint } = useJoiningPoints();
  const connections = useFunctionConnections(points, functions);
  const finalOutput = useOutputCalculator(inputValue, functions);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();

     // Listen to window resize
     window.addEventListener("resize", updateSize);
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    }
  }, []);

  const handleEquationChange = (id: number, newEquation: string) => {
    setFunctions((prevFunctions) =>
      prevFunctions.map((func) =>
        func.id === id ? { ...func, equation: newEquation } : func
      )
    );
  };

  const handleNextFunctionChange = (id: number, newNextFunction: number | null) => {
    setFunctions((prevFunctions) =>
      prevFunctions.map((func) =>
        func.id === id ? { ...func, nextId: newNextFunction } : func
      )
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen dotted-background w-full relative">
      <ConnectionCanvas connections={connections} width={containerSize.width} height={containerSize.height} />
      <div className="p-24 flex justify-between items-start relative z-10 gap-2">
        <InputOutput
          value={inputValue}
          onChange={setInputValue}
          text="Initial value of x"
          align="start"
          backgroundColor="#e29a2d"
          borderColor="#ffc267"
          onPositionUpdate={(position) => updatePoint("input", position)}
        />
        <FunctionsList
          functions={functions}
          onEquationChange={handleEquationChange}
          updatePoint={updatePoint}
          onNextFunctionChange={handleNextFunctionChange}
        />
        <InputOutput
          value={finalOutput}
          onChange={() => {}}
          text="Final Output y"
          align="end"
          backgroundColor="#4CAF79"
          borderColor="#2DD179"
          isDisabled
          onPositionUpdate={(position) => updatePoint("output", position)}
        />
      </div>
    </div>
  );
}

export default FunctionChainCalculator;
