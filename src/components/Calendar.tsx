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
import TodayBtn from './TodayBtn';

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
  const { currentDate, handlePrevMonth, handleNextMonth, setCurrentDate } =
    useCurrentDate();

  const startWeek = startOfWeek(startOfMonth(currentDate)); // 이번 달 첫 주 날짜 (전월일 포함)
  const endWeek = endOfWeek(endOfMonth(currentDate)); //이번 달 말일 날짜 (다음 달 포함)

  const days = [];
  let day = startWeek;

  // 한달 안에 들어가야 하는 날짜들을 days[]에 push
  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  //   // 현재날짜로 돌아오기
  const handleCurrentDate = () => {
    setCurrentDate(startOfMonth(new Date())); //현재 날짜로 업데이트
  };
  return (
    <div>
      <h1>일정 관리 캘린더</h1>
      <TodayBtn onClickToday={handleCurrentDate} />
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
              <div className={isToday(day) ? 'todayColor' : ''}>
                {format(day, 'd')}
              </div>
            </SDays>
          ))}
        </SDaysBox>
      </SCalendarDate>
    </div>
  );
};

export default Calendar;
