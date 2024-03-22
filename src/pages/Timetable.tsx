import { useState } from 'react';
import styled from 'styled-components';
import SemesterMenu from '../components/Home/SemesterMenu';
import ClassAddForm from '../components/Timetable/ClassAddForm';
import TimetableChangeBtn from '../components/Timetable/TimetableChangeBtn';
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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>('');

  const handleOpenAddClass = () => {
    setIsAddClass(true);
  };

  const handleCloseAddClass = () => {
    setIsAddClass(false);
    setIsEditMode(false); // 과목 추가/수정 모달 닫으면 다시 초기화
  };

  return (
    <>
      <STimetableWrapper>
        <div>
          <SemesterMenu onClickAddBtn={handleOpenAddClass} />
          <TimetableHeader />
          <TimetableChangeBtn />
          <TimetableTemplate
            setReloadTrigger={setReloadTrigger}
            reloadTrigger={reloadTrigger}
            handleOpenAddClass={handleOpenAddClass}
            setIsEditMode={setIsEditMode}
            isEditMode={isEditMode}
            setSubjectId={setSubjectId}
            subjectId={subjectId}
          />
        </div>
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
