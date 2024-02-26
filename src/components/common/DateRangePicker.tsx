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

  // 날짜를 "yyyy-mm-dd" 형식의 문자열로 변환하는 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };

  // 부모 컴포넌트에 날짜 데이터를 "yyyy-mm-dd" 형식으로 보내기
  useEffect(() => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    onStartDateChange(formattedStartDate, formattedEndDate);
  }, [startDate, endDate]);

  return (
    <>
      <IcDatePicker />
      {/* <div>기간</div>
      <p>*</p> */}
      <>
        <SDatePickerBox>
          <>
            <SCalender
              selected={startDate} //선택된 날짜를 나타내는 속성
              onChange={(date) => handleDateChange(date as Date, endDate)} //날짜가 선택되었을때 호출되는 콜백 함수
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              // maxDate={new Date(endDate)}
              // 아래 속성들은 글쓰기 모달에서만 필요한 값.
              // showTimeSelect // 시간 선택 옵션 표시
              // timeFormat="HH:mm" // 시간 표시 형식을 지정하는 문자열 (24시간 형식)
              // timeIntervals={30} // 시간 선택 옵션에서 표시할 분 간격
              // timeCaption="시간"
              shouldCloseOnSelect={true} // 날짜 클릭 시 자동으로 닫히는 속성
              dateFormat="yyyy-MM-dd" // 날짜 표시 형식
            />
          </>
          <STildeIcon>~</STildeIcon>

          <SCalender
            selected={endDate}
            onChange={(date) => handleDateChange(startDate, date as Date)}
            minDate={new Date(startDate)}
            // showTimeSelect
            // timeFormat="HH:mm"
            // timeIntervals={30}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect={true}
          />
        </SDatePickerBox>
      </>
    </>
  );
};

export default DateRangePicker;
