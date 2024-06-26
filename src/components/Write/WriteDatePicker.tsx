import styled from 'styled-components';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import PrivacyPolicyCheckbox from '../Landing/PrivacyPolicyCheckbox';
import { useToggle } from '../../utils/useHooks/useToggle';

const SDatePickerBox = styled.div`
  display: flex;
  align-items: center;
`;

const DatePickerWrapper = ({
  isActive,
  ...props
}: ReactDatePickerProps & { isActive: boolean }) => {
  return <DatePicker {...props} />;
};

const SCalender = styled(DatePickerWrapper)<{ isActive: boolean }>`
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
  color: ${(props) => (props.isActive ? '#000000' : '#A6A6A6')};
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
  isEdit: boolean;
}

const WriteDatePicker = ({
  onStartDateChange,
  onStartDate,
  onEndDate,
  isEdit,
}: DateProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [isStartActive, setIsStartActive] = useState<boolean>(false);
  const [isEndActive, setIsEndActive] = useState<boolean>(false);
  const { isToggle, handleChangeToggle } = useToggle();

  const handleDateChangeStartDate = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setIsStartActive(true);
      if (endDate < date) {
        setEndDate(date);
      }
    }
  };

  const handleDateChangeEndDate = (date: Date | null) => {
    if (date) {
      if (date < startDate) {
        alert('종료일이 시작일보다 빠릅니다.');
      } else {
        setEndDate(date);
        setIsEndActive(true);
      }
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
      // 종일 버튼 해제 시
      setStartDate(new Date());
      setEndDate(new Date());
      setIsStartActive(false);
      setIsEndActive(false);
    } else {
      // 종일 버튼 선택 시
      setStartDate(startAllDay);
      setEndDate(endAllDay);
      setIsStartActive(true);
      setIsEndActive(true);
    }
    setIsAllDay(!isAllDay);
  };

  useEffect(() => {
    if (isEdit) {
      setIsStartActive(true);
      setIsEndActive(true);
    }
    onStartDateChange(startDate, endDate, isAllDay);
  }, [startDate, endDate, isAllDay]);

  return (
    <>
      <SDatePickerBox>
        <SCalender
          selected={onStartDate ? new Date(onStartDate) : startDate}
          onChange={(date: Date) => handleDateChangeStartDate(date as Date)}
          minDate={new Date('2000-01-01')}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="시간"
          shouldCloseOnSelect={true}
          dateFormat="yyyy-MM-dd (eee) HH:mm"
          isActive={isStartActive}
        />
        <STildeIcon>~</STildeIcon>
        <SCalender
          selected={onEndDate ? new Date(onEndDate) : endDate}
          onChange={(date: Date) => handleDateChangeEndDate(date as Date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd (eee) HH:mm"
          shouldCloseOnSelect={true}
          isActive={isEndActive}
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
