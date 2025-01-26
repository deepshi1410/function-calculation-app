import JoiningPoint from '../../common/JoiningPoint';

interface InputOutputProps {
  text: string;
  value: number;
  isDisabled?: boolean;
  onChange: (value: number) => void;
  align: "start" | "end";
  backgroundColor: string;
  borderColor: string;
  onPositionUpdate?: (position: { x: number; y: number }) => void;
}

const InputOutput: React.FC<InputOutputProps> = ({
  text,
  value,
  onChange,
  backgroundColor,
  borderColor,
  align,
  isDisabled = false,
  onPositionUpdate
}) => {
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
          type="number"
          value={value}
          disabled={isDisabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-full focus:outline-none font-bold text-lg bg-transparent px-3 ${
            align === "end" ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
};

export default InputOutput;