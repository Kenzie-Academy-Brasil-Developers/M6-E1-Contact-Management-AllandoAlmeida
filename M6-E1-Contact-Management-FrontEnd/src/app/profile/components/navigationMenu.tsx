/* import PanelTitle from "@/components/PanelTitle";
import { SelectedMenuButton } from "@/components/fragments/Buttons/SelectedMenuButton";
import { CardProfile } from "@/components/Cards/CardProfile";
import { IndicationsIcon } from "@/components/icons/IndicationsIcon";
import Financial from "./FinancialOptions";
import MyDataPanel from "@/components/fragments/HouseIcon";
import FinancialIcon from "@/components/icons/FinancialIcon";
import IndicationsOptions from "./IndicationsOptions";

interface MenuNavigationProps {
  handleMenuSelect: (menu: string) => void;
  selectedMenu: string | null;
  options: Record<string, boolean>;
  setSelectedOption: (option: string, state: boolean) => void;
  handleIndicateClick: (optionContent: React.ReactNode) => void;
  handleFinancialClick: (optionContent: React.ReactNode) => void;
  setSelectedOptionContent: React.ReactNode;
  profileData: 

}

export const NavigationMenu: React.FC<MenuNavigationProps> = ({
  handleMenuSelect,
  selectedMenu,
  options,
  setSelectedOption,
  handleIndicateClick,
  setSelectedOptionContent,
  handleFinancialClick,
  profileData,

}) => {
  return (
    <aside className="">
      <PanelTitle />
      
      <div className="flex flex-col items-start h-[18rem] my-2 gap-1 border-b-2  border-white-500">
        <SelectedMenuButton
          handleMenuSelect={handleMenuSelect}
          Icons={IndicationsIcon}
          menuValue="Contatos"
          textContent="Contatos"
        />

        {selectedMenu === "Contatos" && (
          <IndicationsOptions
            selectedOption={setSelectedOption}
            options={options}
            onOptionClick={handleIndicateClick}
            setSelectedOptionContent={setSelectedOptionContent}
          />
        )}

        <SelectedMenuButton
          handleMenuSelect={handleMenuSelect}
          Icons={FinancialIcon}
          menuValue="Finances"
          textContent="Financeiro"
        />

        {selectedMenu === "Finances" && (
          <Financial
            selectedOption={setSelectedOption}
            options={options}
            onOptionClick={handleFinancialClick}
            setSelectedOptionContent={setSelectedOptionContent}
          />
        )}
      </div>
      <MyDataPanel />
    </aside>
  );
};
 */