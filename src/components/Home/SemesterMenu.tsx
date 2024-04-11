import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleClickRoute = () => {
    if (scheduleId) {
      if (window.location.pathname.includes('home')) {
        navigate(`/semesterSetup/home/${scheduleId}`);
      } else if (window.location.pathname.includes('timetable')) {
        navigate(`/semesterSetup/timetable/${scheduleId}`);
      }
    } else if (!scheduleId) {
      if (window.location.pathname.includes('home')) {
        navigate(`/semesterSetup/home`);
      } else if (window.location.pathname.includes('timetable')) {
        navigate(`/semesterSetup/timetable`);
      }
    }
  };

  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />
      <SAddAndSetup>
        <SButton onClick={onClickAddBtn}>추가</SButton>
        <SButton onClick={handleClickRoute}>설정</SButton>
      </SAddAndSetup>
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
