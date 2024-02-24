import { useEffect, useState } from 'react';
import styled from 'styled-components';

const STodayScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const SFont = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray000};
  margin-bottom: 10px;
  margin-top: 30px;
  padding-left: 10px;
`;
const SClass = styled.div`
  color: ${({ theme }) => theme.colors.gray000};
  font-size: 12px;
  font-weight: 600;
  padding: 10px;
`;
const SSchedule = styled.div`
  display: flex;
  /* width: 250px; */
  height: 80px;
  background-color: ${({ theme }) => theme.colors.blue400};
`;
const TodaySchedule = () => {
  const [lastClass, setLastClass] = useState<string>('9교시');
  const lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10); // '8교시'형태로 반환되는 값 중에서 문자열을 제외하고 숫자만 추출하는 정규식

  const timetables: any = {
    1: '1교시',
    2: '2교시',
    3: '3교시',
    4: '4교시',
    5: '5교시',
    6: '6교시',
    7: '7교시',
    8: '8교시',
    9: '9교시',
  };

  useEffect(() => {
    if (lastClass === '') {
      // 유저가 선택하기 전이라면 기본 값 9교시로 설정.
      console.log('기본값 9교시');
    } else {
      // 유저가 마지막 교시를 선택했다면, 해당 교시까지의 시간표 출력.

      // 선택한 교시까지의 시간표 출력
      for (let hour = 1; hour <= lastClassNumber; hour++) {}
    }
  }, [lastClass]);

  return (
    <>
      <STodayScheduleWrapper>
        <SFont>오늘 수업 일정</SFont>
        <SSchedule>
          {/* 선택한 교시까지의 시간표 출력 */}
          {Array.from({ length: lastClassNumber }, (_, index) => index + 1).map(
            (hour) => (
              <SClass key={hour}>{timetables[hour]}</SClass>
            ),
          )}
        </SSchedule>
      </STodayScheduleWrapper>
    </>
  );
};

export default TodaySchedule;
