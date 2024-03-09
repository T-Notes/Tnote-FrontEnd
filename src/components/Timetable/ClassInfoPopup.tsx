import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import ClassInfoPopupData from './ClassInfoPopupData';

import {
  ModalLayout,
  ModalBackground,
} from '../../components/common/styled/ModalLayout';
import styled from 'styled-components';
import { IcClose } from '../../assets/icons';
import { deletedSubject, getSelectedSubjectData } from '../../utils/lib/api';
import ClassAddForm from './ClassAddForm';

const SModalBackground = styled(ModalBackground)`
  /* background: none; */
`;
const SModalLayout = styled.div`
  width: 510px;
  height: 270px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

interface ToggleProps {
  closeSubjectDataModal: () => void;
  subjectId: string;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenAddClass: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
}
const ClassInfoPopup = ({
  closeSubjectDataModal,
  subjectId,
  setReloadTrigger,
  handleOpenAddClass,
  setIsEditMode,
  isEditMode,
}: ToggleProps) => {
  const { scheduleId } = useParams();
  const [subject, setSubject] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [classDay, setClassDay] = useState<string>('');
  const [classLocation, setClassLocation] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  // const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // const [isAddClass, setIsAddClass] = useState<boolean>(false);

  // const handleOpenAddClass = () => {
  //   setIsAddClass(true);
  // };

  // const handleCloseAddClass = () => {
  //   setIsAddClass(false);
  // };

  useEffect(() => {
    const selectedSubjectData = async () => {
      const response = await getSelectedSubjectData(scheduleId, subjectId);
      setSubject(response.data.subjectName);
      setClassTime(response.data.classTime);
      setClassDay(response.data.classDay);
      setClassLocation(response.data.classLocation);
      setMemo(response.data.memo);
    };
    selectedSubjectData();
  }, []);

  const handleDelete = async () => {
    await deletedSubject(scheduleId, subjectId);
    closeSubjectDataModal();
    setReloadTrigger((prev) => !prev);
  };
  // 수정을 클릭하면 classAddForm 다시 띄우기
  const handleUpdate = () => {
    setIsEditMode(true);
    closeSubjectDataModal();
    handleOpenAddClass();
  };
  return (
    <SModalBackground>
      <SModalLayout>
        <>
          <div> {subject} 수업</div>
          <IcClose onClick={closeSubjectDataModal} className="pointer" />
          <br />
          <br />
          <label>일시</label>
          <p>{classTime}</p>
          <p>{classDay}</p>
          <br />
          <label>장소</label>
          <p>{classLocation}</p>
          <br />
          <label>메모</label>
          <p>{memo}</p>
          <br />
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleUpdate}>수업 수정</button>
        </>
      </SModalLayout>
    </SModalBackground>
  );
};

export default ClassInfoPopup;
