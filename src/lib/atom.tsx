import { atom } from 'recoil';

export const isCheckedState = atom<boolean>({
  key: 'isCheckedState',
  default: false,
});
