import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../common/styled/Input';
import SubjectDropdownList from './SubjectDropdownList';
import { IcCloseDropdown, IcOpenDropdown, IcSearch } from '../../assets/icons';

const SInputWrapper = styled.div`
  position: relative;
`;

const SToggle = styled.div`
  position: absolute;
  right: 1%; /* 화면 오른쪽으로부터 5% 떨어진 위치 */
  top: 55%; /* 화면 위쪽으로부터 10% 떨어진 위치 */
  transform: translateY(-50%);
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
      <SToggle>
        {isToggle ? (
          <IcCloseDropdown onClick={handleChangeToggle} />
        ) : (
          <IcOpenDropdown onClick={handleChangeToggle} />
        )}
      </SToggle>
      <Input
        ref={inputRef}
        type="text"
        value={subject}
        onChange={handleChangeSubjectInput}
        placeholder="과목을 선택해주세요"
      />
      {isToggle && (
        <SubjectDropdownList onSelectedOption={handleClickSubjectOption} />
      )}
    </SInputWrapper>
  );
};

export default SubjectInputSection;
