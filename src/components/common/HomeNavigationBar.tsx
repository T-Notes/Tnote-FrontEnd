import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  IcArchive,
  IcHome,
  IcLogo,
  IcProfile,
  IcSetting,
  IcTimetable,
} from '../../assets/icons';
import { getUserInfo } from '../../utils/lib/api';
import Setting from '../Setting/Setting';
import { useModals } from '../../utils/useHooks/useModals';

const SLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 13.54vw;
  height: 100vh;
  border-right: 1px solid #ccc;
  background-color: #f7f9fc;
  .active {
    background-color: #f0ebff;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
const SHomeCategoryGroup = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 17px;
`;
const SCategory = styled.div`
  display: flex;
  align-items: center;
  top: 90px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: calc(13.5%);
  padding-right: 0px;
  gap: 10px;
  opacity: 0px;
`;
const SLogo = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: calc(13.5%);
  padding-right: 25px;

  @media (min-width: 1440px) {
    svg {
      width: 146px;
      height: 40px;
    }
  }
`;
const SCategoryText = styled.div`
  font-family: Inter;
  font-size: 1rem;
  font-weight: 500;
  line-height: 19.36px;
  text-align: left;
  color: #666666;
  cursor: pointer;
`;
const SUserProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  height: 83px;
  padding-left: calc(6.5%);
  padding-right: calc(6.5%);
  gap: 6px;
  border-top: 1px solid #d5d5d5;

  @media (min-width: 768px) and (max-width: 1023px) {
    svg {
      max-width: 42px;
      max-height: 42px;
    }
  }
`;
const SUserProfile = styled.div`
  width: 8vw;
  cursor: pointer;
`;
const SUserName = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  text-align: left;
  color: #444444;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SUserEmail = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  text-align: left;
  color: #5b5b5b;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SProfileContainer = styled.div`
  width: 42px;
  max-height: 42px;
`;

const HomeNavigationBar = () => {
  const { scheduleId } = useParams();
  const currentUrl = location.pathname;
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const openSettingModal = () => {
    setIsOpenSetting(true);
  };

  const closeSettingModal = () => {
    setIsOpenSetting(false);
  };

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

  const handleClickRoute = () => {
    if (scheduleId) {
      if (currentUrl.includes('home')) {
        navigate(`/semesterSetup/home/${scheduleId}`);
      } else if (currentUrl.includes('timetable')) {
        navigate(`/semesterSetup/timetable/${scheduleId}`);
      } else if (currentUrl.includes('archive')) {
        navigate(`/semesterSetup/archive/${scheduleId}`);
      }
    }
    if (!scheduleId) {
      if (currentUrl.includes('home')) {
        navigate(`/semesterSetup/home`);
      } else if (currentUrl.includes('timetable')) {
        navigate(`/semesterSetup/timetable`);
      } else if (currentUrl.includes('archive')) {
        navigate(`/semesterSetup/archive`);
      }
    }
  };

  return (
    <>
      <SLeftSidebar>
        <SHomeCategoryGroup>
          <SLogo>
            <IcLogo />
          </SLogo>
          <>
            <Link to={scheduleId ? `/home/${scheduleId}` : '/home'}>
              <SCategory
                className={
                  location.pathname ===
                  (scheduleId ? `/home/${scheduleId}` : '/home')
                    ? 'active'
                    : ''
                }
              >
                <IcHome />
                <SCategoryText>홈화면</SCategoryText>
              </SCategory>
            </Link>

            <Link to={scheduleId ? `/archive/${scheduleId}` : '/archive'}>
              <SCategory
                className={
                  location.pathname ===
                  (scheduleId ? `/archive/${scheduleId}` : '/archive')
                    ? 'active'
                    : ''
                }
              >
                <IcArchive />
                <SCategoryText>아카이브</SCategoryText>
              </SCategory>
            </Link>
            <Link to={scheduleId ? `/timetable/${scheduleId}` : '/timetable'}>
              <SCategory
                className={
                  location.pathname ===
                  (scheduleId ? `/timetable/${scheduleId}` : '/timetable')
                    ? 'active'
                    : ''
                }
              >
                <IcTimetable />
                <SCategoryText>시간표</SCategoryText>
              </SCategory>
            </Link>
          </>
        </SHomeCategoryGroup>

        <SCategory
          onClick={handleClickRoute}
          className={
            location.pathname ===
            (scheduleId ? `/semesterSetup/${scheduleId}` : '/semesterSetup')
              ? 'active'
              : ''
          }
        >
          <IcSetting />
          <SCategoryText> 학기 설정</SCategoryText>
        </SCategory>
        <SUserProfileInfoWrapper>
          <SProfileContainer>
            <IcProfile />
          </SProfileContainer>
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
