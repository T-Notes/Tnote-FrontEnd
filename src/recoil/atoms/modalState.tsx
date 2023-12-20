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
