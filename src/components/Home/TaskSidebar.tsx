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
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  text-align: left;

  @media (max-height: 1079px) {
    font-size: 18px;
  }
  @media (max-height: 899px) {
    font-size: 16px;
  }

  @media (max-height: 720px) {
    font-size: 14px;
  }
`;

const SDateFont = styled.div`
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 600;
  line-height: 33.41px;
  text-align: left;
  padding: 0px;
  margin-top: 24px;
  margin-bottom: 20px;
  @media (max-height: 1079px) {
    font-size: 22px;
  }
  @media (max-height: 720px) {
    font-size: 20px;
  }
`;
const SLogs = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 14px;
  background-color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 5px;

  @media (max-height: 1079px) {
    padding: 10px;
  }
  @media (max-height: 899px) {
    padding: 8px;
  }
`;
const SLogGroup = styled.div``;
const SLogContent = styled.div`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 17.9px;
  text-align: left;
  color: #2f2f2f;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 6px;

  @media (max-height: 720px) {
    font-size: 12px;
  }
`;
const SLogCreatedAt = styled.p`
  margin-left: auto;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 17.9px;
  text-align: left;
  color: #a6a6a6;

  overflow: hidden;
  white-space: nowrap;

  @media (max-height: 720px) {
    font-size: 12px;
  }
`;
const SFlex = styled.div`
  display: flex;
  align-items: center;

  padding-top: 28px;
  padding-bottom: 20px;
  padding-left: 10px;

  @media (max-height: 720px) {
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
`;
const SLogLength = styled.div`
  display: flex;
  border-radius: 19px;
  padding: 2px 10px;
  margin-left: 10px;
  color: white;

  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: left;
`;
const SClassLogLen = styled(SLogLength)`
  background-color: #baa2fc;
`;
const SWorkLogLen = styled(SLogLength)`
  background-color: #ff6f6f;
`;
const SConsultationsLogLen = styled(SLogLength)`
  background-color: #0ea5e9;
`;
const SObservationLogLen = styled(SLogLength)`
  background-color: #f59e0b;
`;
const STaskLogContainer = styled.div`
  overflow-y: scroll;
  max-height: 9.6vh;
`;
export interface Task {
  id: number;
  title: string;
  status: boolean;
  content: string;
  studentName: string;
  createdAt: string;
}

export interface TodoProps {
  id: number;
  content: string;
  date: string;
  status: boolean;
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
  const [todo, setTodo] = useState<TodoProps[]>([]);
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
          clickedDate={clickedDate ? clickedDate : ''}
          // setReload={setReload}
        />
      </div>
      <SLogGroup>
        <SFlex>
          <SFont>학급 일지</SFont>
          <SClassLogLen>{classLogContent.length}</SClassLogLen>
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
          <SWorkLogLen>{workLogContent.length}</SWorkLogLen>
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
          <SObservationLogLen>{observationContent.length}</SObservationLogLen>
        </SFlex>
        <STaskLogContainer>
          {observationContent.map((observation) => (
            <SLogs
              key={observation.id}
              onClick={() => handleOpenObservationIdModal(observation.id)}
            >
              <SLogContent>{observation.title}</SLogContent>
              <SLogCreatedAt>{`${observation.createdAt.slice(
                0,
                10,
              )} 작성`}</SLogCreatedAt>
            </SLogs>
          ))}
        </STaskLogContainer>

        <SFlex>
          <SFont>상담 일지</SFont>
          <SConsultationsLogLen>
            {consultationsContent.length}
          </SConsultationsLogLen>
        </SFlex>
        <STaskLogContainer>
          {consultationsContent.map((consultation) => (
            <SLogs
              key={consultation.id}
              onClick={() => handleOpenConsultationIdModal(consultation.id)}
            >
              <SLogContent>{consultation.title}</SLogContent>
              <SLogCreatedAt>{`${consultation.createdAt.slice(
                0,
                10,
              )} 작성`}</SLogCreatedAt>
            </SLogs>
          ))}
        </STaskLogContainer>
      </SLogGroup>
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
