// useCurrentDate.tsx
import { useState, useEffect } from 'react';
import { subMonths, addMonths } from 'date-fns';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //현재 달에서 -1
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };
  //현재 달에서 +1
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  useEffect(() => {
    // 예를 들어 컴포넌트가 처음 마운트될 때 또는 currentDate가 변경될 때 실행할 코드 작성
  }, [currentDate]);
  return { currentDate, handlePrevMonth, handleNextMonth, setCurrentDate };
};

export default useCurrentDate;
