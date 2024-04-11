import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import AllSemesterNamesForm from './AllSemesterNamesForm';

const SSemesterMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const SButton = styled.button`
  ${({ theme }) => theme.fonts.h4}
  color:  ${({ theme }) => theme.colors.gray000};
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
`;
const SAddAndSetup = styled.div`
  margin-left: auto;
`;
interface SemesterMenu {
  onClickAddBtn: () => void;
}
const SemesterMenu = ({ onClickAddBtn }: SemesterMenu) => {
  const { scheduleId } = useParams();

  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />

      <SAddAndSetup>
        <SButton onClick={onClickAddBtn}>추가</SButton>

        <Link
          to={scheduleId ? `/semesterSetup/${scheduleId}` : '/semesterSetup'}
        >
          <SButton>설정</SButton>
        </Link>
      </SAddAndSetup>
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
