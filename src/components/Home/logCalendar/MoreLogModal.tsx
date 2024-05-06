import styled from 'styled-components';
import { ModalNoBlackBackground } from '../../common/styled/ModalLayout';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import { IcClose } from '../../../assets/icons';
import { useEffect, useState } from 'react';

import { getAllTaskByDate } from '../../../utils/lib/api';
import { useParams } from 'react-router-dom';
import useRandomColor from '../../../utils/useHooks/useRandomColor';

const SModalLayout = styled.div`
  width: 208px;
  height: 221px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000004d;
`;

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
  max-height: 150px;
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
  closeMoreLogsModal: () => void;
}

const MoreLogModal = ({ clickDay, closeMoreLogsModal }: MoreLogs) => {
  if (!clickDay) return null;
  const { scheduleId } = useParams();
  const getRandomColor = useRandomColor();
  const [allLogsByDay, setAllLogsByDay] = useState<any[]>([]);
  const dayOfMonth = format(clickDay, 'd', { locale: koLocale });
  const dayOfWeek = format(clickDay, 'EEEE', { locale: koLocale }).slice(0, 1);

  const formattedDate = format(clickDay, 'yyyy-MM-dd');

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await getAllTaskByDate(scheduleId, formattedDate);
        console.log('결과', response);
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
    <ModalNoBlackBackground onClick={closeMoreLogsModal}>
      <SModalLayout
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <SDay>
          <SDayContent>
            <SDayOfWeek>{dayOfWeek}</SDayOfWeek>
            <SDayOfMonth>{dayOfMonth}</SDayOfMonth>
          </SDayContent>
          <div>
            <IcClose onClick={closeMoreLogsModal} className="pointer" />
          </div>
        </SDay>
        <SLogContainer>
          {allLogsByDay.map((item, idx) => (
            <SLog key={idx} color={getRandomColor()}>
              {item.title || item.studentName}
            </SLog>
          ))}
        </SLogContainer>
      </SModalLayout>
    </ModalNoBlackBackground>
  );
};

export default MoreLogModal;
