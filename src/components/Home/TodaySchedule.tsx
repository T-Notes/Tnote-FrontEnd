import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTodayTimetable } from '../../utils/lib/api';
import { colorMapping, pointColorMapping } from '../../utils/colorMapping';

const STodayScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;
const SFont = styled.div`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 600;
  line-height: 27.45px;
  text-align: left;
  color: #5b5b5b;
  white-space: nowrap;
  @media (max-width: 1439px) {
    font-size: 23px;
  }

  @media (max-width: 1279px) {
    font-size: 20px;
  }

  @media (max-width: 1023px) {
    font-size: 18px;
  }
  padding: 10px 10px 10px 20px;
  margin-top: 27px;
`;
const SClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #5b5b5b;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SSchedule = styled.div`
  display: flex;
  width: 39.8vw;
  padding: 15px 23px;
  height: 12vh;
  background-color: #f7f9fc;

  @media (max-width: 1439px) {
    /* font-size: 24px; */
  }

  @media (max-width: 1279px) {
    /* font-size: 22px; */
  }

  @media (max-width: 1023px) {
    /* font-size: 20px; */
  }

  @media (max-width: 1080px) {
    width: 60vw;
    flex: 1;
  }
  @media (max-width: 960px) {
    width: 65vw;
  }
`;

const STodayClassWrapper = styled.div<{ color: string; $pointColor: string }>`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: auto;
  overflow: hidden;
  height: 7vh;
  border-left: 5px solid ${({ $pointColor }) => $pointColor || '#fffff'};
  background-color: ${({ color }) => color || '#fffff'};
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: left;
`;
const STimetables = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
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
  const currentDate = new Date();
  const todayOfNumber = currentDate.getDay();

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

  const getCurrentHour = () => {
    const currentHours = currentDate.getHours();
    if (currentHours === 9) {
      return '1교시';
    } else if (currentHours === 10) {
      return '2교시';
    } else if (currentHours === 11) {
      return '3교시';
    } else if (currentHours === 12) {
      return '4교시';
    } else if (currentHours === 13) {
      return '5교시';
    } else if (currentHours === 14) {
      return '6교시';
    } else if (currentHours === 15 || currentHours === 16) {
      return '7교시';
    } else if (currentHours === 17) {
      return '8교시';
    } else if (currentHours === 18) {
      return '9교시';
    } else {
      return '';
    }
  };
  const currentHour = getCurrentHour();

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
              <STimetables
                style={{
                  color:
                    timetables[hour] === currentHour ? '#3378FF' : '#5b5b5b',
                }}
              >
                {timetables[hour]}
              </STimetables>
              {todayClass.map((item, index) => {
                const classTimeChange = parseInt(item.classTime.slice(0, 1));
                const backgroundColor = colorMapping[item.color] || '';
                const pointBorderColor = pointColorMapping[item.color] || '';
                return (
                  <div key={index}>
                    {classTimeChange === hour ? (
                      <STodayClassWrapper
                        color={backgroundColor}
                        $pointColor={pointBorderColor}
                      >
                        <p>{item.classLocation}</p>
                        <p>{item.subjectName}</p>
                      </STodayClassWrapper>
                    ) : null}
                  </div>
                );
              })}
            </SClassContainer>
          ))}
        </SSchedule>
      </STodayScheduleWrapper>
    </>
  );
};

export default TodaySchedule;
