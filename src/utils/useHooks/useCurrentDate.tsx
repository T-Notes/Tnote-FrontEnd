import { useState, useEffect } from 'react';
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

  return {
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    setCurrentDate,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };
};
