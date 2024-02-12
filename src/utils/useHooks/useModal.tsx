import { useState } from 'react';
import ClassLogModal from '../../components/Write/ClassLogModal';
import WorkLogModal from '../../components/Write/WorkLogModal';

// 일반 모달
export const useModal = (init = false) => {
  const [isOpen, setIsModal] = useState<boolean>(init);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return { isOpen, openModal, closeModal };
};

// 글쓰기 모달
interface WriteModal {
  isOpen: boolean;
  content: React.ReactNode | null;
}

export const useWriteModal = (closeModal: () => void) => {
  const [writeModal, setWriteModal] = useState<WriteModal>({
    isOpen: false,
    content: null,
  });

  const handleClickModal = (buttonType: string) => {
    let modalContent = null;
    if (buttonType === '학급일지') {
      modalContent = <ClassLogModal closeModal={closeModal} />;
    } else if (buttonType === '업무일지') {
      modalContent = <WorkLogModal />;
    } else if (buttonType === '상담기록') {
      // modalContent = <ConsultationRecordsModal />;
    } else if (buttonType === '학생 관찰 기록') {
      // modalContent = <StudentRecordsModal />;
    }
    //모달 상태 업데이트
    setWriteModal({ isOpen: true, content: modalContent });
  };
  return { writeModal, handleClickModal };
};
