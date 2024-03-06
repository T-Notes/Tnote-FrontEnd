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
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button};
  background-color: ${({ theme }) => theme.colors.blue400};
`;
const SRemainingDay = styled.p``;

const RemainingDays = () => {
  const { scheduleId } = useParams(); //현재 url에서 추출한 동적으로 변하는 id값
  const [remainingDay, setRemainingDay] = useState<string | undefined>('');
  // 고민1. formattedDate형식으로 넘겨주면 되는건가?
  const { currentDate } = useCurrentDate();
  const date = currentDate.toISOString().split('T')[0];
  console.log('remainingDate:', date);

  useEffect(() => {
    if (scheduleId) {
      const remainingDayData = async () => {
        try {
          console.log(2, '렌더링!');
          const response = await getRemainingDayData(scheduleId, date);
          console.log('남은학기일수', response.data);

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
        <SRemainingDay>{remainingDay || '생성된 학기 없음'}</SRemainingDay>
      </SDayBox>
    </SRemainingDayWrapper>
  );
};

export default RemainingDays;
