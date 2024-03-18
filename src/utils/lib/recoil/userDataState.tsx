import { atom } from 'recoil';

interface userDataStateProps {
  name: string;
  email: string;
  school: string;
  subject: string;
  career: string;
}
export const userDataState = atom<userDataStateProps>({
  key: 'userDataState',
  default: {
    name: '',
    email: '',
    school: '',
    subject: '',
    career: '',
  },
});
