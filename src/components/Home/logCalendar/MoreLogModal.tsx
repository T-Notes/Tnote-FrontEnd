import styled from 'styled-components';
import {
  ModalLayout,
  ModalNoBlackBackground,
} from '../../common/styled/ModalLayout';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import { IcClose, IcCloseSmall } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { addQuarters } from 'date-fns/esm';
import { getAllTaskByDate } from '../../../utils/lib/api';
import { useParams } from 'react-router-dom';

const SModalLayout = styled.div`
  width: 208px;
  height: 221px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000004d;
`;
interface MoreLogs {
  clickDay: Date | undefined;
  closeMoreLogsModal: () => void;
}
const MoreLogModal = ({ clickDay, closeMoreLogsModal }: MoreLogs) => {
  if (!clickDay) return null;
  const { scheduleId } = useParams();

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
        <IcClose onClick={closeMoreLogsModal} className="pointer" />
        <div>{dayOfMonth}</div>
        <div>{dayOfWeek}</div>
        {allLogsByDay.map((item, idx) => (
          <div key={idx}> {item.title || item.studentName}</div>
        ))}
      </SModalLayout>
    </ModalNoBlackBackground>
  );
};

export default MoreLogModal;
