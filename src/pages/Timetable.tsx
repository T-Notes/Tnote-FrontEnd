import styled from 'styled-components';
import TimetableTemplate from '../components/Timetable/TimetableTemplate';

const STimetableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Timetable = () => {
  return (
    <STimetableWrapper>
      <TimetableTemplate />
    </STimetableWrapper>
  );
};

export default Timetable;
