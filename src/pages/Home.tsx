import { useState } from 'react';

import DateCalendar from '../components/DateCalendar';
import Calendar from '../components/Calendar';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // 선택된 날짜에 대한 추가 동작 수행 가능
  };

  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar />

      {/* <DateCalendar
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      /> */}
      {/* <select>
//         <option>2023년 3학년 2학기</option>
//         <option>2023년 3학년 1학기</option>
//         <option>2022년 2학년 2학기</option>
//         <option>2022년 2학년 1학기</option>
//         <option>2021년 3학년 1학기</option>
//       </select>
//       <button>설정</button>
//       <div>오늘 수업 일정</div>
//       <div className="classSchedule">
//         <span className="todayClass">1교시</span>
//         <span className="todayClass">2교시</span>
//         <span className="todayClass">3교시</span>
//         <span className="todayClass">4교시</span>
//         <span className="todayClass">5교시</span>
//         <span className="todayClass">6교시</span>
//         <span className="todayClass">7교시</span>
//         <span className="todayClass">8교시</span>
//         <span className="todayClass">9교시</span>
//       </div> */}
    </div>
  );
};

export default Home;
