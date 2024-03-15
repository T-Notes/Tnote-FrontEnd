import styled from 'styled-components';
import { Button } from '../common/styled/Button';

import { IcAddWhite } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';

import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import Todo from '../Home/Todo';
import {
  getAllClassLog,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
  getAllTaskByDate,
} from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';

const STaskSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue400};
  width: 300px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 1080px) {
    display: none;
  }
`;
const SFont = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SDateFont = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const SLogs = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 5px;
`;
const SLogContent = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #2f2f2f;
`;
const SLogCreatedAt = styled.p`
  margin-left: auto;
  font-size: 15px;
  color: #a6a6a6;
`;
const SFlex = styled.div`
  display: flex;
  align-items: center;
`;
const SLogLength = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  background-color: #baa2fc;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 10px;
  color: white;
`;
interface Task {
  id: number;
  title: string;
  studentName: string;
  createdAt: string;
}
interface Reload {
  reload: boolean;
  clickedDate: string | undefined;
}
// 금일 해당하는 내용의 task들이 노출되어야 함.
const TaskSidebar = ({ reload, clickedDate }: Reload) => {
  const { scheduleId } = useParams();
  const { year, month, day } = useCurrentDate(); // 데이터 추상화 (headless 기반의 추상화 하기)
  const [classLogContent, setClassLogContent] = useState<Task[]>([]);
  const [workLogContent, setWorkLogContent] = useState<Task[]>([]);
  const [consultationsContent, setConsultationsContent] = useState<Task[]>([]);
  const [observationContent, setObservationContent] = useState<Task[]>([]);
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  const currentDate = new Date().toISOString().slice(0, 10);
  // todo 외부 클릭 시 수정 요청 함수
  const handleUpdateOutside = () => {
    console.log('바깥을 클릭1');
    setClickedOutside(true); // 클릭 상태 변경
  };
  useEffect(() => {
    if (scheduleId) {
      const fetchData = async () => {
        try {
          console.log(1, clickedDate);

          if (typeof clickedDate !== 'undefined') {
            console.log(2, clickedDate);
            const params = { date: clickedDate };
            const allData = await getAllTaskByDate(scheduleId, clickedDate);
            console.log('allData:', allData.data);

            // const allData = await instanceAxios.get(
            //   `/tnote/home/${scheduleId}/dailyLogs`,
            //   { params },
            // );
            const logData = allData.data;
            setClassLogContent(logData.classLogs);
            setWorkLogContent(logData.proceedings);
            setConsultationsContent(logData.consultations);
            setObservationContent(logData.observations);
          } else {
            console.log(3, clickedDate);
            const allData = await getAllTaskByDate(scheduleId, currentDate);
            const logData = allData.data;
            setClassLogContent(logData.classLogs);
            setWorkLogContent(logData.proceedings);
            setConsultationsContent(logData.consultations);
            setObservationContent(logData.observations);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [reload, scheduleId, clickedDate]);

  return (
    <STaskSidebarWrapper onClick={handleUpdateOutside}>
      <SDateFont>{`${year}년 ${month + 1}월 ${day}일`}</SDateFont>
      <div>
        <SFont>To do</SFont>
        <Todo
          clickedOutside={clickedOutside}
          setClickedOutside={setClickedOutside}
        />
      </div>
      <SFlex>
        <SFont>학급 일지</SFont>
        <SLogLength>{classLogContent.length}</SLogLength>
      </SFlex>

      {classLogContent.map((classLog) => (
        <SLogs key={classLog.id}>
          <SLogContent>{classLog.title}</SLogContent>
          <SLogCreatedAt>{`${classLog.createdAt.slice(
            0,
            10,
          )} 작성`}</SLogCreatedAt>
        </SLogs>
      ))}

      <SFlex>
        <SFont>업무 일지</SFont>
        <SLogLength>{workLogContent.length}</SLogLength>
      </SFlex>

      {workLogContent.map((workLog) => (
        <SLogs key={workLog.id}>
          <SLogContent>{workLog.title}</SLogContent>
          <SLogCreatedAt>{`${workLog.createdAt.slice(
            0,
            10,
          )} 작성`}</SLogCreatedAt>
        </SLogs>
      ))}
      <SFlex>
        <SFont>관찰 일지</SFont>
        <SLogLength>{observationContent.length}</SLogLength>
      </SFlex>

      {observationContent.map((observation) => (
        <SLogs key={observation.id}>
          <SLogContent>{observation.studentName}</SLogContent>
          <SLogCreatedAt>{`${observation.createdAt.slice(
            0,
            10,
          )} 작성`}</SLogCreatedAt>
        </SLogs>
      ))}
      <SFlex>
        <SFont>상담 일지</SFont>
        <SLogLength>{consultationsContent.length}</SLogLength>
      </SFlex>

      {consultationsContent.map((consultation) => (
        <SLogs key={consultation.id}>
          <SLogContent>{consultation.studentName}</SLogContent>
          <SLogCreatedAt>{`${consultation.createdAt.slice(
            0,
            10,
          )} 작성`}</SLogCreatedAt>
        </SLogs>
      ))}
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
