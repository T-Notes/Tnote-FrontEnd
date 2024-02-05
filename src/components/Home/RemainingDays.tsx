import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import { getRemainingDayData } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

const RemainingDays = () => {
  const { id } = useParams(); //현재 url에서 추출한 동적으로 변하는 id값
  console.log('남은학기 일수 scheduleId:', id);
  const [remainingDay, setRemainingDay] = useState<string | null>(null);
  // 고민1. formattedDate형식으로 넘겨주면 되는건가?
  const { currentDate } = useCurrentDate();
  const formattedDate = currentDate.toISOString().split('T')[0];
  // console.log('remainingDate:', formattedDate);

  useEffect(() => {
    const remainingDayData = async () => {
      try {
        const response = await getRemainingDayData(id, formattedDate);
        setRemainingDay(response);
      } catch (err) {
        console.log(err);
      }
    };
    remainingDayData();
  }, []);

  return (
    <>
      <p>이번 학기 남은 일수</p>
      <div>
        <p>{remainingDay || '생성된 학기 없음'}</p>
      </div>
    </>
  );
};

export default RemainingDays;
