import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalBackground } from '../common/styled/ModalLayout';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WorkLogModal from './WorkLogModal';
import WriteFormModal from './WriteFormModal';

const SWriteBtn = styled.button`
  width: 70px;
  height: 70px;
  position: fixed;
  left: 200px;
  bottom: 20px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption3};
`;

interface Reload {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const WriteButton = ({ setReload }: Reload) => {
  const [isOpenWriteFormModal, setIsOpenWriteFormModal] =
    useState<boolean>(false);

  const [isOpenWriteModal, setIsOpenWriteModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );

  const handleClickModal = (openModalContent: string) => {
    console.log(1, openModalContent);

    if (openModalContent === '학급일지') {
      setModalContent(
        <ClassLogModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
          setReload={setReload}
        />,
      );
    } else if (openModalContent === '업무일지') {
      setModalContent(
        <WorkLogModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
          setReload={setReload}
        />,
      );
    } else if (openModalContent === '상담기록') {
      setModalContent(
        <ConsultationRecordsModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
          setReload={setReload}
        />,
      );
    } else if (openModalContent === '학생 관찰 일지') {
      setModalContent(
        <StudentRecordsModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
          setReload={setReload}
        />,
      );
    }
    setIsOpenWriteModal(true);
    closeWriteFormModal();
  };

  const openWriteModal = () => {
    setIsOpenWriteModal(true);
  };

  const closeWriteModal = () => {
    setIsOpenWriteModal(false);
  };

  const openWriteFormModal = () => {
    setIsOpenWriteFormModal(true);
  };

  const closeWriteFormModal = () => {
    setIsOpenWriteFormModal(false);
  };

  return (
    <>
      <SWriteBtn onClick={openWriteFormModal}>글쓰기</SWriteBtn>
      {isOpenWriteFormModal && (
        <WriteFormModal
          closeWriteFormModal={closeWriteFormModal}
          handleClickModal={handleClickModal}
        />
      )}
      {modalContent && isOpenWriteModal ? (
        <ModalBackground>{modalContent}</ModalBackground>
      ) : null}
    </>
  );
};

export default WriteButton;
