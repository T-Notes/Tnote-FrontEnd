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
const TimetableDayTemplate = memo(({ dayIndex }: { dayIndex: number }) => {
  const { scheduleId } = useParams();
  const [classList, setClassList] = useState<ClassProps[]>([]);

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

  useEffect(() => {
    const getDayTimetable = async () => {
      const day = dayMapping(dayIndex);
      const res = await getTodayTimetable(scheduleId, day);
      setClassList(res.data);
      console.log(3, res.data);
    };
    getDayTimetable();
  }, [dayIndex]);

  return (
    <>
      <SDayTimetableWrapper>
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
});

export default TimetableDayTemplate;
