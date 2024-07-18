import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRemainingDayData } from '../../utils/lib/api';

const SRemainingDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SFont = styled.div`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 600;
  line-height: 27.45px;
  text-align: left;
  color: #5b5b5b;
  padding: 10px 10px 10px 20px;
  margin-top: 27px;
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
`;
const SDayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 19.7vw;
  height: 150px;
  max-height: 150px;
  flex: 1;
  background-color: #f7f9fc;

  @media (max-width: 1439px) {
    width: 17vw;
  }
  @media (max-width: 960px) {
    width: 21vw;
  }
  @media (max-width: 820px) {
    width: 180px;
  }
`;
const SRemainingDay = styled.p`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  color: #0ea5e9;
  @media (max-width: 1439px) {
    font-size: 26px;
  }
`;

const SRemainingDayText = styled.p`
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  color: #a6a6a6;

  @media (max-width: 1439px) {
    font-size: 26px;
  }
  @media (max-width: 1300px) {
    font-size: 20px;
  }
  @media (max-width: 1023px) {
    font-size: 16px;
  }
`;

const RemainingDays = () => {
  const { scheduleId } = useParams();
  const [remainingDay, setRemainingDay] = useState<number>();
  const current = new Date();
  const newCurrent = current.toISOString().slice(0, 10);

  useEffect(() => {
    if (scheduleId) {
      const remainingDayData = async () => {
        try {
          const response = await getRemainingDayData(scheduleId, newCurrent);

          setRemainingDay(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      remainingDayData();
    }
  }, [scheduleId]);

  return (
    <SRemainingDayWrapper>
      <SFont>이번 학기 남은 일수</SFont>
      <SDayBox>
        {typeof remainingDay === 'number' ? (
          <SRemainingDay>{`D-${remainingDay}`}</SRemainingDay>
        ) : (
          <SRemainingDayText>{'생성된 학기 없음'}</SRemainingDayText>
        )}
      </SDayBox>
    </SRemainingDayWrapper>
  );
};

export default RemainingDays;
