import React from "react";

interface SelectedMenuButtonProps {
  handleMenuSelect: (menu: string) => void;
  Icons: React.FC;
  menuValue: string; 
  textContent: React.ReactNode;
}

export const SelectedMenuButton: React.FC<SelectedMenuButtonProps> = ({ handleMenuSelect, Icons, menuValue, textContent }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleMenuSelect(menuValue);
  };

  return (
    <button
    onClick={handleClick}
    className="w-[100%] h-[2.5rem] rounded-md text-sm text-white bg-optionsMenu border-0 px-3"
  >
    {" "}
    <span className="flex gap-2 items-center justify-start">
      <Icons />
      <span className="font-roboto text-base md:text-sm lg:text-md xl:text-md font-medium leading-6">
        {textContent}
      </span>
    </span>
  </button>
  );
};
