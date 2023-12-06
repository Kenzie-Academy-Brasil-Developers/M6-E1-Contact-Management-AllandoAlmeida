interface IFooterProps {
  login: boolean;
}

export const Footer: React.FC<IFooterProps> = ({ login }) => {
  return (
    <footer
      className={
        login ? "md:fixed bottom-0 w-full h-footer " : "w-full h-footer "
      }
    >
      <div className="w-full h-1 bg-[#252525]"></div>
      <div className="container py-7 mx-auto flex h-footer justify-center pl-2 ">
        <h2 className="text-center">
          Todos os direitos reservados - Alando Almeida
        </h2>
      </div>
    </footer>
  );
};
