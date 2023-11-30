import Link from "next/link";
import "./styles.buttonNavRegister.css";

interface IButtonNavPage{
  text: string,
  herf: string,
  option: string
}

export const ButtonNavPage: React.FC<IButtonNavPage> = ({ text, herf, option }) => {
  return (
    <div className="navRegister">
      <p>{text}</p>
      <Link href={herf}>{option}</Link>
    </div>
  );
};
