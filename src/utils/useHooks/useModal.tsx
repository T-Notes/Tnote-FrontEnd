import { useEffect, useState } from 'react';
import ClassLogModal from '../../components/Write/ClassLogModal';
import WorkLogModal from '../../components/Write/WorkLogModal';
import ConsultationRecordsModal from '../../components/Write/ConsultationRecordsModal';
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
export interface WriteModal {
  isOpen: boolean;
  isClose: boolean;
  content: React.ReactNode | null;
}

export const useWriteModal = () => {
  const [writeModal, setWriteModal] = useState<WriteModal>({
    isOpen: false,
    isClose: true,
    content: null,
  });

  const [youWantedClose, setYouWantedClose] = useState(false);

  const handleClickModal = (option: string) => {
    let modalContent = null;
    if (option === '학급일지') {
      modalContent = <ClassLogModal setYouWantedClose={setYouWantedClose} />;
    } else if (option === '업무일지') {
      modalContent = <WorkLogModal />;
    } else if (option === '상담기록') {
      modalContent = <ConsultationRecordsModal />;
    } else if (option === '학생 관찰 기록') {
      // modalContent = <StudentRecordsModal />;
    }

    //모달 상태 업데이트
    if (youWantedClose)
      setWriteModal({ isOpen: false, content: modalContent, isClose: true });
    else setWriteModal({ isOpen: true, content: modalContent, isClose: false });
  };

  return { writeModal, setWriteModal, handleClickModal };
};
