import { FormContacts } from "@/app/contacts/formContacts/FormContacts";
import OptionButton from "@/components/fragments/Buttons/OptionButton";

interface IndicationsOptionsButtonProps {
  selectedOption: (option: string, state: boolean) => void;
  options: Record<string, boolean>;
  onOptionClick: (optionContent: React.ReactNode) => void;
  setSelectedOptionContent: React.ReactNode;
}

const IndicationsOptions: React.FC<IndicationsOptionsButtonProps> = ({
  selectedOption,
  options,
  onOptionClick,
}) => {
  return (
    <div className="flex flex-col w-[100%] gap-1">
      <OptionButton
        optionKey="Cadastrar"
        Icons={"C"}
        selectedOption={selectedOption}
        options={options}
        text="Cadastrar"
        textContext={"Cadastrar"}
        onOptionClick={() => onOptionClick(<FormContacts/>)}
      />
        </div>
      );
    };
    
    export default IndicationsOptions;
      {/* <OptionButton
        optionKey="Alterar"
        Icons={"P"}
        selectedOption={selectedOption}
        options={options}
        text="Alterar"
        textContext={"Alterar"}
        onOptionClick={() => onOptionClick(<IndicicationsDetails/>)}
      />
      <OptionButton
        optionKey="Deletar"
        Icons={"A"}
        selectedOption={selectedOption}
        
        options={options}
        text="Deletar"
        textContext={"Deletar"}
        onOptionClick={() => onOptionClick(<IndicicationsDetails/>)}
      /> */}
