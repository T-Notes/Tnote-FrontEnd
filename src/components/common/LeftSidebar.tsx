import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataId } from '../../utils/lib/atom';

import styled from 'styled-components';
import { IcLogo, IcProfile } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import Setting from '../Setting/Setting';
import { useToggle } from '../../utils/useHooks/useToggle';

//** styled **//
const SLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16rem;
  height: 100vh;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.blue400};
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 0; /* 맨 왼쪽에 고정 */
  border-right: 1px solid #ccc; /* 우측에 경계선 추가 (선택사항) */
`;

const LeftSidebar = () => {
  const id = useRecoilValue(userDataId);
  const { isToggle, handleChangeToggle } = useToggle();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  //임시더미데이터
  const data = {
    id: 1,
    email: 'j9972@naver.com',
    name: '정수영',
    school: '신갈고등학교',
    subject: '체육',
    career: 2,
    alarm: true,
  };
  // 배포 후 연동하기
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       await instanceAxios.get(`/tnote/user/${id}`).then((res) => {
  //         setEmail(res.data.email);
  //         setName(res.data.name);
  //       });
  //     } catch (err) {
  //       console.log('err', err);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <SLeftSidebar>
      <IcLogo />
      <Link to="/home">
        <div>홈화면</div>
      </Link>

      <div>아카이브</div>
      <Link to="/timetable/:id">
        <div>시간표</div>
      </Link>

      <div onClick={handleChangeToggle}>
        <IcProfile />
        {`${data.name} 선생님`}
        <br />
        {data.email}
      </div>
      {isToggle && <Setting />}
    </SLeftSidebar>
  );
};

export default LeftSidebar;
