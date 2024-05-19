import { useState } from 'react';
import { subMonths, addMonths } from 'date-fns';

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //현재 달에서 -1
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };
  //현재 달에서 +1
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const formatNumber = (num: number) => {
    return num < 10 ? '0' + num : num;
  };

  return {
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    setCurrentDate,
    year: currentDate.getFullYear(),
    month: formatNumber(currentDate.getMonth() + 1),
    day: formatNumber(currentDate.getDate()),
  };
};
