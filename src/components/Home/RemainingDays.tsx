import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import { getRemainingDayData } from '../../utils/lib/api';

interface SemesterDateProps {
  startDate: string;
  endDate: string;
}
const RemainingDays = () => {
  const { id } = useParams(); //현재 url에서 추출한 동적으로 변하는 id값
  console.log('남은학기 일수 scheduleId:', id);
  const [remainingDay, setRemainingDay] = useState<string | null>(null);
  // 궁금증 1: 생성된 학기의 scheduleId를 알려줬는데 startDate,endDate 값을 또 던져줘야하나??
  const [semesterDate, setSemesterDate] = useState<SemesterDateProps>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const remainingDayData = async () => {
      try {
        const response = await getRemainingDayData(id, semesterDate);
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
