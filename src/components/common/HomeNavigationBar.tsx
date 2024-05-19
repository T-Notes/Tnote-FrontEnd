import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  IcArchive,
  IcHome,
  IcLogo,
  IcNavigationClose,
  IcNavigationOpen,
  IcProfile,
  IcTimetable,
} from '../../assets/icons';
import { getUserInfo } from '../../utils/lib/api';
import Setting from '../Setting/Setting';
import WriteDropdownList from '../Write/WriteDropdownList';
import ClassLogModal from '../Write/ClassLogModal';
import WorkLogModal from '../Write/WorkLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import { useModals } from '../../utils/useHooks/useModals';

//** styled **//
const SLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.blue400};
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #ccc;
  .active {
    background-color: #f0ebff;
  }
`;
const SHomeCategoryGroup = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
`;
const SCategory = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 35px;
  cursor: pointer;
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
  padding: 8px;
`;
const SUserProfile = styled.div`
  width: 140px;
  height: auto;
  cursor: pointer;

  margin-left: 5px;
  overflow-wrap: break-word;
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
const SWriteBtn = styled.div`
  width: 130px;
  height: 40px;
  margin-left: 30px;
  padding: 8px 20px 8px 24px;
  background-color: #632cfa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  opacity: 1;
  position: relative;
`;
const SDropdownIcon = styled.div`
  margin-left: auto;
`;

const HomeNavigationBar = () => {
  const { scheduleId } = useParams();
  const userId = localStorage.getItem('userId');
  const { openModal } = useModals();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

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

  const dropdownToggle = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleClickOpenModal = (openModalName: string) => {
    if (openModalName === '학급일지') {
      openModal(ClassLogModal, {
        handleClickOpenModal,
        scheduleId,
      });
    } else if (openModalName === '업무일지') {
      openModal(WorkLogModal, { handleClickOpenModal, scheduleId });
    } else if (openModalName === '상담기록') {
      openModal(ConsultationRecordsModal, { handleClickOpenModal, scheduleId });
    } else if (openModalName === '학생 관찰 일지') {
      openModal(StudentRecordsModal, { handleClickOpenModal, scheduleId });
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

        <SWriteBtn onClick={dropdownToggle} className="pointer">
          글쓰기
          <SDropdownIcon>
            {isDropdown ? <IcNavigationClose /> : <IcNavigationOpen />}
          </SDropdownIcon>
          {isDropdown && (
            <WriteDropdownList onClickOpenModal={handleClickOpenModal} />
          )}
        </SWriteBtn>
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
