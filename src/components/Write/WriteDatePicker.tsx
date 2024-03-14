import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SDateInput } from '../common/styled/Input';
import { IcDatePicker } from '../../assets/icons';
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
  onStartDateChange: (startDate: any, endDate: any, isAllDay: boolean) => void;
}

const WriteDatePicker = ({ onStartDateChange }: DateProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (end < start) {
      alert('시작일보다 종료일이 빠릅니다.');
    }
  };

  //종일 버튼 토글
  const handleAllDayToggle = () => {
    handleChangeToggle();
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

  // 부모 컴포넌트에 날짜 data 보내기
  useEffect(() => {
    console.log(startDate);

    onStartDateChange(startDate, endDate, isAllDay);
  }, [startDate, endDate, isAllDay]);

  return (
    <>
      <SDatePickerBox>
        <SCalender
          selected={startDate} //선택된 날짜를 나타내는 속성
          onChange={(date) => handleDateChange(date as Date, endDate)} //날짜가 선택되었을때 호출되는 콜백 함수
          minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
          // maxDate={new Date(endDate)}
          // 아래 속성들은 글쓰기 모달에서만 필요한 값.
          showTimeSelect // 시간 선택 옵션 표시
          timeFormat="HH:mm" // 시간 표시 형식을 지정하는 문자열 (24시간 형식)
          timeIntervals={30} // 시간 선택 옵션에서 표시할 분 간격
          timeCaption="시간"
          shouldCloseOnSelect={true} // 날짜 클릭 시 자동으로 닫히는 속성
          dateFormat="yyyy-MM-dd (eee) HH:mm" // 날짜 표시 형식
        />
        <STildeIcon>~</STildeIcon>
        <SCalender
          selected={endDate}
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
