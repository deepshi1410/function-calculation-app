import { useMemo } from "react";
import { evaluateEquation } from "../utils/evaluateEquation";

export const useOutputCalculator = (
  inputValue: number | null,
  functions: any[]
) => {
  const finalOutput = useMemo(() => {
    // If inputValue is null, return null directly
    if (inputValue === null) return null;

    // currentValue is now always a number
    let currentValue: number | null = inputValue;
    let currentFuncId = 1;

    while (currentFuncId) {
      const func = functions.find((f) => f.id === currentFuncId);
      if (!func) break;

      try {
        currentValue = evaluateEquation(func.equation, currentValue);
        currentFuncId = func.nextId || 0;
      } catch (error) {
        console.error(`Error evaluating function ${currentFuncId}:`, error);
        break;
      }
    }

    return currentValue;
  }, [inputValue, functions]);

  return finalOutput;
};
