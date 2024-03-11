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

  const handleClickLinkToAddSemesterPage = () => {
    navigate('/semesterSetup');
  };
  // reload 상태 관리
  const [reload, setReload] = useState<boolean>(false);

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
      <TaskSidebar reload={reload} />
      <WriteButton setReload={setReload} />
    </SHomeWrapper>
  );
};

export default Home;
