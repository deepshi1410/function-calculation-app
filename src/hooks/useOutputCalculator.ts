import { useMemo } from "react";
import { evaluateEquation } from "../utils/evaluateEquation";

export const useOutputCalculator = (inputValue: number, functions: any[]) => {
  const finalOutput = useMemo(() => {
    let currentValue = inputValue;
    let currentFuncId = 1;

    while (currentFuncId) {
      const func = functions.find((f) => f.id === currentFuncId);
      if (!func) break;

      try {
        currentValue = evaluateEquation(func.equation, currentValue) ?? 0;
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
