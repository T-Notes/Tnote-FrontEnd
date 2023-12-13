// src/Calendar.tsx
import React, { useState } from 'react';

import { ko } from 'date-fns/locale';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from 'date-fns';
import '../App.css';

interface DateCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DateCalendar = ({ selectedDate, onSelectDate }: DateCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //현재 달에서 -1
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  //현재 달에서 +1
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  // eachDayOfInterval: start와 end 사이 날짜 배열을 반환, startOfMonth : 현재 달의 시작일, endOfMonth : 현재 달의 끝일
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentDate, 'yyyy년 MMMM', { locale: ko })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        {daysInMonth.map((day) => (
          <div
            key={day.toString()}
            className={`day ${isToday(day) ? 'today' : ''} ${
              isSameMonth(day, currentDate) ? '' : 'inactive'
            }`}
            onClick={() => onSelectDate(day)}
          >
            {format(day, 'd')}
            {/* //해당 날짜의 일부분만 추출하려 문자열 반환 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateCalendar;
