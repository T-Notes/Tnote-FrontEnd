import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AllSemesterNamesForm from './AllSemesterNamesForm';

const SSemesterMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SButton = styled.button`
  ${({ theme }) => theme.fonts.h4}
  color:  ${({ theme }) => theme.colors.gray000};
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
`;
// 메인홈의 상단 부분 (학기명, 추가&설정 버튼)
// 시간표 상단 부분과 동일 => 공통 컴포넌트 나중에 고려하자

const SemesterMenu = () => {
  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />
      <Link to="/semesterSetup/:id">
        <SButton>추가</SButton>
      </Link>
      <Link to="/semesterSetup/:id">
        <SButton>설정</SButton>
      </Link>

      {/* 설정 : 추가한 학기가 있을 경우, 해당 학기 설정 화면으로 이동 */}
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
