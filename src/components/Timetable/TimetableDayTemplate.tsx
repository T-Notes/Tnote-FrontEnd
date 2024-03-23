import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTodayTimetable } from '../../utils/lib/api';

interface ClassProps {
  classLocation: string;
  classTime: string;
  color: string;
  memo: string;
  subjectName: string;
}

const SDayTimetableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
const SDayColumn = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SDayTime = styled.div`
  border: 1px solid #cccccc;
  border-left: none;
  border-right: none;
  padding: 13px;
`;
interface DayTemplateProps {
  dayIndex: number;
  lastClass: string;
}
const TimetableDayTemplate = memo(
  ({ dayIndex, lastClass }: DayTemplateProps) => {
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

    useEffect(() => {
      const getDayTimetable = async () => {
        const day = dayMapping(dayIndex);
        const res = await getTodayTimetable(scheduleId, day);
        setClassList(res.data);
        console.log(3, res.data);
      };
      getDayTimetable();
    }, [dayIndex]);

    useEffect(() => {
      if (lastClass === '') {
        lastClassNumber = 9;
      } else {
        for (let hour = 1; hour <= lastClassNumber; hour++) {}
      }
    }, [lastClass]);

    return (
      <>
        <SDayTimetableWrapper>
          <SDayColumn>
            {filteredTimetables.map((item: any, index: number) => (
              <SDayTime key={index}>
                <div>{item.class}</div>
                <div>{item.time}</div>
              </SDayTime>
            ))}
          </SDayColumn>

          {classList.map((item, index) => {
            console.log(item);

            return (
              <SDayTimetableWrapper key={index}>
                <div>{item.subjectName}</div>
                <div>{item.classLocation}</div>
              </SDayTimetableWrapper>
            );
          })}
        </SDayTimetableWrapper>
      </>
    );
  },
);

export default TimetableDayTemplate;
