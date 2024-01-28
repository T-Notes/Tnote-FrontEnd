import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../common/styled/Input';
import { Button } from '../common/styled/Button';

import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';
import SubjectDropdownList from './SubjectDropdownList';
import SchoolSearchModal from './SchoolSearchModal';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';

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
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserInput, setIsUserInput] = useState<boolean>(false);

  const [schoolName, setSchoolName] = useState<string | null>('');
  const [career, setCareer] = useState<string>('');
  const [userName, setUserName] = useState<string>('최윤지');
  // 이 값은 빼도 되지 않을까?
  const [alarm, setAlarm] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openSchoolSearchModal = () => {
    setIsModalOpen(true);
  };
  const closeSchoolSearchModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOption = (selectedOption: string) => {
    if (selectedOption !== '직접입력') {
      setSubject(selectedOption);
      console.log('내가 선택한 과목:', selectedOption);
      setIsUserInput(false);
    } else {
      setIsUserInput(true);
      setSubject('');
    }
    setIsDropdown(false); // 옵션 선택하면 리스트 닫기
  };

  const handleUserInputSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputSubject = e.target.value;
    setSubject(userInputSubject);
  };

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };
  // 자식 컴포넌트의 searchInput 값 받아오는 함수
  const handleSubmit = (searchInput: string) => {
    setIsModalOpen(false);
    setSchoolName(searchInput);
    console.log('searchInput', searchInput);
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
    if (isUserInput && inputRef.current) {
      inputRef.current.removeAttribute('readOnly');
      inputRef.current.focus();
    } else {
      inputRef.current?.setAttribute('readOnly', 'true');
    }
  }, [isUserInput]);

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
      <SLabel htmlFor="subject">과목</SLabel>
      <div>
        {isDropdown ? (
          <IcCloseDropdown onClick={handleClickDropdown} />
        ) : (
          <IcOpenDropdown onClick={handleClickDropdown} />
        )}
        <SInput
          ref={inputRef}
          type="text"
          value={subject}
          onChange={handleUserInputSubject}
          placeholder="과목을 선택해주세요"
        ></SInput>
      </div>
      {isDropdown && (
        <SubjectDropdownList onSelectedOption={handleClickOption} />
      )}

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
          onClick={openSchoolSearchModal}
          readOnly
          value={schoolName || ''}
        ></SInput>
        {isModalOpen && (
          <SchoolSearchModal
            isOpen={isModalOpen}
            onRequestClose={closeSchoolSearchModal}
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
