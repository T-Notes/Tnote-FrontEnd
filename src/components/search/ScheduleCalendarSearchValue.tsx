import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useModals } from '../../utils/useHooks/useModals';
import ClassLogModal from '../Write/ClassLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import WorkLogModal from '../Write/WorkLogModal';

const SSearchValueWrapper = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 30px;
  margin-right: 30px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  font-weight: 500;
  > div {
    padding-right: 70px;
  }
`;
const SSearchDateRange = styled.div`
  width: 280px;
`;
const SSearchTimeRange = styled.div`
  display: flex;
  align-items: center;

  width: 200px;
`;

const SLogColor = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ color }) => color};
`;

interface SearchValue {
  id: number;
  studentName: string;
  title: string;
  startDate: string;
  endDate: string;
  logType: string;
  color: string;
}

interface Props {
  searchValueList: SearchValue[];
}

const ScheduleCalendarSearchValue = ({ searchValueList }: Props) => {
  const { scheduleId } = useParams();
  const { openModal } = useModals();
  const isEdit = true;
  const handleClickOpenLogModal = (logId: number, logType: string) => {
    if (logType === 'CLASS_LOG') {
      openModal(ClassLogModal, { logId, scheduleId, isEdit });
    } else if (logType === 'PROCEEDING') {
      openModal(WorkLogModal, { logId, scheduleId, isEdit });
    } else if (logType === 'CONSULTATION') {
      openModal(ConsultationRecordsModal, { logId, scheduleId, isEdit });
    } else if (logType === 'OBSERVATION') {
      openModal(StudentRecordsModal, { logId, scheduleId, isEdit });
    }
  };

  return (
    <>
      {searchValueList.map((item, index) => {
        const searchStartDate = item.startDate.slice(0, 10);
        const searchEndDate = item.endDate.slice(0, 10);
        const searchStartTime = item.startDate.slice(11, 16);
        const searchEndTime = item.endDate.slice(11, 16);
        return (
          <SSearchValueWrapper
            key={index}
            onClick={() => handleClickOpenLogModal(item.id, item.logType)}
          >
            <SSearchDateRange>
              {searchStartDate}~{searchEndDate}
            </SSearchDateRange>
            <SSearchTimeRange>
              <SLogColor color={item.color}></SLogColor>
              {searchStartTime}~{searchEndTime}
            </SSearchTimeRange>
            <div>{item.studentName || item.title}</div>
          </SSearchValueWrapper>
        );
      })}
    </>
  );
};

export default ScheduleCalendarSearchValue;
