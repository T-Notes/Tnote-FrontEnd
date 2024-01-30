import { useState } from 'react';
import styled from 'styled-components';
import ClassAddForm from '../components/Timetable/ClassAddForm';
import TimetableHeader from '../components/Timetable/TimetableHeader';
import TimetableTemplate from '../components/Timetable/TimetableTemplate';

const STimetableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Timetable = () => {
  const [isAddClass, setIsAddClass] = useState<boolean>(false);

  const handleOpenAddClass = () => {
    setIsAddClass(true);
  };

  const handleCloseAddClass = () => {
    setIsAddClass(false);
  };
  return (
    <STimetableWrapper>
      <TimetableHeader onClassAdd={handleOpenAddClass} />
      <TimetableTemplate />
      {isAddClass && <ClassAddForm onCloseAddClass={handleCloseAddClass} />}
    </STimetableWrapper>
  );
};

export default Timetable;
