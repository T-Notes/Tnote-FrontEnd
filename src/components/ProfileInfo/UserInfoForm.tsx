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
import SearchInput from '../common/SearchInput';

const SFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SLabel = styled.label`
  margin-right: 520px;
  margin-top: 20px;
  margin-bottom: 10px;
  ${({ theme }) => theme.fonts.caption}
`;

const SCancel = styled(Button)`
  width: 270px;
  height: 50px;
  margin-right: 10px;
  ${({ theme }) => theme.fonts.caption};
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SSubmit = styled(Button)`
  width: 270px;
  height: 50px;
  ${({ theme }) => theme.fonts.caption};
  background-color: ${({ theme }) => theme.colors.gray200};
`;
const SSearchWrapper = styled.div`
  display: flex;
  width: 550px;
  height: 50px;
  align-items: center;
  z-index: 1;
  opacity: 1;
  border-radius: 8px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;
const SSearchInput = styled.input`
  width: 200px;
  padding-left: 10px;
  ${({ theme }) => theme.fonts.caption}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;

const SButtonGroup = styled.div`
  display: flex;
  margin-top: 40px;
`;
export interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
}

const UserInfoForm = () => {
  const { id } = useParams();
  const userId = localStorage.getItem('userId'); // 로컬스토리지에 담긴 UserId 받아오기

  const [userName, setUserName] = useState<string>(''); // 하드 코딩된 부분
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

  // 로그인된 유저 정보 렌더링 되자마자 가져오기
  useEffect(() => {
    if (userId) {
      const getUserName = async () => {
        try {
          await instanceAxios.get(`/tnote/user/${userId}`).then((res) => {
            const userData = res.data.data;
            console.log('res', userData.name);
            setUserName(userData.name);
          });
        } catch (err) {
          console.log('유저의 이름정보를 가져오는데 실패했습니다.', err);
        }
      };
      getUserName();
    }
  }, [userId]);

  // 회원 추가 정보 작성 폼 전송
  const handleUserInfoSubmit = async () => {
    try {
      const updatedUserData = {
        schoolName: userData.schoolName,
        subject: userData.subject,
        career: userData.career,
        alarm: userData.alarm,
      };
      await updateUserInfo(userId, updatedUserData);
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
        <SSearchWrapper>
          <IcSearch />
          <SSearchInput
            placeholder="학교를 입력해주세요"
            onClick={openModal}
            readOnly
            value={userData.schoolName || ''}
          />
        </SSearchWrapper>

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
