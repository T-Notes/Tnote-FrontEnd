import styled from 'styled-components';
import { updateAlarmToggle } from '../../utils/lib/api';

const SToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;

const SToggleButton = styled.div<{ $isActive: boolean }>`
  width: 50px;
  height: 32px;
  background-color: ${({ $isActive }) => ($isActive ? '#6750A4' : '#e8e8e8')};
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s ease;
`;

const SToggleCircle = styled.div<{ $isActive: boolean }>`
  width: 23px;
  height: 23px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 4.4px;
  left: ${({ $isActive }) => ($isActive ? '23px' : '4px')};
  transition: left 0.2s ease;
`;
interface Toggle {
  alarm: boolean;
  setAlarm: (alarm: boolean) => void;
}
export default function ToggleButton({ alarm, setAlarm }: Toggle) {
  const handleOnAlarm = async () => {
    await updateAlarmToggle(true);
    setAlarm(true);
  };
  const handleOffAlarm = async () => {
    await updateAlarmToggle(false);
    setAlarm(false);
  };

  const handleToggle = () => {
    if (alarm) {
      handleOffAlarm();
    } else {
      handleOnAlarm();
    }
  };
  return (
    <SToggleContainer onClick={handleToggle}>
      <SToggleButton $isActive={alarm}>
        <SToggleCircle $isActive={alarm} />
      </SToggleButton>
    </SToggleContainer>
  );
}
