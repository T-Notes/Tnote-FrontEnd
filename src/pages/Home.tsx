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
  const [clickedDate, setClickedDate] = useState<string>('');

  const handleClickLinkToAddSemesterPage = () => {
    navigate('/semesterSetup');
  };
  // reload 상태 관리
  const [reload, setReload] = useState<boolean>(false);

  const handleDayClick = (clickedDate: Date) => {
    const currentDate = clickedDate;
    const year = currentDate.getFullYear(); // 년도
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
    const day = String(currentDate.getDate()).padStart(2, '0'); // 일
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // 예: "2024-03-06"

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

      <ScheduleCalendar reload={reload} onDayClick={handleDayClick} />
      <TaskSidebar
        reload={reload}
        setReload={setReload}
        clickedDate={clickedDate}
      />
      <WriteButton setReload={setReload} />
    </SHomeWrapper>
  );
};

export default Home;
