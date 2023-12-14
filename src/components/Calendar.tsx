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
  justify-content: space-around;
  width: 20%;
  align-items: center;
  margin-bottom: 10px;
`;
const SCalendarDate = styled.div`
  padding-left: 20px;
`;

const SWeekBox = styled.div`
  display: flex;
  width: 70%;
  padding: 10px 0px;
  justify-content: space-around;
  border-bottom: 5px solid gray;
`;
const SWeek = styled.div`
  font-weight: bold;
  width: 100%;
`;
const SDaysBox = styled.div`
  display: flex;
  width: 70%;
  flex-wrap: wrap;
`;
const SDays = styled.div`
  border: 1px solid #ccc;
  border-top: none;
  flex: 1 0 14%; // 한 줄에 요소 아이템이 7개씩 들어가도록 간격 맞추기
  padding-bottom: 100px;
  padding-top: 5px;
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
