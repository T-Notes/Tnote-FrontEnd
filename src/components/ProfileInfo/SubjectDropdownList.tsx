import React, { useState } from 'react';
import styled from 'styled-components';

const SDropdownWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 240px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  top: calc(100% + 4px);
  left: 0;
  z-index: 3;
  overflow-y: scroll;
`;

const SList = styled.ul`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 5px 10px;
  margin-left: 4px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
    border-radius: 4px;
  }
`;
const SItem = styled.li`
  display: flex;
  height: auto;
  ${({ theme }) => theme.fonts.caption}
  padding-left: 24px;
`;
const SItemContainer = styled.div`
  margin-top: 4px;
`;
interface selectedOptionProps {
  onSelectedOption: (selectedOption: string) => void;
}

const SubjectDropdownList = ({ onSelectedOption }: selectedOptionProps) => {
  const subjectList = [
    { id: 1, option: '국어' },
    { id: 2, option: '수학' },
    { id: 3, option: '영어' },
    { id: 4, option: '사회' },
    { id: 5, option: '도덕' },
    { id: 6, option: '과학' },
    { id: 7, option: '체육' },
    { id: 8, option: '음악' },
    { id: 9, option: '미술' },
    { id: 10, option: '직접입력' },
    { id: 11, option: '선택안함' },
  ];
  return (
    <SDropdownWrapper>
      <SItemContainer>
        {subjectList.map((subject) => (
          <SList
            key={subject.id}
            onClick={() => onSelectedOption(subject.option)}
          >
            <SItem>{subject.option}</SItem>
          </SList>
        ))}
      </SItemContainer>
    </SDropdownWrapper>
  );
};

export default SubjectDropdownList;
