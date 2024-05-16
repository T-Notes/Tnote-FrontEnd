import styled from 'styled-components';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import { IcClose } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { getAllTaskByDate } from '../../../utils/lib/api';
import useRandomColor from '../../../utils/useHooks/useRandomColor';
import ReactModal from 'react-modal';

const moreLogsCustomStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px 0px #0000004d',
    width: '210px',
    height: '230px',
    padding: '10px',
    border: '1px solid #D5D5D5',
    borderRadius: '12px',
  },
};

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
  font-size: 13px;
  font-weight: 600;
  width: auto;
  display: flex;
  padding: 10px 10px 10px 16px;
  margin-bottom: 2px;
  margin-right: 3px;
  background-color: ${({ color }) => color};
  overflow-y: scroll;
`;
const SLogContainer = styled.div`
  max-height: 145px;
  overflow-y: auto;
`;
const SDayOfWeek = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #2f2f2f;
  padding-bottom: 3.5px;
`;
const SDayOfMonth = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #2f2f2f;
`;
interface MoreLogs {
  clickDay: Date | undefined;
  isOpen: boolean;
  onClose: () => void;
  scheduleId: string;
}

const MoreLogModal = ({ clickDay, isOpen, onClose, scheduleId }: MoreLogs) => {
  if (!clickDay) return null;
  const getRandomColor = useRandomColor();
  const [allLogsByDay, setAllLogsByDay] = useState<any[]>([]);
  const dayOfMonth = format(clickDay, 'd', { locale: koLocale });
  const dayOfWeek = format(clickDay, 'EEEE', { locale: koLocale }).slice(0, 1);

  const formattedDate = format(clickDay, 'yyyy-MM-dd');

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
      style={moreLogsCustomStyles}
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
            <SLog key={idx} color={getRandomColor()}>
              {item.title || item.studentName}
            </SLog>
          ))}
        </SLogContainer>
      </>
    </ReactModal>
  );
};

export default MoreLogModal;
