import React, { useState } from 'react';
import styled from 'styled-components';

const SDropdownWrapper = styled.div`
  position: fixed;
  width: 550px;
  height: 240px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 2px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
  overflow-y: scroll;
`;

const SList = styled.ul`
  padding: 5px 10px;
`;
const SItem = styled.li`
  ${({ theme }) => theme.fonts.caption}
  padding-left: 24px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
interface selectedOptionProps {
  onSelectedOption: (selectedOption: string) => void;
}

const SubjectDropdownList = ({ onSelectedOption }: selectedOptionProps) => {
  // map함수를 만들어서 리스트를 만드는 것이 좋을것같다.
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
    // 개선 : 드롭다운 목록 리스트를 select,option 태그로 변경하는 것이 웹표준을 준수하는 것이지 않을까?
    <SDropdownWrapper>
      {subjectList.map((subject) => (
        <SList key={subject.id}>
          <SItem onClick={() => onSelectedOption(subject.option)}>
            {subject.option}
          </SItem>
        </SList>
      ))}
    </SDropdownWrapper>
  );
};

export default SubjectDropdownList;
