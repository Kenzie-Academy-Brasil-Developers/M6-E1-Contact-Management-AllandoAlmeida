import React from "react";
import { StyledButtonNav } from "./styles";

export interface ButtonNavProps {
  text: string;
  width?: string;
  height?: string;
  background?: string;
  textcolor?: string;
  hover?: string;
  type?: "button" | "submit" | "reset";
  styles?: React.CSSProperties; // Adicionando a propriedade styles
  onClick?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void> | (() => void);
  disabled?: boolean;
}

export const ButtonNav: React.FC<ButtonNavProps> = ({
  text,
  width,
  height,
  background,
  textcolor,
  onClick,
  hover,
  type = "button", // Definindo "button" como valor padrão
  styles,
  ...rest
}) => {
  return (
    <StyledButtonNav
      type={type}
      width={width}
      height={height}
      background={`var(--${background})`}
      textcolor={`var(--${textcolor})`}
      onClick={onClick}
      hover={`var(--${hover})`}
      style={styles} // Usando style em vez de styles
      {...rest}
    >
      {text}
    </StyledButtonNav>
  );
};
