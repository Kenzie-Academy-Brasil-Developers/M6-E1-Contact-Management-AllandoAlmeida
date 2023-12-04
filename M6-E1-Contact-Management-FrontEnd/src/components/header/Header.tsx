/* eslint-disable react/jsx-no-undef */
'use client';
import Image from "next/image";
import Link from "next/link";
import { SignOutIcon } from "../icons/SignOutIcon";
import { ButtonNavPage } from "../fragments/Buttons/buttonNavPage";
import { useRouter } from "next/navigation"; 

export const Header = () => {

  const router = useRouter();

  const logout = () => {
    console.log("Chamando logout");
    localStorage.removeItem("@Management:accessToken");
    localStorage.removeItem("@Management:refreshToken");
    router.push("/signup");
  };


  return (
    <header className="h-24 font-normal m-0 p-0 font-inherit text-inherit no-underline  outline-none border-0 box-border block top-0 left-0 right-0 fixed  backdrop-blur z-50 bg-brancoHeader  shadow-md flex ">
      <div className="w-[90vw] mx-auto px-8 flex justify-between items-center ">
        <Link href={"/"}>
          <Image
            src="/logo-white.png"
            alt=""
            className="md:w-[22rem] md:h-[5rem]"
            width={100} 
            height={100}
          />
        </Link>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div>
           
            <ButtonNavPage text={""} herf={""} option={<SignOutIcon />} onClick={logout} />
          </div>
        </nav>
      </div>
    </header>
  );
};
