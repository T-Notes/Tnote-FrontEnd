import { atom } from 'recoil';

export const userDataId = atom<number | null>({
  key: 'userDataId',
  default: null,
});

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}
export const logModalState = atom<ModalState>({
  key: 'logModalState',
  default: {
    isOpen: false,
    content: null,
  },
});
