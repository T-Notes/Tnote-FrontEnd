import { atom } from 'recoil';

export const startDateState = atom<Date>({
  key: 'startDateState',
  default: new Date(),
});

export const endDateState = atom<Date>({
  key: 'endDateState',
  default: new Date(),
});
