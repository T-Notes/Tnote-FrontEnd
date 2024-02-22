import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import RemainingDays from '../components/Home/RemainingDays';
import ScheduleCalendar from '../components/Home/ScheduleCalendar';
import TaskSidebar from '../components/Home/TaskSidebar';
import TodaySchedule from '../components/Home/TodaySchedule';
import WriteButton from '../components/Write/WriteButton';

const SHomeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 230px; // 사이드바에서 30px 띄우기
  right: 330px; // 사이드바에서 30px 띄우기
  bottom: 0;
`;
const SDayAndScheduleWrapper = styled.div`
  display: flex;
`;
const Home = () => {
  const { id } = useParams();
  return (
    <SHomeWrapper>
      <SemesterMenu />
      <SDayAndScheduleWrapper>
        <RemainingDays />
        <TodaySchedule />
      </SDayAndScheduleWrapper>

      <ScheduleCalendar />
      <WriteButton />
      <TaskSidebar />
    </SHomeWrapper>
  );
};

export default Home;
