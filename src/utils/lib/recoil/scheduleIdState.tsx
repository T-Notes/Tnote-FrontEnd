import { atom } from 'recoil';

interface scheduleState {
  id: string | undefined;
  name: string | undefined;
}
export const scheduleIdState = atom<scheduleState>({
  key: 'scheduleIdState',
  default: {
    id: '',
    name: '',
  },
});
