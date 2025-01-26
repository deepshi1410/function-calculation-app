import React, { useRef, useEffect, forwardRef } from "react";
import JoiningPoint from "../../common/JoiningPoint";

interface InputOutputProps {
  text: string;
  value: number | null;
  isDisabled?: boolean;
  onChange: (value: number | null) => void; // Allow null when input is cleared
  align: "start" | "end";
  backgroundColor: string;
  borderColor: string;
  onPositionUpdate?: (position: { x: number; y: number }) => void;
}

const InputOutput = forwardRef<HTMLDivElement, InputOutputProps>(
  (
    {
      text,
      value,
      onChange,
      backgroundColor,
      borderColor,
      align,
      isDisabled = false,
      onPositionUpdate,
    },
    ref
  ) => {
    const joiningPointRef = useRef<HTMLDivElement>(null);

    const updatePosition = (position: { x: number; y: number }) => {
      if (joiningPointRef.current) {
        joiningPointRef.current.dataset.position = JSON.stringify(position);
        onPositionUpdate?.(position);
      }
    };

    useEffect(() => {
      if (joiningPointRef.current) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          joiningPointRef.current;
        const rect = joiningPointRef.current.getBoundingClientRect();
        updatePosition({ x: rect.left, y: rect.top + rect.height / 2 });
      }
    }, [ref]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.trim(); // Trim whitespace
      // Convert empty string to null, otherwise typecast to number
      onChange(inputValue === "" ? null : Number(inputValue));
    };

    return (
      <div className="flex flex-col max-w-[115px] gap-2 py-[170px]">
        <div
          className="w-full h-[22px] flex p-2 justify-center items-center rounded-[14px] text-white text-xs font-bold"
          style={{ background: backgroundColor }}
        >
          {text}
        </div>
        <div
          className="flex items-center gap-1 w-full h-[50px] px-2 border-2 rounded-[15px] bg-white"
          style={{
            borderColor,
            flexDirection: align === "end" ? "row" : "row-reverse",
          }}
        >
          <JoiningPoint onPositionUpdate={onPositionUpdate} />
          <div className={`w-[1px] h-full`} style={{ background: borderColor }}></div>
          <input
            type="text"
            value={value !== null ? value.toString() : ""}
            disabled={isDisabled}
            onChange={handleInputChange}
            className={`w-full h-full focus:outline-none font-bold text-lg bg-transparent px-3 ${
              align === "end" ? "text-right" : "text-left"
            }`}
          />
        </div>
      </div>
    );
  }
);

export default InputOutput;
