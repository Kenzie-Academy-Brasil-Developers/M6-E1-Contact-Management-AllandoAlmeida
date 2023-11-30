import React from "react";

interface IButton {
  type: string;
  className: string;
  onClick: () => void;
  text: string;
  children?: React.ReactNode; // Adicione esta linha
}

export const ButtonNav: React.FC<IButton> = ({ text , className, onClick }) => {
  const combinedClassName = `${className || ""} custom-button`;

  return (
    <button className={combinedClassName} onClick={onClick}>
      {text}
    </button>
  );
};
