import { useState } from 'react';
import styled from 'styled-components';
import { IcRoundBackBtn, IcRoundFrontBtn } from '../../assets/icons';
import TimetableDayTemplate from './TimetableDayTemplate';
import TimetableWeekTemplate from './TimetableWeekTemplate';

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;
const STimetableButton = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  border-radius: 8px;
  border: 1px;
  gap: 10px;
  border: 1px solid #e8e8e8;
  margin-right: 10px;
  padding: 4px 15.5px 4px 15.5px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  background-color: ${(props) => (props.selected ? '#ff6f6f' : '#FFFFFF')};
  color: ${(props) => (props.selected ? '#FFFFFF' : '#5b5b5b')};
`;

const SDay = styled.div`
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  line-height: 28.64px;
  text-align: left;

  @media (max-width: 1380px) {
    font-size: 22px;
  }

  @media (max-width: 1023px) {
    font-size: 20px;
  }

  @media (max-width: 879px) {
    font-size: 16px;
  }
`;
const SIcRoundPrevBtn = styled(IcRoundBackBtn)`
  margin-right: 14px;
  margin-left: 19px;
`;
const SIcRoundNextBtn = styled(IcRoundFrontBtn)`
  margin-right: 20px;
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
        <STimetableButton
          onClick={() => handleClickWeekButton('WEEK')}
          selected={selectedButton === 'WEEK' || selectedButton === ''}
        >
          일주일
        </STimetableButton>

        <SIcRoundPrevBtn
          className="pointer"
          style={{ display: isTodayClick ? 'inline-block' : 'none' }}
          onClick={() => moveDay('prev')}
        />
        <SIcRoundNextBtn
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
