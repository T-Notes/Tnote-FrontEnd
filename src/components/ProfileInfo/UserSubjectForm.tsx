import React, { useState, useEffect, useRef } from 'react';
import { useToggle } from '../../utils/useHooks/useToggle';
import SubjectInputSection from './SubjectInputSection';

interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
}

interface UserSubjectFormProps {
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

const UserSubjectForm = ({ userData, setUserData }: UserSubjectFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const handleClickSubjectOption = (selectedOption: string) => {
    if (selectedOption === '직접입력') {
      setIsUserInput(true);
      setUserData((prevUserData) => ({
        ...prevUserData,
        subject: '',
      }));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        subject: selectedOption,
      }));
      setIsUserInput(false);
    }
    setIsToggle(false); // 옵션 선택하면 리스트 닫기
  };

  const handleChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSubjectInput = e.target.value;

    setUserData((prevUserData) => ({
      ...prevUserData,
      subject: userSubjectInput,
    }));
  };

  useEffect(() => {
    // 동작: 과목 선택 -> 직접입력 클릭 시 렌더링
    // 역할: input readOnly 속성 제거 + focus 효과 주기
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
        subject={userData.subject}
        handleChangeSubjectInput={handleChangeSubjectInput}
        handleClickSubjectOption={handleClickSubjectOption}
        handleChangeToggle={handleChangeToggle}
      />
    </>
  );
};

export default UserSubjectForm;
