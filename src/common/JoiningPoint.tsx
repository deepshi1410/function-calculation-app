import { useRef, useEffect, useCallback } from 'react';

interface JoiningPointProps {
  title?: string;
  titlePosition?: "start" | "end";
  onPositionUpdate?: (position: { x: number; y: number }) => void;
}

const JoiningPoint: React.FC<JoiningPointProps> = ({
  title,
  titlePosition = "end",
  onPositionUpdate
}) => {
  const pointRef = useRef<HTMLDivElement>(null);

  const getPosition = useCallback(() => {
    if (!pointRef.current) return null;
    const rect = pointRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY
    };
  }, []);

  useEffect(() => {
    if (!pointRef.current || !onPositionUpdate) return;

    const position = getPosition();
    if (position) {
      onPositionUpdate(position);
    }

    const observer = new ResizeObserver(() => {
      const newPosition = getPosition();
      if (newPosition) {
        onPositionUpdate(newPosition);
      }
    });

    observer.observe(pointRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onPositionUpdate, getPosition]);

  return (
    <div
      className={`flex items-center gap-2 ${titlePosition === "start" ? "flex-row" : "flex-row-reverse"}`}
    >
      {title && <div className="text-xs font-medium text-[#585757]">{title}</div>}
      <div className="flex items-center justify-center w-[15px] h-[15px] bg-white border-[#DBDBDB] border-[2px] rounded-full">
        <div ref={pointRef} className="bg-[#66A3FF] w-[7px] h-[7px] rounded-full"></div>
      </div>
    </div>
  );
};

export default JoiningPoint;