import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';

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
`;
const STitleHeaderContainer = styled.div`
  border-bottom: 1px solid #d6d6d6;
`;
const STitleHeader = styled.div`
  display: flex;
  padding: 20px;
  font-size: 15px;
  font-weight: 500;
  justify-content: space-between;
`;
const SClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const SLabel = styled.label`
  color: #a5a5a5;
  font-size: 13px;
  font-weight: 500;
  padding-right: 20px;
  padding-bottom: 11px;
`;
const SFlex = styled.div`
  display: flex;
`;
const SContent = styled.p`
  font-size: 13px;
  color: #414141;
  font-weight: 500;
`;
const SContentClassTime = styled(SContent)`
  padding-left: 5px;
`;
const SButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const SDelete = styled.button`
  width: 85px;
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #414141;
  background-color: #f3f3f3;
  border: 1px solid #aaaaaa;
  margin-right: 10px;
`;
const SEdit = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #414141;
  background-color: white;
  border: 1px solid #aaaaaa;
`;
interface ToggleProps {
  closeSubjectDataModal: () => void;
  subjectId: string;
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenAddClass: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const ClassInfoPopup = ({
  closeSubjectDataModal,
  subjectId,
  setReloadTrigger,
  handleOpenAddClass,
  setIsEditMode,
}: ToggleProps) => {
  const { scheduleId } = useParams();
  const [subject, setSubject] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [classDay, setClassDay] = useState<string>('');
  const [classLocation, setClassLocation] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

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
    handleOpenAddClass();
    closeSubjectDataModal();
  };
  return (
    <SModalBackground>
      <SModalLayout>
        <>
          <STitleHeaderContainer>
            <STitleHeader>
              <div> {subject} 수업</div>
              <IcClose onClick={closeSubjectDataModal} className="pointer" />
            </STitleHeader>
          </STitleHeaderContainer>
          <SClassInfo>
            <SFlex>
              <SLabel>일시</SLabel>
              <SContent>{classDay}</SContent>
              <SContentClassTime>{classTime}</SContentClassTime>
            </SFlex>
            <SFlex>
              <SLabel>장소</SLabel>
              <SContent>{classLocation}</SContent>
            </SFlex>
            <SFlex>
              <SLabel>메모</SLabel>
              <SContent>{memo}</SContent>
            </SFlex>
          </SClassInfo>
          <SButtons>
            <SDelete onClick={handleDelete}>삭제</SDelete>
            <SEdit onClick={handleUpdate}>수업 수정</SEdit>
          </SButtons>
        </>
      </SModalLayout>
    </SModalBackground>
  );
};

export default ClassInfoPopup;
