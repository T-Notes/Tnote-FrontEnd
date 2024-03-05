import { atom } from 'recoil';

export const scheduleIdState = atom({
  key: 'scheduleIdState',
  default: {
    scheduleId: '',
  },
});
