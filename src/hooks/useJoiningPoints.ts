import { useState } from "react";

interface Point {
  x: number;
  y: number;
}

export const useJoiningPoints = () => {
  const [points, setPoints] = useState<{ [key: string]: Point }>({});

  const updatePoint = (key: string, position: Point) => {
    setPoints((prev) => {
      if (JSON.stringify(prev[key]) === JSON.stringify(position)) {
        return prev;
      }
      return { ...prev, [key]: position };
    });
  };

  return { points, updatePoint };
};
