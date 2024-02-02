import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../common/styled/Input';
import SubjectDropdownList from './SubjectDropdownList';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';

const SInput = styled(Input)`
  margin-top: 20px;
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
    <>
      {isToggle ? (
        <IcCloseDropdown onClick={handleChangeToggle} />
      ) : (
        <IcOpenDropdown onClick={handleChangeToggle} />
      )}
      <SInput
        ref={inputRef}
        type="text"
        value={subject}
        onChange={handleChangeSubjectInput}
        placeholder="과목을 선택해주세요"
      ></SInput>
      {isToggle && (
        <SubjectDropdownList onSelectedOption={handleClickSubjectOption} />
      )}
    </>
  );
};

export default SubjectInputSection;
