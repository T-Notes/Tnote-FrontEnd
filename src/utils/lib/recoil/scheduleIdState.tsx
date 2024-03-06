import { atom } from 'recoil';

export const scheduleIdState = atom<string | undefined>({
  key: 'scheduleIdState',
  default: '',
});
