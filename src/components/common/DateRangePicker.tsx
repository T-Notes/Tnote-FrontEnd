import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SDateInput } from '../common/styled/Input';
import { IcDatePicker } from '../../assets/icons';
import { useEffect, useState } from 'react';

const SDatePickerBox = styled.div`
  display: flex;
  width: 710px;
  height: 56px;
  align-items: center;
  gap: 28px;
`;
// const SDatePicker = styled(SDateInput)`
//   .date_picker {
//     border: 1px solid black;
//     /* width: 308px;
//     height: 345px; */
//     ${({ theme }) => theme.fonts.caption2}
//     color:   ${({ theme }) => theme.colors.gray100};
//   }
// `;

// 달력 스타일링
const SCalender = styled(DatePicker)`
  display: flex;
  border-bottom: #a6a6a6;
  width: 320px;
  height: 24px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  border: 1px solid black;

  ${({ theme }) => theme.fonts.caption2}
  color:   ${({ theme }) => theme.colors.gray100};
`;
const STildeIcon = styled.p`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray000};
`;
interface DateProps {
  onStartDateChange: (startDate: any, endDate: any) => void;
}
const DateRangePicker = ({ onStartDateChange }: DateProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //   const [isAllDay, setIsAllDay] = useState<boolean>(false);

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };
  // 부모 컴포넌트에 날짜 data 보내기
  useEffect(() => {
    onStartDateChange(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <>
      <IcDatePicker />
      <div>기간</div>
      <p>*</p>
      <>
        <SDatePickerBox>
          <>
            <SCalender
              selected={startDate} //선택된 날짜를 나타내는 속성
              onChange={(date) => handleDateChange(date as Date, endDate)} //날짜가 선택되었을때 호출되는 콜백 함수
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              showTimeSelect // 시간 선택 옵션 표시
              timeFormat="HH:mm" // 시간 표시 형식을 지정하는 문자열 (24시간 형식)
              timeIntervals={30} // 시간 선택 옵션에서 표시할 분 간격
              timeCaption="시간"
              dateFormat="yyyy-MM-dd (eee) HH:mm" // 날짜 표시 형식
            />
          </>
          <STildeIcon>~</STildeIcon>

          <SCalender
            selected={endDate}
            onChange={(date) => handleDateChange(startDate, date as Date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy-MM-dd (eee) HH:mm"
          />
        </SDatePickerBox>
      </>
    </>
  );
};

export default DateRangePicker;
