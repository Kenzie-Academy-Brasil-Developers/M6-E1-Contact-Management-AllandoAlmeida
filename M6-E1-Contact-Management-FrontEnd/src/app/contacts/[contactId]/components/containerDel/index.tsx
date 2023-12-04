import React, { ReactNode, MouseEventHandler } from "react";
import { ButtonNav } from "../ButtonDel";
import {
  StyledContainerButton,
  StyledContainerDeleting,
} from "./styles";

interface DeletingContactProps {
  children?: ReactNode;
  trueCallback: MouseEventHandler<HTMLButtonElement>;
  falseCallback: MouseEventHandler<HTMLButtonElement>;
}

export const DeletingContact: React.FC<DeletingContactProps> = ({
  children,
  trueCallback,
  falseCallback,
}) => {
  return (
    <StyledContainerDeleting>
      {children}
      <StyledContainerButton>
        <ButtonNav
          width="9.8rem"
          height="4.8rem"
          type="submit"
          text="Sim"
          background="color-color-primary-disable"
          textcolor="color-grey-0"
          hover="color-negative"
          onClick={trueCallback}
        />
        <ButtonNav
          width="9.8rem"
          height="4.8rem"
          type="submit"
          text="Não"
          background="color-color-primary-disable"
          textcolor="color-grey-0"
          hover="color-negative"
          onClick={falseCallback}
        />
      </StyledContainerButton>
    </StyledContainerDeleting>
  );
};

