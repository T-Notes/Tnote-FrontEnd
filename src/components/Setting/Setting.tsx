import SettingData from './SettingData';

import {
  ModalLayout,
  ModalBackground,
} from '../../components/common/styled/ModalLayout';
import instanceAxios from '../../utils/InstanceAxios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Setting = () => {
  const [email, setEmail] = useState<string>('');

  // 임시 더미데이터
  const data = {
    id: 1,
    email: 'j9972@naver.com',
    name: '정수영',
    school: '신갈고등학교',
    subject: '체육',
    career: 2,
    alarm: true,
  };
  useEffect(() => {
    const getEmail = async () => {
      try {
        await instanceAxios.get('/tnote/user/mail').then((res) => {
          setEmail(res.data.email);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getEmail();
  }, []);

  const handleLogout = () => {
    try {
      instanceAxios.post('/tnote/user/logout').then((res) => {
        console.log('로그아웃 성공!');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccount = () => {
    try {
      instanceAxios.delete('/tnote/user', {
        data: {
          email: email,
        },
      });
    } catch (err) {
      console.log('err', err);
    }
  };
  // onUpdate={() => {}}
  // 고민 사항 1. 모달위에 모달이 페이지 형식으로 겹쳐지는게 가능..?
  return (
    <ModalBackground>
      <ModalLayout>
        <SettingData
          email={data.email}
          name={data.name}
          career={data.career}
          subject={data.subject}
          alarm={data.alarm}
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
          onUpdate={() => {}}
        />
      </ModalLayout>
    </ModalBackground>
  );
};
export default Setting;
