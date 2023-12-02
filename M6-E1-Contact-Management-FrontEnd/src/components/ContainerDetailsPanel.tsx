
interface ContainerDetailsPanelProps {
  selectedOptionContent: React.ReactNode;
}

export const ContainerDetailsPanel: React.FC<ContainerDetailsPanelProps> = ({
  selectedOptionContent,
}) => {
  return (
    <section className="flex flex-col w-[75%] h-[39rem] gap-3">
      <HeaderTitleDash />
      <div className="box-shadow-custom rounded-[12px] mt-[1rem]">
        <div className="h-[20rem] border-2 mx-[2rem] my-[1rem]">
          {selectedOptionContent}
        </div>
       <CardIndications/>
      </div>
    </section>
  );
};
