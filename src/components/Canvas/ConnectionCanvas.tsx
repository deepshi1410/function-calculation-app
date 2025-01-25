import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

interface Connection {
  from: Point;
  to: Point;
}

interface ConnectionCanvasProps {
  connections: Connection[];
  width: number;
  height: number;
}

const ConnectionCanvas: React.FC<ConnectionCanvasProps> = ({
  connections,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get current scroll offsets
    // const scrollX = window.scrollX;
    // const scrollY = window.scrollY;

    // Draw each connection as a smooth Bézier curve
    connections.forEach(({ from, to }) => {
      // Adjust points to include scroll offsets
      const adjustedFromX = from.x;
      const adjustedFromY = from.y;
      const adjustedToX = to.x;
      const adjustedToY = to.y;

      // Control points for Bézier curve
      const controlPointX1 = adjustedFromX + 120; // Control point near the source
      const controlPointX2 = adjustedToX - 140; // Control point near the target

      ctx.beginPath();
      ctx.moveTo(adjustedFromX, adjustedFromY);
      ctx.bezierCurveTo(
        controlPointX1,
        adjustedFromY,
        controlPointX2,
        adjustedToY,
        adjustedToX,
        adjustedToY
      );
      ctx.strokeStyle = "#0066FF4D"; // Curve color
      ctx.lineWidth = 7;
      ctx.stroke();

      // Log the adjusted points for debugging
      console.log(
        `Drawing line from [${adjustedFromX}, ${adjustedFromY}] to [${adjustedToX}, ${adjustedToY}]`
      );
    });
  }, [connections, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
};

export default ConnectionCanvas;
