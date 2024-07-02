import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import RemainingDays from '../components/Home/RemainingDays';
import ScheduleCalendar from '../components/Home/logCalendar/ScheduleCalendar';
import TaskSidebar from '../components/Home/TaskSidebar';
import TodaySchedule from '../components/Home/TodaySchedule';

const SDayAndScheduleWrapper = styled.div`
  display: flex;
`;
const SHomeSemester = styled.div`
  padding-right: 30px;
`;
const Home = () => {
  const navigate = useNavigate();
  const [clickedDate, setClickedDate] = useState<string>('');

  const handleClickLinkToAddSemesterPage = () => {
    navigate('/semesterSetup/home');
  };

  const handleDayClick = (clickedDate: Date) => {
    const currentDate = clickedDate;
    const year = currentDate.getFullYear(); // 년도
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
    const day = String(currentDate.getDate()).padStart(2, '0'); // 일
    const formattedDate = `${year}-${month}-${day}`;
    setClickedDate(formattedDate);
  };
  return (
    <div>
      <SHomeSemester>
        <SemesterMenu onClickAddBtn={handleClickLinkToAddSemesterPage} />
        <SDayAndScheduleWrapper>
          <RemainingDays />
          <TodaySchedule />
        </SDayAndScheduleWrapper>
      </SHomeSemester>

      <ScheduleCalendar onDayClick={handleDayClick} />
      <TaskSidebar clickedDate={clickedDate} />
    </div>
  );
};

export default Home;
