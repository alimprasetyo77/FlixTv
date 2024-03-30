import { create } from "zustand";
interface ModalSearchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useModalSearch = create<ModalSearchStore>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));

export default useModalSearch;
