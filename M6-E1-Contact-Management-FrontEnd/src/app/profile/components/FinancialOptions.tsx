import OptionButton from "@/components/fragments/Buttons/OptionButton";
import { MovementIcon } from "@/components/icons/MovementIcon";
import { ToReceive } from "@/components/icons/ToReceive";

interface FinancialButtonProps {
  selectedOption: (option: string, state: boolean) => void;
  options: Record<string, boolean>;
  onOptionClick: (optionContent: React.ReactNode) => void;
  setSelectedOptionContent: React.ReactNode | null;
}

const Financial: React.FC<FinancialButtonProps> = ({
  selectedOption,
  options,
  onOptionClick,
}) => {
  return (
    <div className="flex flex-col w-[100%] gap-1">
      <OptionButton
        optionKey="A Receber"
        Icons={ToReceive}
        selectedOption={selectedOption}
        options={options}
        text="A Receber"
        textContext="A Receber"
        onOptionClick={() => onOptionClick("")}
      />
       
    </div>
  );
};


export default Financial;
