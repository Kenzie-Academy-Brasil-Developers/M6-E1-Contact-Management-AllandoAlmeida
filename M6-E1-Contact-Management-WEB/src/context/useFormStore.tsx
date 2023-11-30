import { create } from "zustand";

interface FormStore {
  formData: { [key: string]: string };
  setFormData: (questionTitle: string, answer: string) => void;
  finishedForm: boolean;
  isOpenFormModal: boolean;
  setFinishedForm: (value: boolean) => void;
  setIsOpenFormModal: (value: boolean) => void;
}

const useFormStore = create<FormStore>((set) => ({
  formData: {},
  finishedForm: false,
  isOpenFormModal: false,
  setFormData: (questionTitle, answer) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [questionTitle]: answer,
      },
    })),
  setFinishedForm: (value) => set({ finishedForm: value }),
  setIsOpenFormModal: (value) => set({ isOpenFormModal: value }),
}));

export default useFormStore;
