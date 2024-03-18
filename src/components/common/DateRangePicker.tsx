import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SDateInput } from '../common/styled/Input';
import { IcDatePicker } from '../../assets/icons';
import { useEffect, useState } from 'react';

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SDatePickerBox = styled.div`
  display: flex;
  /* width: 710px; */
  /* height: 56px; */
  align-items: center;
  gap: 20px;
`;
const SDateIc = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  padding-right: 30px;
`;
const SDate = styled.div`
  padding-left: 5px;
  > span {
    color: #632cfa;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

// 달력 스타일링
const SCalender = styled(DatePicker)`
  display: flex;
  border: none;
  border-bottom: 1px solid #e8e8e8;
  width: 270px;
  height: 24px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;

  ${({ theme }) => theme.fonts.button1}
  color:   ${({ theme }) => theme.colors.gray100};
`;
const STildeIcon = styled.p`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray000};
`;
interface DateProps {
  onStartDateChange: (startDate: Date, endDate: Date) => void;
}
const DateRangePicker = ({ onStartDateChange }: DateProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [value, setValue] = useState(serverStartDate || new Date());
  // console.log(1, value);

  // useEffect(() => {
  //   if (serverStartDate) {
  //     console.log(2, serverStartDate);
  //     setValue(serverStartDate);
  //   } else {
  //     setValue(new Date());
  //   }
  // }, []);

  // 날짜를 "yyyy-mm-dd" 형식의 문자열로 변환하는 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    // setValue(start);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };

  // console.log(3, value);

  // 부모 컴포넌트에 날짜 데이터를 "yyyy-mm-dd" 형식으로 보내기
  useEffect(() => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    // console.log(typeof formattedStartDate, typeof formattedEndDate); // string

    onStartDateChange(startDate, endDate);
    // onStartDateChange(
    //   JSON.stringify(formattedStartDate),
    //   JSON.stringify(formattedEndDate),
    // );
    // console.log(4, value);
  }, [startDate, endDate]);

  return (
    <SWrapper>
      <SDateIc>
        <IcDatePicker />
        <SDate>
          기간
          <span>*</span>
        </SDate>
      </SDateIc>
      <>
        <SDatePickerBox>
          <>
            <SCalender
              selected={startDate} //선택된 날짜를 나타내는 속성
              onChange={(date) => handleDateChange(date as Date, endDate)} //날짜가 선택되었을때 호출되는 콜백 함수
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              // maxDate={new Date(endDate)}
              shouldCloseOnSelect={true} // 날짜 클릭 시 자동으로 닫히는 속성
              dateFormat="yyyy-MM-dd" // 날짜 표시 형식
            />
          </>
          <STildeIcon>~</STildeIcon>

          <SCalender
            selected={endDate}
            onChange={(date) => handleDateChange(startDate, date as Date)}
            minDate={new Date(startDate)}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect={true}
          />
        </SDatePickerBox>
      </>
    </SWrapper>
  );
};

export default DateRangePicker;
