import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import PrivacyPolicyCheckbox from '../Landing/PrivacyPolicyCheckbox';
import { useToggle } from '../../utils/useHooks/useToggle';

const SDatePickerBox = styled.div`
  display: flex;
  align-items: center;
`;

// 달력 스타일링
const SCalender = styled(DatePicker)`
  display: flex;
  border: none;
  border-bottom: 1px solid #e8e8e8;
  width: 210px;
  height: 16px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ theme }) => theme.fonts.caption3}
  color:   ${({ theme }) => theme.colors.gray100};
`;
const STildeIcon = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray000};
`;

const SAllDay = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 25px;
`;

const SAllDayText = styled.span`
  color: ${({ theme }) => theme.colors.gray000};
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 0.5rem;
`;

interface DateProps {
  onStartDateChange: (
    startDate: Date,
    endDate: Date,
    isAllDay: boolean,
  ) => void;
  onStartDate: string | Date;
  onEndDate: string | Date;
}

const WriteDatePicker = ({
  onStartDateChange,
  onStartDate,
  onEndDate,
}: DateProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const { isToggle, handleChangeToggle } = useToggle();

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };

  const handleAllDayToggle = () => {
    handleChangeToggle();
    const today = new Date();
    const startAllDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
    );
    const endAllDay = new Date(
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
      setStartDate(startAllDay);
      setEndDate(endAllDay);
    }
    setIsAllDay(!isAllDay);
  };

  // 부모 컴포넌트에 날짜 data 보내기
  useEffect(() => {
    onStartDateChange(startDate, endDate, isAllDay);
  }, [startDate, endDate, isAllDay]);

  return (
    <>
      <SDatePickerBox>
        <SCalender
          selected={onStartDate ? new Date(onStartDate) : startDate}
          onChange={(date) => handleDateChange(date as Date, endDate)}
          minDate={new Date('2000-01-01')}
          // maxDate={new Date(endDate)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="시간"
          shouldCloseOnSelect={true}
          dateFormat="yyyy-MM-dd (eee) HH:mm"
        />
        <STildeIcon>~</STildeIcon>
        <SCalender
          selected={onEndDate ? new Date(onEndDate) : endDate}
          onChange={(date) => handleDateChange(startDate, date as Date)}
          // minDate={new Date(startDate)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd (eee) HH:mm"
          shouldCloseOnSelect={true}
        />
        <SAllDay>
          <PrivacyPolicyCheckbox
            isChecked={isToggle}
            onCheckboxChange={handleAllDayToggle}
          />
          <SAllDayText>종일</SAllDayText>
        </SAllDay>
      </SDatePickerBox>
    </>
  );
};

export default WriteDatePicker;
