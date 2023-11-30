import useFormStore from "@/context/useFormStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../logo/logo";


const Header1 = () => {
 const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { setIsOpenFormModal } = useFormStore();

  const handleOpenFormModal = () => {
    setIsOpenFormModal(true);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  useEffect(() => {
    const handleEscKey = (event: { key: string; }) => {
      if (event.key === "Escape" && mobileMenuVisible) {
        setMobileMenuVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [mobileMenuVisible]);


  return (
    <header className="h-24 font-normal m-0 p-0 font-inherit text-inherit no-underline outline-none border-0 box-border block top-0 left-0 right-0 fixed  backdrop-blur z-50 bg-brancoHeader  shadow-md flex ">
      <div className="container mx-auto px-8 flex justify-between items-center ">
        <Link href="/">
          <Logo/>
        </Link>
        <nav className="hidden custom-lg:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/como-funciona"
                className="text-TextosEscurosEBg hover:text-verde transition duration-300"
              >
                Entenda como funciona
              </Link>
            </li>
            <li>
              <Link
                href="https://registre.se/blog"
                className="text-TextosEscurosEBg hover:text-verde transition duration-300"
              >
                Fique bem informado
              </Link>
            </li>
            <li>
              <Link
                href="https://registre.se/fale-com-especialista"
                className="text-TextosEscurosEBg hover:text-verde transition duration-300"
              >
                Entre em contato
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleOpenFormModal}
          className="h-12 justify-center w-60 items-center hidden custom-lg:flex text-azul hover:text-azulHover font-bold text-uppercase text-center no-underline  bg-none border-2 border-azul py-1 px-4 rounded-full transition duration-700 ease-in-out hover:border-azulHover hover:scale-110 gap-2 group items-center"
        >
          QUERO CONSULTAR
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="28"
            viewBox="0 0 155 154"
            className="transition duration-700 ease-in-out fill-azul group-hover:fill-azulHover"
          >
            <path d="M77.5 0C62.1691 5.46968e-06 47.1827 4.51759 34.4365 12.9813C21.6903 21.4451 11.7569 33.4748 5.89302 47.5485C0.0291622 61.6222 -1.50167 77.1076 1.49401 92.046C4.48969 106.984 11.8774 120.704 22.7225 131.47C33.5676 142.236 47.3829 149.565 62.4208 152.528C77.4586 155.492 93.0434 153.958 107.203 148.12C121.364 142.282 133.463 132.403 141.971 119.731C150.479 107.06 155.013 92.1665 155 76.9346C154.983 56.5242 146.81 36.9559 132.278 22.5297C117.745 8.10353 98.0429 -7.3292e-06 77.5 0ZM77.5 140.884C64.7699 140.884 52.3257 137.133 41.741 130.106C31.1563 123.08 22.9066 113.092 18.0351 101.407C13.1635 89.7218 11.8888 76.8638 14.3723 64.4589C16.8559 52.054 22.986 40.6593 31.9875 31.7159C40.989 22.7724 52.4577 16.6817 64.9431 14.2142C77.4286 11.7467 90.3701 13.0132 102.131 17.8533C113.892 22.6935 123.945 30.89 131.017 41.4064C138.089 51.9228 141.864 64.2867 141.864 76.9346C141.847 93.8897 135.06 110.145 122.993 122.134C110.926 134.124 94.5651 140.867 77.5 140.884ZM79.0763 39.5441H49.5868V70.7356H65.3495V55.205H79.0763C83.3057 55.2086 87.3783 56.7956 90.4823 59.6498C93.5864 62.5041 95.4937 66.4157 95.8241 70.6049H111.587C111.185 62.2821 107.593 54.4277 101.548 48.6521C95.5025 42.8766 87.4625 39.6178 79.0763 39.5441ZM79.0763 81.6982H49.5868V112.824H65.3495V97.2941H79.0763C83.3057 97.2977 87.3783 98.8847 90.4823 101.739C93.5864 104.593 95.4937 108.505 95.8241 112.694H111.587C111.168 104.383 107.569 96.5444 101.526 90.7826C95.4825 85.0208 87.4517 81.7711 79.0763 81.6982Z" />
          </svg>
        </button>
        <div className="custom-lg:hidden">
          <div
            className={`hamburger-icon ${
              mobileMenuVisible ? "open" : ""
            } p-2 text-azul hover:text-azulHover`}
            onClick={toggleMobileMenu}
          >
            <div className="line w-10 h-0.5 bg-verde mt-2 mb-2"></div>
            <div className="line w-10 h-0.5 bg-verde mt-2 mb-2"></div>
            <div className="line w-10 h-0.5 bg-verde mt-2 mb-2"></div>
          </div>
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="bg-branco backdrop-blur fixed  z-50 flex w-full h-screen items-center justify-center  flex-col p-8">
          <div className="p-8">
            <Image
              src="/logo.svg"
              alt="Registre.se"
              className="absolute top-4 left-4  w-auto h-10 mx-4"
              onClick={() => setMobileMenuVisible(false)}
              width={200} // Defina a largura desejada para a imagem
              height={50} // Defina a altura desejada para a imagem
            />
            <button
              onClick={() => toggleMobileMenu()} // Substitua closeMobileMenu pela função que fecha o menu
              className="text-verde text-3xl absolute top-4 right-4 cursor-pointer"
            >
              X
            </button>
          </div>
          <nav className="menu-content text-white p-8 space-y-4  w-full">
            <ul className="flex flex-col text-center gap-1">
              <li>
                <Link
                  href="/como-funciona"
                  className="text-TextosEscurosEBg hover:text-verde transition duration-300"
                >
                  Entenda como funciona
                </Link>
              </li>
              <li>
                <Link
                  href="https://registre.se/blog"
                  className="text-TextosEscurosEBg hover:text-verde transition duration-300"
                >
                  Fique bem informado
                </Link>
              </li>
              <li>
                <Link
                  href="https://registre.se/fale-com-especialista"
                  className="text-TextosEscurosEBg hover:text-verde transition duration-300"
                >
                  Entre em contato
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            href="#"
            className="h-12 w-full text-azul hover:text-azulHover font-bold text-uppercase no-underline bg-none border-2 border-azul py-1 px-4 rounded-full transition duration-700 ease-in-out hover:border-azulHover flex items-center justify-center"
          >
            QUERO CONSULTAR
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
