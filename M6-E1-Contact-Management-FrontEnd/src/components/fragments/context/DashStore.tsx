import { create } from "zustand";

interface IDashControl {
  setSelectedOption: (option: string, state: boolean) => void;
  options: Record<string, boolean>;
}

const useDashStore = create<IDashControl>((set) => ({
  options: {},

  setSelectedOption: (option: string, state: boolean) =>
    set((prevState) => ({
      options: {
        ...prevState.options,
        [option]: state,
      },
    })),
}));

export default useDashStore;
