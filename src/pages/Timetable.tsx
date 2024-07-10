import { useState } from 'react';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import ClassAddForm from '../components/Timetable/ClassAddForm';
import TimetableChangeBtn from '../components/Timetable/TimetableChangeBtn';
import TimetableHeader from '../components/Timetable/TimetableHeader';

const STimetableWrapper = styled.div`
  padding-right: 21.3vw;

  padding-left: 30px;
  @media (max-width: 1440px) {
    padding-right: 30vw;
  }
`;

const Timetable = () => {
  const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>('');
  const [isTodayClick, setIsTodayClick] = useState<boolean>(false);

  const handleOpenAddClass = () => {
    setIsAddClass(true);
  };

  const handleCloseAddClass = () => {
    setIsAddClass(false);
    setIsEditMode(false);
  };

  return (
    <>
      <STimetableWrapper>
        <SemesterMenu onClickAddBtn={handleOpenAddClass} />
        <TimetableHeader />
        <TimetableChangeBtn
          isTodayClick={isTodayClick}
          setIsTodayClick={setIsTodayClick}
          setReloadTrigger={setReloadTrigger}
          setIsEditMode={setIsEditMode}
          reloadTrigger={reloadTrigger}
          handleOpenAddClass={handleOpenAddClass}
          setSubjectId={setSubjectId}
          subjectId={subjectId}
        />
      </STimetableWrapper>
      {isAddClass && (
        <>
          <ClassAddForm
            onCloseAddClass={handleCloseAddClass}
            setReloadTrigger={setReloadTrigger}
            setIsEditMode={setIsEditMode}
            isEditMode={isEditMode}
            subjectId={subjectId}
          />
        </>
      )}
    </>
  );
};

export default Timetable;
