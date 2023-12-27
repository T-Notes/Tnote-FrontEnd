// atoms/modalState.ts
import { atom } from 'recoil';

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    isOpen: false,
    content: null,
  },
});

export const toggleModalState = atom<boolean>({
  key: 'toggleModalState',
  default: false,
});
