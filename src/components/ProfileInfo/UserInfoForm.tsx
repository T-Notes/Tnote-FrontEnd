import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import { useModal } from '../../utils/useHooks/useModal';
import { updateUserInfo } from '../../utils/lib/api';

import { IcSearch } from '../../assets/icons';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';

import UserSubjectForm from './UserSubjectForm';
import UserCareerForm from './UserCareerForm';
import UserSchoolForm from './UserSchoolForm';

const SFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SLabel = styled.label`
  margin-right: 32.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fonts.button1}
`;

const SCancel = styled(Button)`
  width: 16.875rem;
  height: 3rem;
  margin-right: 10px;
  ${({ theme }) => theme.fonts.button1};
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SSubmit = styled(Button)`
  width: 16.875rem;
  height: 3rem;
  ${({ theme }) => theme.fonts.button1};
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SInputGroup = styled.div`
  position: relative;
  display: inline-block;
`;
const SIcon = styled.div`
  position: absolute;
  right: 1rem; /* 아이콘의 왼쪽 위치 조정 */
  top: 55%;
  transform: translateY(-50%);
`;

const SButtonGroup = styled.div`
  display: flex;
  margin-top: 3rem;

  @media (max-height: 768px) {
    margin-top: 1rem;
  }
`;
interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
}

const UserInfoForm = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState<string>('최윤지'); // 하드 코딩된 부분
  const [userData, setUserData] = useState<UserDataProps>({
    schoolName: '',
    subject: '',
    career: '',
    alarm: true,
  });

  const { isOpen, openModal, closeModal } = useModal();

  // 자식 컴포넌트에서 유저가 선택한 학교명 받아오는 함수
  // const handleSubmit = (searchInput: string) => {
  //   closeModal();
  //   setUserData((prevData) => ({ ...prevData, schoolName: searchInput }));
  // };
  console.log('1번째 부모컴포넌트:', userData.schoolName);
  useEffect(() => {
    const getUserName = async () => {
      try {
        await instanceAxios.get(`/tnote/user/${id}`).then((res) => {
          setUserName(res.data.name);
        });
      } catch (err) {
        console.log('유저의 이름정보를 가져오는데 실패했습니다.', err);
      }
    };
    getUserName();
  }, []);

  // 회원 추가 정보 작성 폼 전송
  const handleUserInfoSubmit = async () => {
    try {
      const updatedUserData = {
        schoolName: userData.schoolName,
        subject: userData.subject,
        career: userData.career,
        alarm: userData.alarm,
      };
      await updateUserInfo(id, updatedUserData);
    } catch {}
  };

  return (
    <SFormWrapper>
      <SLabel htmlFor="userName">이름</SLabel>
      <Input placeholder="이름을 입력해주세요" value={userName} readOnly />

      {/* 과목 폼 */}
      <SLabel htmlFor="subject">과목</SLabel>
      <UserSubjectForm userData={userData} setUserData={setUserData} />

      {/* 연차 폼*/}
      <SLabel htmlFor="seniority">연차</SLabel>
      <UserCareerForm userData={userData} setUserData={setUserData} />
      {/* 학교 폼*/}
      <SLabel htmlFor="school">학교</SLabel>
      <div>
        <SInputGroup>
          <SIcon>
            <IcSearch />
          </SIcon>
          <Input
            placeholder="학교를 입력해주세요"
            onClick={openModal}
            readOnly
            value={userData.schoolName || ''}
          />
        </SInputGroup>
        {isOpen && (
          <UserSchoolForm
            isOpen={isOpen}
            onRequestClose={closeModal}
            // onClickSubmit={handleSubmit}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </div>
      <SButtonGroup>
        <Link to="/">
          <SCancel>취소</SCancel>
        </Link>
        <SSubmit onClick={handleUserInfoSubmit}>확인</SSubmit>
      </SButtonGroup>
    </SFormWrapper>
  );
};

export default UserInfoForm;
