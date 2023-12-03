// buttonNavPage.tsx
import Link from "next/link";
import "../Buttons/styles/styles.buttonNavRegister.css";
import { ReactNode } from "react"; // Adicione essa importação

interface IButtonNavPage {
  text: string;
  herf: string;
  option: ReactNode; // Modifique o tipo para ReactNode
  onClick: () => void;
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
