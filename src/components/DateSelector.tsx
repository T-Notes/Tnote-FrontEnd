import styled from 'styled-components';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useRecoilState } from 'recoil';
import { startDateState, endDateState } from '../recoil/atoms/dateState';
import 'react-datepicker/dist/react-datepicker.css';

const SDatePicker = styled.div`
  display: flex;
  .dateInput {
    border: none;
    width: 280px;
    height: 24px;
    color: var(--Black-Black_60, #a6a6a6);
    text-align: center;
    font-family: Pretendard; //font 적용확인할것.
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .wave {
    color: #5b5b5b;
  }
`;
const DateSelector = () => {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [isAllDay, setIsAllDay] = useState<boolean>(false);

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };

  //종일 버튼 토글
  const handleAllDayToggle = () => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0,
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
    );
    if (isAllDay) {
      //종일 버튼 해제 시
      setStartDate(new Date());
      setEndDate(new Date());
    } else {
      // 종일 버튼 선택 시
      setStartDate(startOfDay);
      setEndDate(endOfDay);
    }
    // 종일 여부도 부모 컴포넌트로 전달
    setIsAllDay(!isAllDay);
  };

  return (
    <SDatePicker>
      <DatePicker
        selected={startDate} //선택된 날짜를 나타내는 속성
        onChange={(date) => handleDateChange(date as Date, endDate)} //날짜가 선택되었을때 호출되는 콜백 함수
        showTimeSelect // 시간 선택 옵션 표시
        timeFormat="HH:mm" // 시간 표시 형식을 지정하는 문자열 (24시간 형식)
        timeIntervals={30} // 시간 선택 옵션에서 표시할 분 간격
        dateFormat="yyyy-MM-dd (eee) HH:mm" // 날짜 표시 형식
        timeCaption="시간"
        className="dateInput"
      />
      <div className="wave">{'~'}</div>

      <DatePicker
        selected={endDate}
        onChange={(date) => handleDateChange(startDate, date as Date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="yyyy-MM-dd (eee) HH:mm"
        className="dateInput"
      />

      <label>
        <input
          type="checkbox"
          checked={isAllDay}
          onChange={handleAllDayToggle}
        />
        종일
      </label>
    </SDatePicker>
  );
};

export default DateSelector;
