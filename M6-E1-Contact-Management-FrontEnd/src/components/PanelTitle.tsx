import { MenuIndicationsIcon } from "./icons/MenuIndicationsIcon";

const PanelTitle = () => {
  return (
    <div className="flex flex-row justify-evenly items-center mt-1 h-[3rem] gap-2 border-b-2  border-white-500">
      <MenuIndicationsIcon/>
      <span className="text-[0.75rem] text-white font-roboto">
        Painel do Indicador
      </span>
    </div>
  );
};

export default PanelTitle;
