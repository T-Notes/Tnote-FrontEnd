import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';

const RemainingDays = () => {
  const [remainingDay, setRemainingDay] = useState<string | null>(null);

  useEffect(() => {
    // const remainingDayData = async () => {
    //   try {
    //     const res = await instanceAxios.get('/schedule/leftClassDays');
    //     setRemainingDay(res.data.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // remainingDayData();
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
