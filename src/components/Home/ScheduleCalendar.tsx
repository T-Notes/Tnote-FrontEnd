import '../../App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
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

const SCalendarWrapper = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 500px;
`;

const SCalendarHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20%;
  align-items: center;
  margin-bottom: 10px;
`;
const SCalendarDate = styled.div`
  height: 400px;
`;

const SWeekBox = styled.div`
  display: flex;

  width: 100%;
  /* padding: 10px 0px; */
  justify-content: space-around;
  border-bottom: 5px solid gray;
  background-color: ${({ theme }) => theme.colors.blue400};
  font-size: 14px;
  font-weight: 600;
  color: #2f2f2f;
`;
const SWeek = styled.div`
  padding: 10px;
`;
const SDaysBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%; // 이 값의 설정에 따라 내부 달력 높이가 달라짐
  flex-wrap: wrap;
`;
const SDays = styled.div`
  border: 1px solid #ccc;
  border-top: none;
  flex: 1;
  height: auto;
  flex: 1 0 14%; // 한 줄에 요소 아이템이 7개씩 들어가도록 간격 맞추기
  padding: 5px;
`;

const ScheduleCalendar = () => {
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
    <SCalendarWrapper>
      <button onClick={handleCurrentDate}>오늘</button>
      <SCalendarHeader>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentDate, 'yyyy년 MMMM', { locale: ko })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </SCalendarHeader>

      <SCalendarDate>
        <SWeekBox>
          {['일', '월', '화', '수', '목', '금', '토'].map((week, index) => (
            <SWeek key={index}>{week}</SWeek>
          ))}
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
      {/* <AddScheduleBtn /> */}
    </SCalendarWrapper>
  );
};

export default ScheduleCalendar;
