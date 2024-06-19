import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClassInfoPopup from './ClassInfoPopup';
import { colorMapping } from '../../utils/colorMapping';
import { weekSchedule } from '../../utils/lib/api';

const STimetableWrapper = styled.table`
  margin-top: 30px;
  width: auto;
  height: auto;
  border-collapse: collapse;
`;

const SDaysWrapper = styled.td`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  width: 145px;
  height: 60px;
`;

const SThead = styled.td`
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  color: #5b5b5b;
  font-weight: 700;
`;

const SSubjectBox = styled.div<{ color: string }>`
  cursor: pointer;
  font-size: 12px;
  height: 100%;
  gap: 4px;
  padding-top: 11px;
  padding-left: 10px;
  color: #5b5b5b;
  background-color: ${({ color }) => color || '#fffff'};
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SClassAndTime = styled.td`
  padding: 10px;
  font-size: 12px;
  color: #5b5b5b;
  font-weight: 700;
`;
const SLocation = styled.p`
  font-weight: 600;
`;
interface TimetableTemplate {
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  reloadTrigger: boolean;
  handleOpenAddClass: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  setLastClass: React.Dispatch<React.SetStateAction<string>>;
  lastClass: string;
  subjectId: string;
}
const TimetableWeekTemplate = ({
  reloadTrigger,
  setReloadTrigger,
  handleOpenAddClass,
  setIsEditMode,
  setSubjectId,
  subjectId,
  setLastClass,
  lastClass,
}: TimetableTemplate) => {
  const { scheduleId } = useParams();
  let lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10);
  const [subjectsList, setSubjectList] = useState<any[]>([]);

  const [isOpenSubjectDataModal, setIsOpenSubjectDataModal] =
    useState<boolean>(false);

  const openSubjectDataModal = (subjectId: string) => {
    setSubjectId(subjectId);

    setIsOpenSubjectDataModal(true);
  };

  const closeSubjectDataModal = () => {
    setIsOpenSubjectDataModal(false);
  };

  // api 연결 후 주석 제거
  useEffect(() => {
    if (scheduleId) {
      const getTimetable = async () => {
        try {
          const res = await weekSchedule(scheduleId);
          const subjectArray = res.data[0].subjects;
          setSubjectList(subjectArray);
          setLastClass(res.data[0].lastClass || '9교시');
          localStorage.setItem('lastClass', res.data[0].lastClass.slice(0, 1));
        } catch (err) {}
      };
      getTimetable();
    }
  }, [scheduleId, reloadTrigger]);

  useEffect(() => {
    if (lastClass === '') {
      lastClassNumber = 9;
    } else {
      for (let hour = 1; hour <= lastClassNumber; hour++) {}
    }
  }, [lastClass]);

  const days = [
    { id: 1, day: '월요일' },
    { id: 2, day: '화요일' },
    { id: 3, day: '수요일' },
    { id: 4, day: '목요일' },
    { id: 5, day: '금요일' },
    { id: 6, day: '토요일' },
    { id: 7, day: '일요일' },
  ];
  const timetables = [
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

  const filteredTimetables = timetables.slice(0, lastClassNumber);

  const isSameClassDay = (
    day1: string | undefined,
    day2: string | undefined,
  ) => {
    return day1 === day2;
  };
  const isSameClassTime = (
    time1: string | undefined,
    time2: string | undefined,
  ) => {
    return time1 === time2;
  };

  return (
    <STimetableWrapper>
      <thead>
        <tr>
          <td></td>
          {days.map((d) => (
            <SThead key={d.id}>
              <p>{d.day}</p>
            </SThead>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTimetables.map((t: any) => (
          <tr key={t.id}>
            <SClassAndTime>
              <p>{t.class}</p>
              <p>{t.time}</p>
            </SClassAndTime>
            {days.map((d) => (
              <SDaysWrapper key={d.id}>
                {subjectsList.map((item) => {
                  if (
                    isSameClassDay(item.classDay, d.day) &&
                    isSameClassTime(item.classTime, t.class)
                  ) {
                    const backgroundColor = colorMapping[item.color] || '';

                    return (
                      <SSubjectBox
                        key={item.id}
                        onClick={() => openSubjectDataModal(item.id)}
                        color={backgroundColor}
                      >
                        <SLocation>{item.subjectName}</SLocation>
                        <p>{item.classLocation}</p>
                        {item.memo ? <p>{`메모: ${item.memo}`}</p> : null}
                      </SSubjectBox>
                    );
                  }
                  return null;
                })}
              </SDaysWrapper>
            ))}
          </tr>
        ))}
        {isOpenSubjectDataModal && (
          <ClassInfoPopup
            closeSubjectDataModal={closeSubjectDataModal}
            subjectId={subjectId}
            setReloadTrigger={setReloadTrigger}
            handleOpenAddClass={handleOpenAddClass}
            setIsEditMode={setIsEditMode}
          />
        )}
      </tbody>
    </STimetableWrapper>
  );
};

export default TimetableWeekTemplate;
