import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { scheduleIdState } from '../../utils/lib/recoil/scheduleIdState';

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
  console.log(scheduleId);

  const location = useLocation(); // 현재 url정보에 접근

  // 아이디가 있으면 => /semesterSetup/${scheduleId}
  // 아이디가 없으면 /semesterSetup으로 이동
  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />

      <SAddAndSetup>
        {/* <Link to={toPath}> */}
        <SButton onClick={onClickAddBtn}>추가</SButton>
        {/* </Link> */}
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
