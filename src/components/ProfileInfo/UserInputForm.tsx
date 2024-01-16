import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../common/styled/Input';

import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';
import SubjectDropdownList from './SubjectDropdownList';
import SchoolSearchModal from './SchoolSearchModal';

const SLabel = styled.label`
  ${({ theme }) => theme.fonts.button1}
`;

const SInput = styled(Input)`
  margin-top: 20px;
`;

const UserInputForm = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isOption, setIsOption] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserInput, setIsUserInput] = useState<boolean>(false);

  const [selectedSchool, setSelectedSchool] = useState<string | null>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openSchoolSearchModal = () => {
    setIsModalOpen(true);
  };
  const closeSchoolSearchModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOption = (selectedOption: string) => {
    if (selectedOption !== '직접입력') {
      setIsOption(selectedOption);
      setIsUserInput(false);
    } else {
      setIsUserInput(true);
      setIsOption('');
    }
    setIsDropdown(false); // 옵션 선택하면 리스트 닫기
  };

  const handleUserInputSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputSubject = e.target.value;
    setIsOption(userInputSubject);
  };

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };
  // 자식 컴포넌트의 searchInput 값 받아오는 함수
  const handleSubmit = (searchInput: string) => {
    setIsModalOpen(false);
    setSelectedSchool(searchInput);
    console.log('searchInput', searchInput);
  };
  useEffect(() => {
    if (isUserInput && inputRef.current) {
      inputRef.current.removeAttribute('readOnly');
      inputRef.current.focus();
    } else {
      inputRef.current?.setAttribute('readOnly', 'true');
    }
  }, [isUserInput]);

  return (
    <>
      <SLabel htmlFor="userName">이름</SLabel>
      <SInput placeholder="이름을 입력해주세요" readOnly />
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
          value={isOption}
          onChange={handleUserInputSubject}
          placeholder="과목을 선택해주세요"
        ></SInput>
      </div>
      {isDropdown && (
        <SubjectDropdownList onSelectedOption={handleClickOption} />
      )}

      <SLabel htmlFor="seniority">연차</SLabel>
      <SInput type="number" placeholder="연차를 입력해주세요"></SInput>
      <SLabel htmlFor="school">학교</SLabel>
      <div>
        <IcSearch />
        <SInput
          placeholder="학교를 입력해주세요"
          onClick={openSchoolSearchModal}
          readOnly
          value={selectedSchool || ''}
        ></SInput>
        {isModalOpen && (
          <SchoolSearchModal
            isOpen={isModalOpen}
            onRequestClose={closeSchoolSearchModal}
            onClickSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default UserInputForm;
