import { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { IcRoundBackBtn, IcRoundFrontBtn } from '../../assets/icons';
import TimetableDayTemplate from './TimetableDayTemplate';
import TimetableWeekTemplate from './TimetableWeekTemplate';

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const STimetableButton = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 28px;
  padding: 10px;
  border-radius: 8px;
  border: 1px;
  gap: 10px;
  border: 1px solid #e8e8e8;
  margin-right: 10px;
  font-weight: 500;

  background-color: ${(props) => (props.selected ? '#ff6f6f' : '#ffff')};
  color: ${(props) => (props.selected ? '#ffff' : '#5b5b5b')};
`;

const STimetableButtonWeek = styled(STimetableButton)`
  margin-right: 30px;
`;
const SDay = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
`;
const SIcRoundBackBtn = styled(IcRoundBackBtn)`
  margin-right: 15px;
`;

interface TodayClick {
  isTodayClick: boolean;
  setIsTodayClick: React.Dispatch<React.SetStateAction<boolean>>;
  reloadTrigger: boolean;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenAddClass: () => void;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  subjectId: string;
}
const TimetableChangeBtn = ({
  isTodayClick,
  setIsTodayClick,
  reloadTrigger,
  setReloadTrigger,
  setIsEditMode,
  handleOpenAddClass,
  setSubjectId,
  subjectId,
}: TodayClick) => {
  const initialState = new Date().getDay();
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [dayIndex, setDayIndex] = useState<number>(initialState);
  // const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const [lastClass, setLastClass] = useState<string>('9교시');

  const handleClickTodayButton = (buttonType: string) => {
    setIsTodayClick(true);
    setSelectedButton(buttonType);
  };

  const handleClickWeekButton = (buttonType: string) => {
    setIsTodayClick(false);
    setSelectedButton(buttonType);
  };

  const moveDay = (direction: string) => {
    if (direction === 'next') {
      setDayIndex((prevIndex) => (prevIndex < 7 ? prevIndex + 1 : 1));
    } else if (direction === 'prev') {
      setDayIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : 7));
    }
  };

  return (
    <>
      <SWrapper>
        <STimetableButton
          onClick={() => handleClickTodayButton('TODAY')}
          selected={selectedButton === 'TODAY'}
        >
          오늘
        </STimetableButton>
        <STimetableButtonWeek
          onClick={() => handleClickWeekButton('WEEK')}
          selected={selectedButton === 'WEEK' || selectedButton === ''}
        >
          일주일
        </STimetableButtonWeek>

        <SIcRoundBackBtn
          className="pointer"
          style={{ display: isTodayClick ? 'inline-block' : 'none' }}
          onClick={() => moveDay('prev')}
        />
        <IcRoundFrontBtn
          className="pointer"
          style={{ display: isTodayClick ? 'inline-block' : 'none' }}
          onClick={() => moveDay('next')}
        />
        <SDay style={{ display: isTodayClick ? 'inline-block' : 'none' }}>
          {dayIndex === 1
            ? '월요일'
            : dayIndex === 2
              ? '화요일'
              : dayIndex === 3
                ? '수요일'
                : dayIndex === 4
                  ? '목요일'
                  : dayIndex === 5
                    ? '금요일'
                    : dayIndex === 6
                      ? '토요일'
                      : '일요일'}
        </SDay>
      </SWrapper>
      {isTodayClick ? (
        <TimetableDayTemplate
          dayIndex={dayIndex}
          lastClass={lastClass}
          reloadTrigger={reloadTrigger}
          subjectId={subjectId}
          setReloadTrigger={setReloadTrigger}
          handleOpenAddClass={handleOpenAddClass}
          setIsEditMode={setIsEditMode}
          setSubjectId={setSubjectId}
        />
      ) : (
        <TimetableWeekTemplate
          setReloadTrigger={setReloadTrigger}
          reloadTrigger={reloadTrigger}
          handleOpenAddClass={handleOpenAddClass}
          setIsEditMode={setIsEditMode}
          setSubjectId={setSubjectId}
          subjectId={subjectId}
          setLastClass={setLastClass}
          lastClass={lastClass}
        />
      )}
    </>
  );
};

export default TimetableChangeBtn;
