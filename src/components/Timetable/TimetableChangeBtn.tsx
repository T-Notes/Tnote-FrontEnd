import { useState } from 'react';
import styled from 'styled-components';
import { IcRoundBackBtn, IcRoundFrontBtn } from '../../assets/icons';

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const STimetableButton = styled.button`
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
  color: #5b5b5b;
  &:hover {
    background: #ff6f6f;
    color: white;
  }
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

const TimetableChangeBtn = () => {
  const [isTodayClick, setIsTodayClick] = useState<boolean>(false);
  const [dayIndex, setDayIndex] = useState<number>(1);

  const handleClickTodayButton = () => {
    setIsTodayClick(true);
  };

  const handleClickWeekButton = () => {
    setIsTodayClick(false);
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
        <STimetableButton onClick={handleClickTodayButton}>
          오늘
        </STimetableButton>
        <STimetableButtonWeek onClick={handleClickWeekButton}>
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
    </>
  );
};

export default TimetableChangeBtn;
