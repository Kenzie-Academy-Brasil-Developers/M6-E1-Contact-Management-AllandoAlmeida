"use client";
import { ButtonNav } from "../Buttons/buttonNav/ButtonNav";
import { Logo } from "../logo/logo";

export const Header = async () => {
  return (
    <header className="h-24 font-normal m-0 p-0 font-inherit text-inherit no-underline outline-none border-0 box-border top-0 left-0 right-0 fixed  backdrop-blur z-50 bg-brancoHeader  shadow-md flex ">
      <nav className="w-[80%] m-auto flex justify-evenly border-2 border-black">
        <ul className="w-1/3 flex  border-2 border-black">
          <Logo />
        </ul>

        <ul className="w-1/3 flex  border-2 border-black">
          <ButtonNav
            text={"Inscrever"}
            href={"/register"}
            width=""
            textSize={"0.5rem"}
          />

          <ButtonNav text={"Contatos"} href={"/register"} textSize={"1rem"} />
        </ul>
        <ul className="w-1/3 flex  border-2 border-black">
          <ButtonNav text={"Logout"} href={"/"} textSize={"1rem"} />
        </ul>
      </nav>
    </header>
  );
};
