import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTodayTimetable } from '../../utils/lib/api';
import { colorMapping } from '../../utils/colorMapping';

const STodayScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;
const SFont = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray000};
  margin-bottom: 10px;
  margin-top: 30px;
  padding-left: 10px;
`;
const SClassContainer = styled.div`
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  white-space: nowrap; /* 글자가 넘칠 경우 줄바꿈을 방지합니다. */
  text-overflow: ellipsis; /* 넘어간 텍스트를 생략 부호(...)로 표시합니다. */
`;
const SClass = styled.div``;

const SSchedule = styled.div`
  display: flex;
  width: 600px;
  color: ${({ theme }) => theme.colors.gray000};
  padding: 15px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.blue400};
`;

const STodayClassWrapper = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  padding: 10px;
  width: auto;
  height: 100%;
  background-color: ${({ color }) => color || '#fffff'};
`;
const STimetables = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
`;
interface TodayClass {
  subjectName: string;
  classTime: string;
  classDay: string;
  classLocation: string;
  color: string;
}
const TodaySchedule = () => {
  const { scheduleId } = useParams();
  const [todayClass, setTodayClass] = useState<TodayClass[]>([]);
  const currentDae = new Date();
  const todayOfNumber = currentDae.getDay();

  const daysOfWeek = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];
  const today = daysOfWeek[todayOfNumber];

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

  // 오늘 수업일정 조회
  useEffect(() => {
    if (scheduleId) {
      const getTodaySchedule = async () => {
        try {
          const response = await getTodayTimetable(scheduleId, today);
          setTodayClass(response.data);
        } catch {}
      };
      getTodaySchedule();
    }
  }, [scheduleId]);

  return (
    <>
      <STodayScheduleWrapper>
        <SFont>오늘 수업 일정</SFont>
        <SSchedule>
          {Array.from({ length: 9 }, (_, index) => index + 1).map((hour) => (
            <SClassContainer key={hour}>
              <SClass>
                <STimetables>{timetables[hour]}</STimetables>
                {todayClass.map((item, index) => {
                  const classTimeChange = parseInt(item.classTime.slice(0, 1));
                  const backgroundColor = colorMapping[item.color] || '';
                  return (
                    <div key={index}>
                      {classTimeChange === hour ? (
                        <STodayClassWrapper color={backgroundColor}>
                          <div>{item.classLocation}</div>
                          <div>{item.subjectName}</div>
                        </STodayClassWrapper>
                      ) : null}
                    </div>
                  );
                })}
              </SClass>
            </SClassContainer>
          ))}
        </SSchedule>
      </STodayScheduleWrapper>
    </>
  );
};

export default TodaySchedule;
