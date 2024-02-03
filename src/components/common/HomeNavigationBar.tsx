import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataId } from '../../utils/lib/atom';

import { IcLogo, IcProfile } from '../../assets/icons';
import { getUserInfo } from '../../utils/lib/api';
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

const HomeNavigationBar = () => {
  const { id } = useParams();
  // const id = useRecoilValue(userDataId); //고민1: 서버에 넘겨줄 유저 아이디를 어디서 받아와야할까?
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

  // 렌더링 되자마자 회원정보 가져오기
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserInfo(id);
        setEmail(response.email);
        setName(response.name);
      } catch {}
    };
    getUserData();
  }, []);

  return (
    <SLeftSidebar>
      <IcLogo />
      <Link to="/home/:id">
        <div>홈화면</div>
      </Link>

      {/* 아카이브 이동 라우팅 만들기 */}
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

export default HomeNavigationBar;
