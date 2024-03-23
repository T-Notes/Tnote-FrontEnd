import { useState } from 'react';
import styled from 'styled-components';
import TimetableChangeBtn from './TimetableChangeBtn';
import TimetableDayTemplate from './TimetableDayTemplate';
import TimetableWeekTemplate from './TimetableWeekTemplate';

const SWrapper = styled.div``;
interface Reload {
  reloadTrigger: boolean;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const TimetableWeekAndDay = ({ setReloadTrigger, reloadTrigger }: Reload) => {
  const [isTodayClick, setIsTodayClick] = useState<boolean>(false);
  const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>('');

  const handleOpenAddClass = () => {
    setIsAddClass(true);
  };

  return (
    <SWrapper>
      <TimetableChangeBtn
        isTodayClick={isTodayClick}
        setIsTodayClick={setIsTodayClick}
        setReloadTrigger={setReloadTrigger}
        reloadTrigger={reloadTrigger}
      />
      {/* {isTodayClick ? (
        <TimetableDayTemplate />
      ) : (
        <TimetableWeekTemplate
          setReloadTrigger={setReloadTrigger}
          reloadTrigger={reloadTrigger}
          handleOpenAddClass={handleOpenAddClass}
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
          setSubjectId={setSubjectId}
          subjectId={subjectId}
        />
      )} */}
    </SWrapper>
  );
};

export default TimetableWeekAndDay;
