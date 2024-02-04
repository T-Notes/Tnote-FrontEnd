import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';
import { getRemainingDayData } from '../../utils/lib/api';

interface SemesterDateProps {
  startDate: string;
  endDate: string;
}
const RemainingDays = () => {
  const [remainingDay, setRemainingDay] = useState<string | null>(null);
  const [semesterDate, setSemesterDate] = useState<SemesterDateProps>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const remainingDayData = async () => {
      try {
        const response = await getRemainingDayData(semesterDate);
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
