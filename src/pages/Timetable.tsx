import { useState } from 'react';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import ClassAddForm from '../components/Timetable/ClassAddForm';
import TimetableHeader from '../components/Timetable/TimetableHeader';
import TimetableTemplate from '../components/Timetable/TimetableTemplate';

const SClassAddFormWrapper = styled.div`
  /* border: 1px solid red;
  width: 800px;
  margin-left: auto; */
`;
const STimetableWrapper = styled.div`
  position: absolute;
  display: flex;
  width: auto;
  top: 0;
  left: 230px;
  right: 330px;
  bottom: 0;
`;
const STimetable = styled.div``;
const Timetable = () => {
  const [isAddClass, setIsAddClass] = useState<boolean>(false);

  const handleOpenAddClass = () => {
    setIsAddClass(true);
  };

  const handleCloseAddClass = () => {
    setIsAddClass(false);
  };
  return (
    <>
      <STimetableWrapper>
        <div>
          <SemesterMenu onClick={handleOpenAddClass} />
          <TimetableHeader />
          <TimetableTemplate />
        </div>
      </STimetableWrapper>
      {isAddClass && (
        <>
          <ClassAddForm onCloseAddClass={handleCloseAddClass} />
        </>
      )}
    </>
  );
};

export default Timetable;
