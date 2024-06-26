import styled from 'styled-components';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IcDatePicker } from '../../assets/icons';
import { useState } from 'react';

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SDatePickerBox = styled.div`
  display: flex;

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

const DatePickerWrapper = ({
  isActive,
  ...props
}: ReactDatePickerProps & { isActive: boolean }) => {
  return <DatePicker {...props} />;
};
// 달력 스타일링
const SCalender = styled(DatePickerWrapper)<{ isActive: boolean }>`
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
  color: ${(props) => (props.isActive ? '#000000' : '#A6A6A6')};
`;
const STildeIcon = styled.p`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray000};
`;
interface DateProps {
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  isActiveDateColor: boolean;
}
const DateRangePicker = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  isActiveDateColor,
}: DateProps) => {
  const [isStartActive, setIsStartActive] = useState<boolean>(false);
  const [isEndActive, setIsEndActive] = useState<boolean>(false);

  const handleDateChangeStartDate = (start: Date, end: Date) => {
    setStartDate(start);
    setIsStartActive(true);
    if (end < start) {
      setEndDate(start);
    } else {
      setEndDate(end);
    }
  };

  const handleDateChangeEndDate = (start: Date, end: Date) => {
    setStartDate(start);

    if (end < start) {
      alert('종료일이 시작일보다 빠릅니다.');
    } else {
      setEndDate(end);
      setIsEndActive(true);
    }
  };

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
              selected={startDate}
              onChange={(date: Date) =>
                handleDateChangeStartDate(date as Date, endDate as Date)
              }
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              // maxDate={new Date(endDate)}
              shouldCloseOnSelect={true}
              dateFormat="yyyy-MM-dd"
              isActive={!!isStartActive || isActiveDateColor}
            />
          </>
          <STildeIcon>~</STildeIcon>

          <SCalender
            selected={endDate}
            onChange={(date: Date) =>
              handleDateChangeEndDate(startDate as Date, date as Date)
            }
            // minDate={new Date(startDate)}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect={true}
            isActive={!!isEndActive || isActiveDateColor}
          />
        </SDatePickerBox>
      </>
    </SWrapper>
  );
};

export default DateRangePicker;
