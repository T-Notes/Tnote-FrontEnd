import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { colorMapping } from '../../utils/colorMapping';
import { getTodayTimetable } from '../../utils/lib/api';

interface ClassProps {
  classLocation: string;
  classTime: string;
  color: string;
  memo: string;
  subjectName: string;
}

const SDayTimetableWrapper = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;

  background-color: ${({ color }) => color || '#fffff'};
  width: 100%;
`;
const SDayColumn = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SDayTime = styled.div`
  border-top: 1px solid #cccccc;
  display: flex;
  width: 800px;
  /* width: 100vw; */
`;
const SClass = styled.div`
  display: flex;
  color: #4b4b4b;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
`;
const STime = styled.div`
  padding: 13px;
  color: #71717a;
  font-size: 16px;
  font-weight: 500;
`;
const SClassText = styled.div`
  padding: 5px;
`;
interface DayTemplateProps {
  dayIndex: number;
  lastClass: string;
  reloadTrigger: boolean;
}
const TimetableDayTemplate = memo(
  ({ dayIndex, lastClass, reloadTrigger }: DayTemplateProps) => {
    const { scheduleId } = useParams();
    const [classList, setClassList] = useState<ClassProps[]>([]);
    let lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10);

    const dayMapping = (dayIndex: number) => {
      let day = '';
      switch (dayIndex) {
        case 1:
          day = 'MONDAY';
          break;
        case 2:
          day = 'TUESDAY';
          break;
        case 3:
          day = 'WEDNESDAY';
          break;
        case 4:
          day = 'THURSDAY';
          break;
        case 5:
          day = 'FRIDAY';
          break;
        case 6:
          day = 'SATURDAY';
          break;
        case 7:
          day = 'SUNDAY';
          break;
        default:
          day = '';
      }
      return day;
    };

    const timetables: any = [
      { id: 1, class: '1교시', time: '09:00' },
      { id: 2, class: '2교시', time: '10:00' },
      { id: 3, class: '3교시', time: '11:00' },
      { id: 4, class: '4교시', time: '12:00' },
      { id: 5, class: '5교시', time: '13:40' },
      { id: 6, class: '6교시', time: '14:40' },
      { id: 7, class: '7교시', time: '15:40' },
      { id: 8, class: '8교시', time: '17:00' },
      { id: 9, class: '9교시', time: '18:00' },
    ];
    // lastClass 값에 따라 필요한 시간표만 추출
    const filteredTimetables = timetables.slice(0, lastClassNumber);

    const isSameClassTime = (
      time1: string | undefined,
      time2: string | undefined,
    ) => {
      return time1 === time2;
    };

    useEffect(() => {
      const getDayTimetable = async () => {
        const day = dayMapping(dayIndex);
        const res = await getTodayTimetable(scheduleId, day);
        setClassList(res.data);
        console.log(3, res.data);
      };
      getDayTimetable();
    }, [dayIndex, reloadTrigger]);

    useEffect(() => {
      if (lastClass === '') {
        lastClassNumber = 9;
      } else {
        for (let hour = 1; hour <= lastClassNumber; hour++) {}
      }
    }, [lastClass]);

    return (
      <SDayColumn>
        {filteredTimetables.map((time: any, index: number) => (
          <SDayTime key={index}>
            <STime>
              <div>{time.class}</div>
              <div>{time.time}</div>
            </STime>
            <SClass>
              {classList.map((subject, index) => {
                const backgroundColor = colorMapping[subject.color] || '';
                if (isSameClassTime(time.class, subject.classTime)) {
                  return (
                    <SDayTimetableWrapper key={index} color={backgroundColor}>
                      <SClassText>
                        <div>{`${subject.classLocation} ${subject.subjectName}`}</div>
                        <br />
                        <div>
                          {subject.memo ? (
                            <div>{`메모: ${subject.memo}`}</div>
                          ) : null}
                        </div>
                      </SClassText>
                    </SDayTimetableWrapper>
                  );
                } else {
                  return null; // 일치하지 않는 경우는 null을 반환하여 렌더링되지 않도록 합니다.
                }
              })}
            </SClass>
          </SDayTime>
        ))}
      </SDayColumn>
    );
  },
);

export default TimetableDayTemplate;
