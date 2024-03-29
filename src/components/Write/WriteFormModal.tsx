import ReactModal from 'react-modal';
import styled from 'styled-components';
import { ModalBackground, ModalLayout } from '../common/styled/ModalLayout';
import {
  IcWorkLog,
  IcClassLog,
  IcCounselingLog,
  IcStudentObservationLog,
} from '../../assets/icons';
import { useState, useEffect } from 'react';
import ClassLogModal from './ClassLogModal';
import WorkLogModal from './WorkLogModal';
// import { useWriteModal, WriteModal } from '../../utils/useHooks/useModal';

const SWriteForm = styled(ModalLayout)`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  left: 14%;
  bottom: 12%;
  width: 300px;
  height: 344px;
  border-radius: 20px;
  padding: 24px, 20px, 20px, 20px;
`;

const SItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 50%;
`;
const SCaption = styled.p`
  ${({ theme }) => theme.fonts.caption}
`;
interface WriteProps {
  closeWriteFormModal: () => void;
  handleClickModal: (openModalContent: string) => void;
  // isOpen: boolean;
  // closeModal: () => void;
  // setWriteModal: (writeModal: WriteModal) => void;
}

const WriteFormModal = ({
  closeWriteFormModal,
  handleClickModal,
}: WriteProps) => {
  // const { writeModal, handleClickModal } = useWriteModal();

  // useEffect(() => {
  //   setWriteModal(writeModal);
  // }, [writeModal]);

  return (
    <ModalBackground onClick={closeWriteFormModal}>
      <SWriteForm onClick={(e: any) => e.stopPropagation()}>
        <SItem>
          <IcClassLog
            className="pointer"
            onClick={() => handleClickModal('학급일지')}
          />
          <SCaption>학급일지</SCaption>
        </SItem>
        <SItem>
          <IcWorkLog
            className="pointer"
            onClick={() => handleClickModal('업무일지')}
          />
          <SCaption>업무일지</SCaption>
        </SItem>
        <SItem>
          <IcCounselingLog
            className="pointer"
            onClick={() => handleClickModal('상담기록')}
          />
          <SCaption>상담기록</SCaption>
        </SItem>
        <SItem>
          <IcStudentObservationLog
            className="pointer"
            onClick={() => handleClickModal('학생 관찰 일지')}
          />
          <SCaption>학생 관찰 일지</SCaption>
        </SItem>
      </SWriteForm>
    </ModalBackground>
  );
};

export default WriteFormModal;
