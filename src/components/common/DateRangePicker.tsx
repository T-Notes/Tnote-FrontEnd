import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SDateInput } from '../common/styled/Input';
import { IcDatePicker } from '../../assets/icons';
import React, { useEffect, useState } from 'react';

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
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
}
const DateRangePicker = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
}: DateProps) => {
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
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
              onChange={(date) =>
                handleDateChange(date as Date, endDate as Date)
              }
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              // maxDate={new Date(endDate)}
              shouldCloseOnSelect={true}
              dateFormat="yyyy-MM-dd"
            />
          </>
          <STildeIcon>~</STildeIcon>

          <SCalender
            selected={endDate}
            onChange={(date) =>
              handleDateChange(startDate as Date, date as Date)
            }
            // minDate={new Date(startDate)}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect={true}
          />
        </SDatePickerBox>
      </>
    </SWrapper>
  );
};

export default DateRangePicker;
