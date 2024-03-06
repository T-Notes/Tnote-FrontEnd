import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import RemainingDays from '../components/Home/RemainingDays';
import ScheduleCalendar from '../components/Home/ScheduleCalendar';
import TaskSidebar from '../components/Home/TaskSidebar';
import TodaySchedule from '../components/Home/TodaySchedule';
import WriteButton from '../components/Write/WriteButton';
import instanceAxios from '../utils/InstanceAxios';

const SHomeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 200px;
  right: 300px;
  /* left: 230px; // 사이드바에서 30px 띄우기
  right: 330px; // 사이드바에서 30px 띄우기 */
  bottom: 0;
`;
const SDayAndScheduleWrapper = styled.div`
  display: flex;
`;
const SHomeSemester = styled.div`
  padding-left: 30px;
  padding-right: 30px;
`;
const Home = () => {
  const navigate = useNavigate();
  // 스케줄 id를 전역에 저장.
  // 홈페이지에서 해당 값을 url에 담기
  const handleClickLogout = () => {
    const res = instanceAxios.post('/tnote/user/logout').then((res) => {
      console.log(1, 'res:', res);
      localStorage.clear();
    });
  };
  const handleClickLinkToAddSemesterPage = () => {
    navigate('/semesterSetup');
  };
  return (
    <SHomeWrapper>
      <SHomeSemester>
        <SemesterMenu onClickAddBtn={handleClickLinkToAddSemesterPage} />
        <SDayAndScheduleWrapper>
          <RemainingDays />
          <TodaySchedule />
        </SDayAndScheduleWrapper>
      </SHomeSemester>

      <ScheduleCalendar />
      <TaskSidebar />
      <WriteButton />
      <button onClick={handleClickLogout}>로그아읏</button>
    </SHomeWrapper>
  );
};

export default Home;
