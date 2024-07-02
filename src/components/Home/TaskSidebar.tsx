import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import Todo from './Todo';
import { getAllTaskByDate, getSemesterData } from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClassLogModal from '../Write/ClassLogModal';
import { useModals } from '../../utils/useHooks/useModals';
import WorkLogModal from '../Write/WorkLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';

const STaskSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue400};
  width: 21.25vw;
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
  padding-bottom: 10px;
`;
const SLogs = styled.div`
  cursor: pointer;
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
const STaskLogContainer = styled.div`
  max-height: 90px;
  overflow-y: scroll;
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
  clickedDate: string | undefined;
}

const TaskSidebar = ({ clickedDate }: Reload) => {
  const { scheduleId } = useParams();
  const { year, month, day } = useCurrentDate();
  const { openModal } = useModals();
  const [classLogContent, setClassLogContent] = useState<Task[]>([]);
  const [workLogContent, setWorkLogContent] = useState<Task[]>([]);
  const [consultationsContent, setConsultationsContent] = useState<Task[]>([]);
  const [observationContent, setObservationContent] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [semesterStartDate, setSemesterStartDate] = useState<string>('');
  const [semesterEndDate, setSemesterEndDate] = useState<string>('');
  const isEdit = true;
  const currentDate = new Date().toISOString().slice(0, 10);

  const formattedDate = (() => {
    const clickedDateTime = clickedDate ? new Date(clickedDate) : null;
    const semesterStartDateObj = semesterStartDate
      ? new Date(semesterStartDate)
      : null;
    const semesterEndDateObj = semesterEndDate
      ? new Date(semesterEndDate)
      : null;

    if (
      clickedDateTime &&
      semesterStartDateObj &&
      semesterEndDateObj &&
      clickedDateTime >= semesterStartDateObj &&
      clickedDateTime <= semesterEndDateObj
    ) {
      const year = clickedDateTime.getFullYear();
      const month = String(clickedDateTime.getMonth() + 1).padStart(2, '0');
      const day = String(clickedDateTime.getDate()).padStart(2, '0');

      return `${year}년 ${month}월 ${day}일`;
    } else {
      return `${year}년 ${String(month).padStart(2, '0')}월 ${String(
        day,
      ).padStart(2, '0')}일`;
    }
  })();

  useEffect(() => {
    if (scheduleId) {
      const getDateRange = async () => {
        const response = await getSemesterData(scheduleId);

        setSemesterStartDate(response.data[0].startDate);
        setSemesterEndDate(response.data[0].endDate);
      };
      getDateRange();
    }
  }, [clickedDate]);

  useEffect(() => {
    if (scheduleId) {
      const fetchData = async () => {
        try {
          if (typeof clickedDate !== 'undefined') {
            const allData = await getAllTaskByDate(scheduleId, clickedDate);

            const logData = allData.data;

            setTodo(logData.todos);
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
          if (error === 'incorrect date in subject') {
            Swal.fire({
              text: '학기에 포함된 날짜만 선택 가능합니다.',
              confirmButtonText: '확인',
              confirmButtonColor: '#632CFA',
            }).then((res) => {
              window.location.reload();
            });
          }
        }
      };
      fetchData();
    }
  }, [reload, scheduleId, clickedDate]);

  const handleOpenClassLogIdModal = (logId: number) => {
    openModal(ClassLogModal, { scheduleId, logId, isEdit });
  };
  const handleOpenProceedingIdModal = (logId: number) => {
    openModal(WorkLogModal, { scheduleId, logId, isEdit });
  };
  const handleOpenConsultationIdModal = (logId: number) => {
    openModal(ConsultationRecordsModal, { scheduleId, logId, isEdit });
  };
  const handleOpenObservationIdModal = (logId: number) => {
    openModal(StudentRecordsModal, { scheduleId, logId, isEdit });
  };

  return (
    <STaskSidebarWrapper>
      <SDateFont>
        {clickedDate !== '' ? formattedDate : `${year}년 ${month}월 ${day}일`}
      </SDateFont>
      <div>
        <Todo
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
      <STaskLogContainer>
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
      </STaskLogContainer>

      <SFlex>
        <SFont>업무 일지</SFont>
        <SLogLength>{workLogContent.length}</SLogLength>
      </SFlex>
      <STaskLogContainer>
        {workLogContent.map((workLog) => (
          <SLogs
            key={workLog.id}
            onClick={() => handleOpenProceedingIdModal(workLog.id)}
          >
            <SLogContent>{workLog.title}</SLogContent>
            <SLogCreatedAt>{`${workLog.createdAt.slice(
              0,
              10,
            )} 작성`}</SLogCreatedAt>
          </SLogs>
        ))}
      </STaskLogContainer>

      <SFlex>
        <SFont>관찰 일지</SFont>
        <SLogLength>{observationContent.length}</SLogLength>
      </SFlex>
      <STaskLogContainer>
        {observationContent.map((observation) => (
          <SLogs
            key={observation.id}
            onClick={() => handleOpenObservationIdModal(observation.id)}
          >
            <SLogContent>{observation.studentName}</SLogContent>
            <SLogCreatedAt>{`${observation.createdAt.slice(
              0,
              10,
            )} 작성`}</SLogCreatedAt>
          </SLogs>
        ))}
      </STaskLogContainer>

      <SFlex>
        <SFont>상담 일지</SFont>
        <SLogLength>{consultationsContent.length}</SLogLength>
      </SFlex>
      <STaskLogContainer>
        {consultationsContent.map((consultation) => (
          <SLogs
            key={consultation.id}
            onClick={() => handleOpenConsultationIdModal(consultation.id)}
          >
            <SLogContent>{consultation.studentName}</SLogContent>
            <SLogCreatedAt>{`${consultation.createdAt.slice(
              0,
              10,
            )} 작성`}</SLogCreatedAt>
          </SLogs>
        ))}
      </STaskLogContainer>
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
