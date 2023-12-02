import React from "react";

interface OptionButtonProps {
  optionKey: string;
  text: string;
  Icons?: React.ReactNode | (() => JSX.Element);
  IconsString?: string;
  selectedOption: (option: string, state: boolean) => void;
  options: Record<string, boolean>;
  textContext: string;
  onOptionClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  optionKey,
  selectedOption,
  Icons,
  options,
  textContext,
  onOptionClick,
}) => {
  return (
    <>
      <button
        className="w-[100%] h-[2.5rem] rounded-md text-[0.70rem] text-white bg-transparent hover:text-pinkFocus focus:text-pinkFocus font-roboto font-medium leading-7"
        onClick={() => {
          selectedOption(optionKey, !options[optionKey]);
          onOptionClick();
        }}
      >
        <span className="flex pl-4 gap-2 items-center justify-start font-roboto text-[16px] font-normal leading-[22.4px]">
          {typeof Icons === "string" ? (
            <span>{Icons}</span>
          ) : (
            Icons && (typeof Icons === "function" ? Icons() : Icons)
          )}
          {textContext}
        </span>
      </button>
      {options[optionKey] && <div></div>}
    </>
  );
};

export default OptionButton;
