import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import SubjectSection from './SubjectInputSection';
import { Link } from 'react-router-dom';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';
import SchoolSearchModal from './SchoolSearchModal';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import { useModal } from '../../utils/useHooks/useModal';
import { useToggle } from '../../utils/useHooks/useToggle';

import { IcSearch } from '../../assets/icons';
import UserSubjectForm from './UserSubjectForm';

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
const UserInputForm = () => {
  const { id } = useParams();

  const [schoolName, setSchoolName] = useState<string | null>('');
  const [career, setCareer] = useState<string>('');
  const [userName, setUserName] = useState<string>('최윤지');
  // 이 값은 빼도 되지 않을까?
  const [alarm, setAlarm] = useState<boolean>(true);

  const { isOpen, openModal, closeModal } = useModal();

  // 자식 컴포넌트의 searchInput 값 받아오는 함수
  const handleSubmit = (searchInput: string) => {
    closeModal;
    setSchoolName(searchInput);
  };

  const handleCareerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(e.target.value)) {
      return;
    }

    // 숫자만 포함된 값으로 설정
    setCareer(e.target.value);
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

  const handleUserInfoSubmit = () => {
    instanceAxios.patch(`/tnote/user/${id}`, {
      schoolName,
      subject,
      career,
      alarm,
    });
  };

  return (
    <>
      <SLabel htmlFor="userName">이름</SLabel>
      <SInput placeholder="이름을 입력해주세요" value={userName} readOnly />

      {/* 과목 */}
      <SLabel htmlFor="subject">과목</SLabel>
      <UserSubjectForm />

      {/* 연차 */}
      <SLabel htmlFor="seniority">연차</SLabel>
      <SInput
        type="text"
        placeholder="연차를 입력해주세요"
        onChange={handleCareerInputChange}
        value={career}
      ></SInput>
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
          <SchoolSearchModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            onClickSubmit={handleSubmit}
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

export default UserInputForm;
