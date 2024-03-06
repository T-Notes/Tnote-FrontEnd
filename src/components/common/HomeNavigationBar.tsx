import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataId } from '../../utils/lib/atom';
import { userDataState } from '../../utils/lib/recoil/userDataState';
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
  width: 200px;
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
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const SCategoryText = styled.div`
  ${({ theme }) => theme.fonts.category};
  color: ${({ theme }) => theme.colors.gray400};
  margin-left: 3px;
`;
const SUserProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 83px;
  border: none;
  border-top: 1px solid #d5d5d5;
  position: fixed;
  bottom: 0;
  padding: 15px;
`;
const SUserProfile = styled.div`
  margin-left: 3px;
  cursor: pointer;
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
  const { scheduleId } = useParams();
  const userId = localStorage.getItem('userId');
  const { isToggle, handleChangeToggle } = useToggle();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const openSettingModal = () => {
    setIsOpenSetting(true);
  };

  const closeSettingModal = () => {
    setIsOpenSetting(false);
  };
  // 렌더링 되자마자 회원정보 가져오기
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserInfo(userId);
        setEmail(response.data.email);
        setName(response.data.name);
      } catch {}
    };
    getUserData();
  }, []);

  return (
    <>
      <SLeftSidebar>
        <SLogo>
          <IcLogo />
        </SLogo>
        <>
          <Link to={scheduleId ? `/home/${scheduleId}` : '/home'}>
            <SCategory>
              <IcHome />
              <SCategoryText>홈화면</SCategoryText>
            </SCategory>
          </Link>

          {/* 아카이브 이동 라우팅 변경하기 */}
          <Link to="/home">
            <SCategory>
              <IcArchive />
              <SCategoryText>아카이브</SCategoryText>
            </SCategory>
          </Link>
          <Link to={scheduleId ? `/timetable/${scheduleId}` : '/timetable'}>
            <SCategory>
              <IcTimetable />
              <SCategoryText>시간표</SCategoryText>
            </SCategory>
          </Link>
        </>
        <SUserProfileInfoWrapper>
          <IcProfile />
          <SUserProfile>
            <SUserName onClick={openSettingModal}>
              {`${name} 선생님`}
              <SUserEmail>{email}</SUserEmail>
            </SUserName>
          </SUserProfile>
        </SUserProfileInfoWrapper>
      </SLeftSidebar>
      {isOpenSetting && <Setting closeSettingModal={closeSettingModal} />}
    </>
  );
};

export default HomeNavigationBar;
