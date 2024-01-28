import { useState } from 'react';
import styled from 'styled-components';
import LeftSidebar from '../components/common/LeftSidebar';
import HomeHeader from '../components/Home/HomeHeader';
import RemainingDays from '../components/Home/RemainingDays';
import ScheduleCalendar from '../components/Home/ScheduleCalendar';
import TaskSidebar from '../components/Home/TaskSidebar';
import TodaySchedule from '../components/Home/TodaySchedule';

const SHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Home = () => {
  return (
    <SHomeWrapper>
      {/* <LeftSidebar /> */}
      <HomeHeader />
      <RemainingDays />
      <TodaySchedule />
      <ScheduleCalendar />
      <TaskSidebar />
    </SHomeWrapper>
  );
};

export default Home;
