import { useRef, useEffect } from "react";

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

const drawSemicircularArc = (
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  depthFactor: number,
  options: {
    direction?: "up" | "down" | "left" | "right";
    strokeStyle?: string;
    lineWidth?: number;
  } = {}
) => {
  const { direction = "down", strokeStyle = "#0066FF4D", lineWidth = 7 } = options;

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  let controlPointX = midX;
  let controlPointY = midY;

  if (direction === "up") {
    controlPointY -= Math.abs(to.x - from.x) / 2 * depthFactor;
  } else if (direction === "down") {
    controlPointY += Math.abs(to.x - from.x) / 2 * depthFactor;
  } else if (direction === "left") {
    controlPointX -= Math.abs(to.y - from.y) / 2 * depthFactor;
  } else if (direction === "right") {
    controlPointX += Math.abs(to.y - from.y) / 2 * depthFactor;
  }

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(controlPointX, controlPointY, to.x, to.y);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

  const drawSineLikeCurve = (
    ctx: CanvasRenderingContext2D,
    from: Point,
    to: Point,
    options: {
      depthFactor?: number; // Controls the dip depth
      strokeStyle?: string; // Curve color
      lineWidth?: number; // Line width
    } = {}
  ) => {
    const { depthFactor = 1, strokeStyle = "#0066FF4D", lineWidth = 7 } = options;
    const distanceX = to.x - from.x;
    const distanceY = to.y - from.y;
  
    const controlPoint1 = {
      x: from.x + distanceX / 4,
      y: from.y + distanceY / 2 + Math.abs(distanceX) * depthFactor,
    };
  
    const controlPoint2 = {
      x: from.x + (3 * distanceX) / 4,
      y: from.y + distanceY / 2 - Math.abs(distanceX) * depthFactor,
    };

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      to.x,
      to.y
    );
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };
  
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    connections.forEach(({ from, to }, index) => {
      if (index === 1 || index === 3) {
        drawSemicircularArc(ctx, from, to, 0.6, {
          direction: "down"
        });
      } else if (index === 2) {
        drawSineLikeCurve(ctx, from, to, {
          depthFactor: 0.1
        });
      } else if (index === 4) {
        drawSemicircularArc(ctx, from, to, 0.5, {
          direction: "right"
        });
      } else if (index === 0 || index === 5) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = "#0066FF4D";
        ctx.lineWidth = 7;
        ctx.stroke();
      }
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
