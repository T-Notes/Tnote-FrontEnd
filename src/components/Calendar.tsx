import '../App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { ko } from 'date-fns/locale';
import useCurrentDate from '../hooks/useCurrentDate';

import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameMonth,
  isWeekend,
} from 'date-fns';

const SCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  align-items: center;
  padding: 10px;
`;
const SCalendarDate = styled.div`
  display: flex;
  flex-direction: column;
`;
const SWeekBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SWeek = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: bold;
  width: 100%;
  border: 1px solid blue;
`;
const SDaysBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const SDays = styled.div`
  flex: 1 0 14.2857%;
  text-align: center;
  padding: 10x;

  border: 1px solid #ccc;
`;

const Calendar = () => {
  const { currentDate, handlePrevMonth, handleNextMonth } = useCurrentDate();

  const startWeek = startOfWeek(startOfMonth(currentDate));
  const endWeek = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startWeek;

  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }
  console.log('currentDate:', currentDate);
  console.log('result:', startOfWeek(currentDate));
  return (
    <div>
      <h1>일정 관리 캘린더</h1>
      <SCalendarHeader>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentDate, 'yyyy년 MMMM', { locale: ko })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </SCalendarHeader>
      <SCalendarDate>
        <SWeekBox>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
            (week, index) => (
              <SWeek key={index}>{week}</SWeek>
            ),
          )}
        </SWeekBox>
        <SDaysBox>
          {days.map((day, index) => (
            <SDays
              key={index}
              className={isSameMonth(day, currentDate) ? 'white' : 'lightGray'}
            >
              {format(day, 'd')}
            </SDays>
          ))}
        </SDaysBox>
      </SCalendarDate>
    </div>
  );
};

export default Calendar;
