import { atom } from 'recoil';

export const isCheckedState = atom<boolean>({
  key: 'isCheckedState',
  default: false,
});

export const lastClassState = atom<string>({
  key: 'lastClassState',
  default: '',
});

export const semesterNameState = atom<string>({
  key: 'semesterNameState',
  default: '',
});

export const userDataId = atom<number | null>({
  key: 'userDataId',
  default: null,
});
