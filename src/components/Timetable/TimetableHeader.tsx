import { tr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { getRemainingDayData } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
const STimetableHeader = styled.h1`
  padding-top: 20px;
  font-size: 20px;
  font-weight: 600;
`;
const SColorBlue = styled.span`
  color: #4987ff;
`;
interface IsClassAddProps {
  onClassAdd: () => void;
}
const TimetableHeader = () => {
  const { scheduleId } = useParams(); //현재 url에서 추출한 동적으로 변하는 id값
  const { currentDate } = useCurrentDate();
  const date = currentDate.toISOString().split('T')[0];
  const [remainingDay, setRemainingDay] = useState<number>(0);
  const current = new Date();
  const newCurrent = current.toISOString().slice(0, 10);
  const [data, setData] = useState<number>(0);
  useEffect(() => {
    if (scheduleId) {
      const remainingDayData = async () => {
        try {
          const response = await getRemainingDayData(scheduleId, newCurrent);

          setRemainingDay(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      remainingDayData();

      const getData = async () => {
        const res = await instanceAxios.get(
          `/tnote/schedule/leftClasses/${scheduleId}`,
        );
        setData(res.data.data);
      };
      getData();
    }
  }, [scheduleId]);

  return (
    <>
      <STimetableHeader>
        <span>
          {' '}
          이번 학기의 총 수업 횟수는{' '}
          <SColorBlue>
            {' '}
            {typeof remainingDay === 'number' ? data : '0'}회{' '}
          </SColorBlue>
          ,
        </span>
        <span>
          {' '}
          남은 학기 일수는{' '}
          <SColorBlue>
            {' '}
            {typeof remainingDay === 'number' ? remainingDay : '0'}일{' '}
          </SColorBlue>
          입니다.
        </span>
      </STimetableHeader>
    </>
  );
};

export default TimetableHeader;
