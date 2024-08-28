import { useState } from 'react';
import { IcNavigationClose, IcNavigationOpen } from '../../assets/icons';
import styled from 'styled-components';
import WriteDropdownList from '../Write/WriteDropdownList';
import { useModals } from '../../utils/useHooks/useModals';
import ClassLogModal from '../Write/ClassLogModal';
import WorkLogModal from '../Write/WorkLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import { useParams } from 'react-router-dom';
import ScheduleLogModal from '../Write/ScheduleLogModal';

const SWriteBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 6.5%;
  white-space: nowrap;
  justify-content: center;

  height: auto;
  width: 140px;
  padding: 12px 20px 12px 20px;
  @media (max-width: 1279px) {
    padding: 6px 10px;
  }

  border: 1px solid #5b28e6;
  border-radius: 8px;
  background-color: white;
  color: #5b28e6;
  .text {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }
`;

const SIcon = styled.div`
  margin-left: 13px;
`;
export const NoteButton = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const { scheduleId } = useParams();
  const { openModal } = useModals();
  const dropdownToggle = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleClickOpenModal = (openModalName: string) => {
    if (openModalName === '학급일지') {
      openModal(ClassLogModal, {
        handleClickOpenModal,
        scheduleId,
      });
    } else if (openModalName === '업무일지') {
      openModal(WorkLogModal, { handleClickOpenModal, scheduleId });
    } else if (openModalName === '상담기록') {
      openModal(ConsultationRecordsModal, { handleClickOpenModal, scheduleId });
    } else if (openModalName === '학생 관찰 일지') {
      openModal(StudentRecordsModal, { handleClickOpenModal, scheduleId });
    } else if (openModalName === '일정') {
      openModal(ScheduleLogModal, { handleClickOpenModal, scheduleId });
    }
  };
  return (
    <SWriteBtn onClick={dropdownToggle} className="pointer">
      <p className="text">기록하기</p>
      <SIcon>{isDropdown ? <IcNavigationClose /> : <IcNavigationOpen />}</SIcon>
      {isDropdown && (
        <WriteDropdownList
          onClickOpenModal={handleClickOpenModal}
          toggle={dropdownToggle}
        />
      )}
    </SWriteBtn>
  );
};
