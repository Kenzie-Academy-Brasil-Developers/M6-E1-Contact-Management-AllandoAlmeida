import React from "react";
import "../Buttons/styles/styles.buttonAccess.css";
import "../Buttons/styles/styles.buttonCreate.css";

interface IButtonToAccess {
  text: string;
  width: string | undefined
  height?: string;
  background?: string;
  textcolor?: string;
  hover?: string;
  type?: "button" | "submit" | "reset";
  styles?: string | React.CSSProperties;
  onClick?:
    | ((
        e?: React.BaseSyntheticEvent<object, any, any> | undefined
      ) => Promise<void>)
    | (() => void);
  disabled?: boolean;
}

export const ButtonToAccess: React.FC<IButtonToAccess> = ({
  type,
  styles,
  text,
  width,
  height,
  background,
  textcolor,
  hover,
  ...rest
}) => {
  return (
    <button
      className={`${styles}`}
      width={width}
      height={height}
      background={`var(--${background})`}
      textcolor={`var(--${textcolor})`}
      hover={`var(--${hover})`}
      {...rest}
    >
      {text}
    </button>
  );
};
