import { useMemo } from "react";
import { Point } from "./useJoiningPoints";

interface Connection {
  from: Point;
  to: Point;
}

export const useFunctionConnections = (points: { [key: string]: Point }, functions: any[]) => {
  const connections = useMemo(() => {
    const result: Connection[] = [];

    if (points["input"] && points["function-1-input"]) {
      result.push({ from: points["input"], to: points["function-1-input"] });
    }

    functions.forEach((func) => {
      if (func.nextId) {
        const fromPoint = points[`function-${func.id}-output`];
        const toPoint = points[`function-${func.nextId}-input`];

        if (fromPoint && toPoint) {
          result.push({ from: fromPoint, to: toPoint });
        }
      }
    });

    const lastFunction = functions.find((f) => !f.nextId);
    if (lastFunction && points[`function-${lastFunction.id}-output`] && points["output"]) {
      result.push({ from: points[`function-${lastFunction.id}-output`], to: points["output"] });
    }

    return result;
  }, [points, functions]);

  return connections;
};
