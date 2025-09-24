import { create } from 'zustand';

interface navState {
  toggleMenu: any;
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useNavStore = create<navState>()((set) => ({
  isOpen: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
