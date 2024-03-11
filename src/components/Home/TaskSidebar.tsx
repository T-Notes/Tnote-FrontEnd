import styled from 'styled-components';
import { Button } from '../common/styled/Button';

import { IcAddWhite } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
import TodoListInput from './TodoListInput';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import Todo from '../Home/Todo';
import {
  getAllClassLog,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
} from '../../utils/lib/api';
import { useParams } from 'react-router-dom';

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

interface Task {
  id: number;
  title: string;
  studentName: string;
  createdAt: string;
}
interface Reload {
  reload: boolean;
}
// 금일 해당하는 내용의 task들이 노출되어야 함.
const TaskSidebar = ({ reload }: Reload) => {
  const { scheduleId } = useParams();
  const { year, month, day } = useCurrentDate(); // 데이터 추상화 (headless 기반의 추상화 하기)
  const [classLogContent, setClassLogContent] = useState<Task[]>([]);
  const [workLogContent, setWorkLogContent] = useState<Task[]>([]);
  const [consultationsContent, setConsultationsContent] = useState<Task[]>([]);
  const [observationContent, setObservationContent] = useState<Task[]>([]);

  useEffect(() => {
    if (scheduleId) {
      const fetchData = async () => {
        try {
          const classLogResponse = await getAllClassLog(scheduleId);
          const workLogResponse = await getAllProceedings(scheduleId);
          const consultationsResponse = await getAllConsultations(scheduleId);
          const observationResponse = await getAllObservation(scheduleId);
          console.log(1, consultationsResponse.data.consultations);
          console.log(2, observationResponse.data.observations);

          setClassLogContent(classLogResponse.data.classLogs);
          setWorkLogContent(workLogResponse.data.proceedings);
          setConsultationsContent(consultationsResponse.data.consultations);
          setObservationContent(observationResponse.data.observations);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [reload, scheduleId]);

  return (
    <STaskSidebarWrapper>
      <SDateFont>{`${year}년 ${month + 1}월 ${day}일`}</SDateFont>
      <div>
        <SFont>To do</SFont>
        <Todo />
      </div>
      <SFont>학급 일지</SFont>
      {classLogContent.map((classLog) => (
        <div key={classLog.id}>
          <div>
            {classLog.title}
            <p>{classLog.createdAt}</p>
          </div>
        </div>
      ))}
      <SFont>업무 일지</SFont>
      {workLogContent.map((workLog) => (
        <div key={workLog.id}>
          <div>{workLog.title}</div>
        </div>
      ))}
      <SFont>관찰 일지</SFont>
      {observationContent.map((observation) => (
        <div key={observation.id}>
          <div>{observation.studentName}</div>
        </div>
      ))}
      <SFont>상담 일지</SFont>
      {consultationsContent.map((consultation) => (
        <div key={consultation.id}>
          <div>{consultation.studentName}</div>
        </div>
      ))}
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
