import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { colorMapping } from '../../utils/colorMapping';
import { getTodayTimetable } from '../../utils/lib/api';
import ClassInfoPopup from './ClassInfoPopup';

interface ClassProps {
  id: string;
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
  display: flex;
  flex-direction: column;
  margin-top: 43px;
`;

const SDayTime = styled.div`
  border-top: 1px solid #cccccc;
  display: flex;
  width: 100%;
  height: 66px;
`;
const SClass = styled.div`
  display: flex;
  width: 100%;
`;
const STime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5vw;
  color: #71717a;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  text-align: right;
  padding: 5.5px 12px;

  @media (max-width: 1439px) {
    font-size: 18px;
  }

  @media (max-width: 1330px) {
    font-size: 16px;
  }

  @media (max-width: 1240px) {
    font-size: 14px;
  }
  @media (max-width: 1145px) {
    width: 7vw;
  }
  @media (max-width: 820px) {
    width: 10vw;
  }
`;
const SClassText = styled.div`
  color: #4b4b4b;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 5px 6px;

  @media (max-width: 1380px) {
    font-size: 16px;
  }

  @media (max-width: 1023px) {
    font-size: 14px;
  }

  @media (max-width: 879px) {
    font-size: 12px;
  }
`;
interface DayTemplateProps {
  dayIndex: number;
  lastClass: string;
  reloadTrigger: boolean;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenAddClass: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;

  subjectId: string;
}
const TimetableDayTemplate = memo(
  ({
    dayIndex,
    lastClass,
    reloadTrigger,
    setReloadTrigger,
    handleOpenAddClass,
    setIsEditMode,
    subjectId,
    setSubjectId,
  }: DayTemplateProps) => {
    const { scheduleId } = useParams();
    const [classList, setClassList] = useState<ClassProps[]>([]);
    let lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10);
    const [isOpenSubjectDataModal, setIsOpenSubjectDataModal] =
      useState<boolean>(false);

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

    const filteredTimetables = timetables.slice(0, lastClassNumber);

    const isSameClassTime = (
      time1: string | undefined,
      time2: string | undefined,
    ) => {
      return time1 === time2;
    };

    const openSubjectDataModal = (subjectId: string) => {
      setSubjectId(subjectId);

      setIsOpenSubjectDataModal(true);
    };

    const closeSubjectDataModal = () => {
      setIsOpenSubjectDataModal(false);
    };

    useEffect(() => {
      const getDayTimetable = async () => {
        const day = dayMapping(dayIndex);
        const res = await getTodayTimetable(scheduleId, day);
        setClassList(res.data);
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
                    <SDayTimetableWrapper
                      key={index}
                      color={backgroundColor}
                      onClick={() => openSubjectDataModal(subject.id)}
                    >
                      <SClassText>
                        <div>{`${subject.classLocation} ${subject.subjectName}`}</div>
                        <div>
                          {subject.memo ? (
                            <div>{`메모: ${subject.memo}`}</div>
                          ) : null}
                        </div>
                      </SClassText>
                    </SDayTimetableWrapper>
                  );
                } else {
                  return null;
                }
              })}
            </SClass>
          </SDayTime>
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
      </SDayColumn>
    );
  },
);

export default TimetableDayTemplate;
