import styled from 'styled-components';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import { IcClose } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { getAllTaskByDate } from '../../../utils/lib/api';

import ReactModal from 'react-modal';
import { useModals } from '../../../utils/useHooks/useModals';
import ClassLogModal from '../../Write/ClassLogModal';
import WorkLogModal from '../../Write/WorkLogModal';
import ConsultationRecordsModal from '../../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../../Write/StudentRecordsModal';

const moreLogsCustomStyles = (top: number, left: number) => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: `${top}px`,
    left: `${left}px`,
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px 0px #0000004d',
    width: '208px',
    height: '240px',
    padding: '10px',
    border: '1px solid #D5D5D5',
    borderRadius: '12px',
  },
});

const SDay = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const SDayContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
`;
const SLog = styled.div<{ color: string }>`
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: center;
  display: flex;
  padding: 10px 10px 10px 16px;
  margin-bottom: 2px;
  margin-right: 3px;
  background-color: ${({ color }) => color};
  color: #ffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
const SLogContainer = styled.div`
  max-height: 145px;
  overflow-y: auto;
`;
const SDayOfWeek = styled.p`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  text-align: center;

  color: #2f2f2f;
  padding-bottom: 3.5px;
`;
const SDayOfMonth = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 27px;
  text-align: center;
  color: #2f2f2f;
`;
const SLogContent = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface MoreLogs {
  clickDay: Date | undefined;
  isOpen: boolean;
  onClose: () => void;
  scheduleId: string;
  modalPosition: {
    top: number;
    left: number;
  };
}

const MoreLogModal = ({
  clickDay,
  isOpen,
  onClose,
  scheduleId,
  modalPosition,
}: MoreLogs) => {
  if (!clickDay) return null;
  const { openModal } = useModals();

  const [allLogsByDay, setAllLogsByDay] = useState<any[]>([]);
  const dayOfMonth = format(clickDay, 'd', { locale: koLocale });
  const dayOfWeek = format(clickDay, 'EEEE', { locale: koLocale }).slice(0, 1);

  const formattedDate = format(clickDay, 'yyyy-MM-dd');

  const handleOpenLogModal = (item: any) => {
    const logId = item.id;
    const isEdit = true;
    if (item.logType === 'CLASS_LOG') {
      openModal(ClassLogModal, { logId, scheduleId, isEdit });
    } else if (item.logType === 'PROCEEDING') {
      openModal(WorkLogModal, { logId, scheduleId, isEdit });
    } else if (item.logType === 'CONSULTATION') {
      openModal(ConsultationRecordsModal, { logId, scheduleId, isEdit });
    } else if (item.logType === 'OBSERVATION') {
      openModal(StudentRecordsModal, { logId, scheduleId, isEdit });
    }
  };
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await getAllTaskByDate(scheduleId, formattedDate);

        const { classLogs, consultations, proceedings, observations } =
          response.data;

        const allLogs = [
          ...classLogs,
          ...consultations,
          ...proceedings,
          ...observations,
        ];
        setAllLogsByDay(allLogs);
      } catch {}
    };
    getDate();
  }, []);
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={moreLogsCustomStyles(modalPosition.top, modalPosition.left)}
    >
      <>
        <SDay>
          <SDayContent>
            <SDayOfWeek>{dayOfWeek}</SDayOfWeek>
            <SDayOfMonth>{dayOfMonth}</SDayOfMonth>
          </SDayContent>
          <div>
            <IcClose onClick={onClose} className="pointer" />
          </div>
        </SDay>
        <SLogContainer>
          {allLogsByDay.map((item, idx) => (
            <SLog
              key={idx}
              color={item.color}
              onClick={() => {
                handleOpenLogModal(item);
              }}
            >
              <SLogContent>{item.title || item.studentName}</SLogContent>
            </SLog>
          ))}
        </SLogContainer>
      </>
    </ReactModal>
  );
};

export default MoreLogModal;
