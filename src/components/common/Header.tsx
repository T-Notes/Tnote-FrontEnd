import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IcLogo, IcProfile } from '../../assets/icons';
import { getUserInfo } from '../../utils/lib/api';
import Setting from '../Setting/Setting';

import ClassLogModal from '../Write/ClassLogModal';
import WorkLogModal from '../Write/WorkLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import { useModals } from '../../utils/useHooks/useModals';

const SHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid #ccc;
  background-color: #f7f9fc;
  padding: 10px 20px 10px 20px;
  gap: 20px;
  @media (max-width: 710px) {
    overflow: hidden;
    white-space: nowrap;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;

const SCategory = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const SLogo = styled.div`
  @media (min-width: 1440px) {
    svg {
      width: 146px;
      height: 40px;
    }
  }
  @media (max-width: 1024px) {
    svg {
      width: 110px;
      height: 40px;
    }
  }
`;
const SCategoryText = styled.div<{ $isCategory: boolean }>`
  font-family: Inter;
  font-size: clamp(16px, 2.2vw, 22px);
  font-weight: 500;
  text-align: left;
  color: ${(props) => (props.$isCategory ? '#632CFA' : '#666666')};
`;
const SUserProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 6px;

  @media (min-width: 768px) and (max-width: 1023px) {
    svg {
      max-width: 42px;
      max-height: 42px;
    }
  }
`;
const SUserProfile = styled.div`
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
  width: 34px;
  max-height: 34px;
`;
const SHomeCategoryGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Header = () => {
  const { scheduleId } = useParams();
  const userId = localStorage.getItem('userId');
  const { openModal } = useModals();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');

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

  const handleClickCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <>
      <SHeaderWrapper>
        <SLogo>
          <IcLogo />
        </SLogo>
        <SHomeCategoryGroup>
          <Link to={scheduleId ? `/home/${scheduleId}` : '/home'}>
            <SCategory onClick={() => handleClickCategory('home')}>
              <SCategoryText $isCategory={category === 'home'}>
                홈화면
              </SCategoryText>
            </SCategory>
          </Link>

          <Link to={scheduleId ? `/archive/${scheduleId}` : '/archive'}>
            <SCategory onClick={() => handleClickCategory('archive')}>
              <SCategoryText $isCategory={category === 'archive'}>
                아카이브
              </SCategoryText>
            </SCategory>
          </Link>
          <Link to={scheduleId ? `/timetable/${scheduleId}` : '/timetable'}>
            <SCategory onClick={() => handleClickCategory('timetable')}>
              <SCategoryText $isCategory={category === 'timetable'}>
                시간표
              </SCategoryText>
            </SCategory>
          </Link>
        </SHomeCategoryGroup>
        <Link
          to={scheduleId ? `/semesterSetup/${scheduleId}` : '/semesterSetup'}
        >
          <SCategory onClick={() => handleClickCategory('semesterSetup')}>
            <SCategoryText $isCategory={category === 'semesterSetup'}>
              학기 설정
            </SCategoryText>
          </SCategory>
        </Link>
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
      </SHeaderWrapper>
      {isOpenSetting && <Setting closeSettingModal={closeSettingModal} />}
    </>
  );
};

export default Header;
