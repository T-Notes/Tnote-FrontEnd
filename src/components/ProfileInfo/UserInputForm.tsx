import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../common/styled/Input';

import { IcClose, IcOpen, IcSearch } from '../../assets/icons';
import SubjectDropdownList from './SubjectDropdownList';

// 2. UserInputForm component에 4가지 인풋 목록 넣기
// 3. 드롭다운 목록 리스트는 따로 컴포넌트로 만들기.
// 주고받을 데이터: 클릭한 값 부모(이 컴포넌트)로 올려주기
const SUserInputForm = styled(Input)``;

const SLabel = styled.label`
  margin-bottom: 20px; //적용이 안됨

  ${({ theme }) => theme.fonts.button1}
`;

// 기본 값은 오픈, 아이콘 클릭시 상태값이 바뀌고 상태에 따라 보여지는 아이콘이 다름.
// 오픈이 트루일때, 드롭다운 컴포넌트를 띄울수 있도록 하기.
// 내 생각: 부모에서 해당 상태값을 쓰지 않을테니, 이 컴포넌트에서 상태관리 해도 되지 않을까?
const UserInputForm = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isOption, setIsOption] = useState<string>('');

  const [isUserInput, setIsUserInput] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickOption = (selectedOption: string) => {
    console.log('내가 선택한 옵션은 :', selectedOption);
    if (selectedOption !== '직접입력') {
      setIsOption(selectedOption);
      setIsUserInput(false);
    } else {
      setIsUserInput(true); // 2. '직접입력' 으로 값이 들어오면 true로 상태변경 =>>> isUserInput === true
      setIsOption('');
    }
    setIsDropdown(false); // 옵션 선택하면 리스트 닫기
  };

  const handleUserInputSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputSubject = e.target.value;
    setIsOption(userInputSubject); //여기도 문제 :: 유저가 입력한 갑은 '직접입력'이 아니기에 readOnly === true가 됨
  };

  const handleClickDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    if (isUserInput && inputRef.current) {
      inputRef.current.removeAttribute('readOnly');
      inputRef.current.focus();
    } else {
      console.log('readOnly 설정됨');
      inputRef.current?.setAttribute('readOnly', 'true');
    }
  }, [isUserInput]);
  console.log('isUserInput:', isUserInput);
  return (
    <>
      <SLabel htmlFor="userName">이름</SLabel>
      <SUserInputForm placeholder="이름을 입력해주세요" />
      <SLabel htmlFor="subject">과목</SLabel>
      <div>
        {isDropdown ? (
          <IcClose onClick={handleClickDropdown} />
        ) : (
          <IcOpen onClick={handleClickDropdown} />
        )}
        <Input
          ref={inputRef}
          type="text"
          value={isOption}
          onChange={handleUserInputSubject}
          placeholder="과목을 선택해주세요"
        ></Input>
      </div>
      {isDropdown && (
        <SubjectDropdownList onSelectedOption={handleClickOption} />
      )}

      <SLabel htmlFor="seniority">연차</SLabel>
      <Input placeholder="연차를 입력해주세요"></Input>
      <SLabel htmlFor="school">학교</SLabel>
      <div>
        <IcSearch />
        <Input placeholder="학교를 입력해주세요"></Input>
      </div>
    </>
  );
};

export default UserInputForm;
