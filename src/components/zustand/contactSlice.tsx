import { create } from 'zustand';

interface ContactModalState {
  toggleModal: any;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useContactModalStore = create<ContactModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
