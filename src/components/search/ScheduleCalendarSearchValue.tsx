import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useModals } from '../../utils/useHooks/useModals';
import ClassLogModal from '../Write/ClassLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import WorkLogModal from '../Write/WorkLogModal';

const SSearchValueWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 1.6vw;
  margin-right: 1.6vw;
  border-bottom: 1px solid #e8e8e8;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;
const SSearchDateRange = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 14vw;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
`;
const SSearchTimeRange = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 16vw;
  white-space: nowrap;
  overflow: hidden;
`;

const SLogColor = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ color }) => color};

  @media (max-width: 711px) {
    display: none;
  }
`;
const SLogContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
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

interface SearchValueProps {
  searchValueList: SearchValue[];
  searchValue: string;
}

const ScheduleCalendarSearchValue = (props: SearchValueProps) => {
  const { searchValueList, searchValue } = props;

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

        const content = item.studentName || item.title;
        const highlightedContent = content.replace(
          new RegExp(searchValue, 'gi'),
          (match) => `<span style="color: #632CFA">${match}</span>`,
        );
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
              <p>
                {searchStartTime}~{searchEndTime}
              </p>
            </SSearchTimeRange>

            <SLogContent
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          </SSearchValueWrapper>
        );
      })}
    </>
  );
};

export default ScheduleCalendarSearchValue;
