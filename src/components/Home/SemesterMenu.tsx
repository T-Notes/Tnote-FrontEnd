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
  // const { scheduleId } = useParams();
  const scheduleId = useRecoilValue(scheduleIdState); // 학기 추가 안했을 시 아직 null
  console.log(1, scheduleId); // 학기 추가 안했을 시 아직 null

  const location = useLocation(); // 현재 url정보에 접근

  //'추가버튼' 라우팅 설정 (학기 추가 회원과 학기 추가 안한 회원 별 + 페이지에 따른 라우팅)
  // 시간표 페이지에서 추가버튼 클릭 시 페이지 이동이 아니기 때문에 해당 코드 주석
  // let toPath = '';
  // if (
  //   location.pathname === '/home' ||
  //   location.pathname === `/home/${scheduleId}`
  // ) {
  //   toPath = '/semesterSetup';
  // } else if (location.pathname === '/timetable') {
  //   toPath = `/timetable`; // 학기 추가 전에 과목 추가를 누르면 어떻게 이동시킬것인가
  // } else if (location.pathname === `/timetable/${scheduleId}`) {
  //   toPath = `/timetable/${scheduleId}`;
  // }

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

      {/* {scheduleId ? (
        <Link to={`/semesterSetup/${scheduleId}`}>
          <SButton>설정</SButton>
        </Link>
      ) : (
        <Link to="/semesterSetup">
          <SButton>설정</SButton>
        </Link>
      )} */}

      {/* 설정 : 추가한 학기가 있을 경우, 해당 학기 설정 화면으로 이동 */}
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
