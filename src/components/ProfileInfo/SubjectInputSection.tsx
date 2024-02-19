import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';

import SubjectDropdownList from './SubjectDropdownList';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';

const SInputWrapper = styled.div`
  position: relative;
  width: 550px;
  height: 50px;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 8px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;

const SSubjectInput = styled.input`
  width: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;

interface SubjectSectionProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  isToggle: boolean;
  subject: string;
  handleChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSubjectOption: (selectedOption: string) => void;
  handleChangeToggle: () => void;
}

const SubjectInputSection = (props: SubjectSectionProps) => {
  const {
    inputRef,
    isToggle,
    subject,
    handleChangeSubjectInput,
    handleClickSubjectOption,
    handleChangeToggle,
  } = props;

  return (
    <SInputWrapper>
      <SSubjectInput
        ref={inputRef}
        type="text"
        value={subject}
        onChange={handleChangeSubjectInput}
        placeholder="과목을 선택해주세요"
      />

      {isToggle ? (
        <IcCloseDropdown onClick={handleChangeToggle} />
      ) : (
        <IcOpenDropdown onClick={handleChangeToggle} />
      )}

      {isToggle && (
        <SubjectDropdownList onSelectedOption={handleClickSubjectOption} />
      )}
    </SInputWrapper>
  );
};

export default SubjectInputSection;
