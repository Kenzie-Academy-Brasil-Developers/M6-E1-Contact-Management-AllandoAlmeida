// buttonNavPage.tsx
import Link from "next/link";
import "../Buttons/styles/styles.buttonNavRegister.css";
import { ReactNode } from "react";

interface IButtonNavPage {
  text?: string;
  herf: string;
  option?: ReactNode;
  onClick?: () => void;
}

export const ButtonNavPage: React.FC<IButtonNavPage> = ({ text, herf, option, onClick, ...rest }) => {
  return (
    <div className="navRegister">
      <p>{text}</p>
      <Link href={herf} onClick={onClick} {...rest}>
        {option}
      </Link>
    </div>
  );
};
