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

const SLabel = styled.label`
  ${({ theme }) => theme.fonts.button1}
`;

const SInput = styled(Input)`
  margin-top: 20px;
`;

const SCancel = styled(Button)`
  width: 270px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SSubmit = styled(Button)`
  width: 270px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
  // 다른 필요한 속성들도 추가할 수 있습니다.
}

const UserInfoForm = () => {
  const { id } = useParams();
  const [schoolName, setSchoolName] = useState<string | null>('');
  const [userName, setUserName] = useState<string>('최윤지'); // 하드 코딩된 부분
  const [userData, setUserData] = useState<UserDataProps>({
    schoolName: '',
    subject: '',
    career: '',
    alarm: true,
  });

  const { isOpen, openModal, closeModal } = useModal();

  // 자식 컴포넌트의 searchInput 값 받아오는 함수
  const handleSubmit = (searchInput: string) => {
    closeModal();
    setSchoolName(searchInput);
  };

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
    <>
      <SLabel htmlFor="userName">이름</SLabel>
      <SInput placeholder="이름을 입력해주세요" value={userName} readOnly />

      {/* 과목 폼 */}
      <SLabel htmlFor="subject">과목</SLabel>
      <UserSubjectForm userData={userData} setUserData={setUserData} />

      {/* 연차 폼*/}
      <SLabel htmlFor="seniority">연차</SLabel>
      <UserCareerForm userData={userData} setUserData={setUserData} />
      {/* 학교 폼*/}
      <SLabel htmlFor="school">학교</SLabel>
      <div>
        <IcSearch />
        <SInput
          placeholder="학교를 입력해주세요"
          onClick={openModal}
          readOnly
          value={schoolName || ''}
        ></SInput>
        {isOpen && (
          <UserSchoolForm
            isOpen={isOpen}
            onRequestClose={closeModal}
            onClickSubmit={handleSubmit}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </div>
      <Link to="/">
        <SCancel>취소</SCancel>
      </Link>
      <SSubmit onClick={handleUserInfoSubmit}>확인</SSubmit>
    </>
  );
};

export default UserInfoForm;
