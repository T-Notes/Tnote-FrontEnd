import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import Todo from './Todo';
import { getAllTaskByDate } from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClassLogModal from '../Write/ClassLogModal';
import { useModals } from '../../utils/useHooks/useModals';

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
export interface Task {
  id: number;
  title: string;
  status: boolean;
  content: string;
  studentName: string;
  createdAt: string;
}
interface Reload {
  reload: boolean;
  clickedDate: string | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskSidebar = ({ reload, setReload, clickedDate }: Reload) => {
  const { scheduleId } = useParams();
  const { year, month, day } = useCurrentDate();
  const { openModal } = useModals();
  const [classLogContent, setClassLogContent] = useState<Task[]>([]);
  const [workLogContent, setWorkLogContent] = useState<Task[]>([]);
  const [consultationsContent, setConsultationsContent] = useState<Task[]>([]);
  const [observationContent, setObservationContent] = useState<Task[]>([]);
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);
  const [todo, setTodo] = useState<Task[]>([]);

  const currentDate = new Date().toISOString().slice(0, 10);

  const formattedDate = clickedDate
    ? clickedDate.replace(
        /(\d{4})-(\d{2})-(\d{2})/,
        (match, year, month, day) =>
          `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`,
      )
    : `${year}년 ${month}월 ${day}일`;

  const handleUpdateOutside = () => {
    setClickedOutside(true);
  };
  useEffect(() => {
    if (scheduleId) {
      const fetchData = async () => {
        try {
          if (typeof clickedDate !== 'undefined') {
            const allData = await getAllTaskByDate(scheduleId, clickedDate);

            const logData = allData.data;

            setClassLogContent(logData.classLogs);
            setWorkLogContent(logData.proceedings);
            setConsultationsContent(logData.consultations);
            setObservationContent(logData.observations);
          } else {
            const allData = await getAllTaskByDate(scheduleId, currentDate);
            const logData = allData.data;
            setClassLogContent(logData.classLogs);
            setWorkLogContent(logData.proceedings);
            setConsultationsContent(logData.consultations);
            setObservationContent(logData.observations);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          Swal.fire({
            text: '학기에 포함된 날짜만 선택 가능합니다.',
            confirmButtonText: '확인',
            confirmButtonColor: '#632CFA',
          });
        }
      };
      fetchData();
    }
  }, [reload, scheduleId, clickedDate]);

  const handleOpenClassLogIdModal = (logId: any) => {
    console.log(1, logId);
    openModal(ClassLogModal, { logId });
  };

  return (
    <STaskSidebarWrapper onClick={handleUpdateOutside}>
      <SDateFont>
        {clickedDate !== '' ? formattedDate : `${year}년 ${month}월 ${day}일`}
      </SDateFont>
      <div>
        <Todo
          clickedOutside={clickedOutside}
          setClickedOutside={setClickedOutside}
          todo={todo}
          setTodo={setTodo}
          clickedDate={clickedDate}
          setReload={setReload}
        />
      </div>
      <SFlex>
        <SFont>학급 일지</SFont>
        <SLogLength>{classLogContent.length}</SLogLength>
      </SFlex>

      {classLogContent.map((classLog) => (
        <SLogs
          key={classLog.id}
          onClick={() => handleOpenClassLogIdModal(classLog.id)}
        >
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
      {/* {isLogModalOpen && <ClassLogModal />} */}
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
