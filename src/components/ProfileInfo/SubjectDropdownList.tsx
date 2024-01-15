import React, { useState } from 'react';

interface selectedOptionProps {
  onSelectedOption: (selectedOption: string) => void;
}

const SubjectDropdownList = ({ onSelectedOption }: selectedOptionProps) => {
  //map함수를 만들어서 리스트를 만드는 것이 좋을것같다.
  const subjectList = [
    { id: 1, option: '국어' },
    { id: 2, option: '수학' },
    { id: 3, option: '영어' },
    { id: 4, option: '사회' },
    { id: 5, option: '직접입력' },
  ];
  return (
    // 개선 : 드롭다운 목록 리스트를 select,option 태그로 변경하는 것이 웹표준을 준수하는 것이지 않을까?
    <>
      {subjectList.map((subject) => (
        <ul key={subject.id}>
          <li onClick={() => onSelectedOption(subject.option)}>
            {subject.option}
          </li>
        </ul>
      ))}
      {/* <ul>
        <li>국어</li>
        <li>수학</li>
        <li>영어</li>
        <li>사회</li>
        <li>도덕</li>
        <li>과학</li>
        <li>체육</li>
        <li>음악</li>
        <li>미술</li>
        <li>직접입력</li>
        <li>선택안함</li>
      </ul> */}
    </>
  );
};

export default SubjectDropdownList;
