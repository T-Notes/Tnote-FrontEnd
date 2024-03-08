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
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false); // 화면 reload 추가

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
          <SemesterMenu onClickAddBtn={handleOpenAddClass} />
          <TimetableHeader />
          <TimetableTemplate reloadTrigger={reloadTrigger} />
        </div>
      </STimetableWrapper>
      {isAddClass && (
        <>
          <ClassAddForm
            onCloseAddClass={handleCloseAddClass}
            setReloadTrigger={setReloadTrigger}
          />
        </>
      )}
    </>
  );
};

export default Timetable;
