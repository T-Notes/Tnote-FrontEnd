import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { getRemainingDayData } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

const SRemainingDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SFont = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray000};
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 30px;
`;
const SDayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 80px;
  padding: 10px;

  background-color: ${({ theme }) => theme.colors.blue400};
`;
const SRemainingDay = styled.p`
  color: ${({ theme }) => theme.colors.blue700};
  ${({ theme }) => theme.fonts.button};
`;

const SRemainingDayText = styled.p`
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button};
`;

const RemainingDays = () => {
  const { scheduleId } = useParams(); //현재 url에서 추출한 동적으로 변하는 id값
  const [remainingDay, setRemainingDay] = useState<number>();
  const current = new Date();
  const newCurrent = current.toISOString().slice(0, 10);

  useEffect(() => {
    if (scheduleId) {
      const remainingDayData = async () => {
        try {
          const response = await getRemainingDayData(scheduleId, newCurrent);

          setRemainingDay(response.data);
          console.log(11, response.data);
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
          <SRemainingDay>{remainingDay}</SRemainingDay>
        ) : (
          <SRemainingDayText>{'생성된 학기 없음'}</SRemainingDayText>
        )}
      </SDayBox>
    </SRemainingDayWrapper>
  );
};

export default RemainingDays;
