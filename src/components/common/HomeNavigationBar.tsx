import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataId } from '../../utils/lib/atom';

import {
  IcArchive,
  IcHome,
  IcLogo,
  IcProfile,
  IcTimetable,
} from '../../assets/icons';
import { getUserInfo } from '../../utils/lib/api';
import Setting from '../Setting/Setting';
import { useToggle } from '../../utils/useHooks/useToggle';

//** styled **//
const SLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 220px;
  height: 100vh;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.blue400};
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 0; /* 맨 왼쪽에 고정 */
  border-right: 1px solid #ccc; /* 우측에 경계선 추가 (선택사항) */
`;
const SCategory = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 35px;
  cursor: pointer;
  &:hover {
    background-color: #f0ebff;
  }
`;
const SLogo = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 25px;
  padding-bottom: 25px;
`;
const SCategoryText = styled.div`
  ${({ theme }) => theme.fonts.category};
  color: ${({ theme }) => theme.colors.gray400};
  margin-left: 3px;
`;
const SUserProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 83px;
  border: none;
  border-top: 1px solid #d5d5d5;
  position: fixed;
  bottom: 0;
  padding: 15px;
`;
const SUserProfile = styled.div`
  margin-left: 3px;
`;
const SUserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
`;
const SUserEmail = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray800};
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
      <SLogo>
        <IcLogo />
      </SLogo>
      <>
        <SCategory>
          <IcHome />
          <Link to="/home/:id">
            <SCategoryText>홈화면</SCategoryText>
          </Link>
        </SCategory>

        {/* 아카이브 이동 라우팅 만들기 */}
        <SCategory>
          <IcArchive />
          <SCategoryText>아카이브</SCategoryText>
        </SCategory>
        <SCategory>
          <IcTimetable />
          <Link to="/timetable/:id">
            <SCategoryText>시간표</SCategoryText>
          </Link>
        </SCategory>
      </>
      <SUserProfileInfoWrapper>
        <IcProfile />
        <SUserProfile>
          <SUserName onClick={handleChangeToggle}>
            {`${data.name} 선생님`}
            <SUserEmail>{data.email}</SUserEmail>
          </SUserName>
        </SUserProfile>

        {isToggle && <Setting />}
      </SUserProfileInfoWrapper>
    </SLeftSidebar>
  );
};

export default HomeNavigationBar;
