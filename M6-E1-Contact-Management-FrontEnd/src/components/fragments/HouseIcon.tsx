import { MyDataIcon } from "../icons/MyDataIcon";


const MyDataPanel = () => {
  return (
    <button className="flex items-center justify-center gap-2 mt-1 rounded-md  bg-optionsMenu text-[0.75rem] text-white hover:bg-gray-600 focus: h-[2.75rem]">
      <MyDataIcon />
      <span >Meus Dados</span>
    </button>
  );
};

export default MyDataPanel;
