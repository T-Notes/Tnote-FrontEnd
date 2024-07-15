import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import RemainingDays from '../components/Home/RemainingDays';
import ScheduleCalendar from '../components/Home/logCalendar/ScheduleCalendar';
import TaskSidebar from '../components/Home/TaskSidebar';
import TodaySchedule from '../components/Home/TodaySchedule';

const SHomeWrapper = styled.div`
  padding-right: 21.3vw;

  @media (max-width: 1439px) {
    font-size: 24px;
  }

  @media (max-width: 1080px) {
    padding-right: 1vw;
  }

  @media (max-width: 1024px) {
    padding-right: 1vw;
  }
`;
const SDayAndScheduleWrapper = styled.div`
  display: flex;
`;
const SHomeSemester = styled.div`
  padding-right: 30px;
  padding-left: 30px;
`;
const Home = () => {
  const navigate = useNavigate();
  const [clickedDate, setClickedDate] = useState<string>('');

  const handleClickLinkToAddSemesterPage = () => {
    navigate('/semesterSetup/home');
  };

  const handleDayClick = (clickedDate: Date) => {
    const currentDate = clickedDate;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setClickedDate(formattedDate);
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

      <ScheduleCalendar onDayClick={handleDayClick} />
      <TaskSidebar clickedDate={clickedDate} />
    </SHomeWrapper>
  );
};

export default Home;
