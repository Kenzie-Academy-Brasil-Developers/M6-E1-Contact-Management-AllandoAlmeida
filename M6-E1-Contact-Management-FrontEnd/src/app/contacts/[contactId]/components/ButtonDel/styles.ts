import styled, { CSSProperties } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hover?: CSSProperties["backgroundColor"];
  textcolor?: CSSProperties["color"];
  background?: CSSProperties["backgroundColor"];
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
}

export const StyledButtonNav = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "4.8rem"};

  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2.8rem;

  border-radius: 0.4rem;

  background-color: ${(props) =>
    props.background || "var(--default-background-color)"};
  color: ${(props) => props.textcolor || "var(--default-text-color)"};

  &:hover {
    background-color: ${(props) =>
      props.hover || "var(--default-hover-background-color)"};
  }
`;
