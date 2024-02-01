import React, { useState, useEffect, useRef } from 'react';
import { useToggle } from '../../utils/useHooks/useToggle';
import SubjectInputSection from './SubjectInputSection';

const UserSubjectForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const handleClickOption = (selectedOption: string) => {
    if (selectedOption !== '직접입력') {
      setSubject(selectedOption);
      console.log('내가 선택한 과목:', selectedOption);
      setIsUserInput(false);
    } else {
      setIsUserInput(true);
      setSubject('');
    }
    setIsToggle(false); // 옵션 선택하면 리스트 닫기
  };

  const handleUserInputSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputSubject = e.target.value;
    setSubject(userInputSubject);
  };

  useEffect(() => {
    // 과목
    // 과목 선택 - 직접입력 클릭 시
    // input readOnly 속성 제거 + focus 효과 주기
    if (isUserInput && inputRef.current) {
      inputRef.current.removeAttribute('readOnly');
      inputRef.current.focus();
    } else {
      inputRef.current?.setAttribute('readOnly', 'true');
    }
  }, [isUserInput]);
  return (
    <>
      <SubjectInputSection
        inputRef={inputRef}
        isToggle={isToggle}
        subject={subject}
        handleUserInputSubject={handleUserInputSubject}
        handleClickOption={handleClickOption}
        handleChangeToggle={handleChangeToggle}
      />
    </>
  );
};

export default UserSubjectForm;
