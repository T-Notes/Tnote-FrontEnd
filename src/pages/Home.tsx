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
  left: 250px;
  right: 0;
  bottom: 0;
`;
const Home = () => {
  const { id } = useParams();
  return (
    <SHomeWrapper>
      <SemesterMenu />
      <RemainingDays />
      <TodaySchedule />
      <ScheduleCalendar />
      <WriteButton />
      <TaskSidebar />
    </SHomeWrapper>
  );
};

export default Home;
