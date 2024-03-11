import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModal, WriteModal } from '../../utils/useHooks/useModal';
import { useToggle } from '../../utils/useHooks/useToggle';
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
const WriteButton = () => {
  // const { isOpen, openModal, closeModal } = useModal();
  const [isOpenWriteFormModal, setIsOpenWriteFormModal] =
    useState<boolean>(false);
  // 모달이 열릴것인지 상태 확인
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
        />,
      );
    } else if (openModalContent === '업무일지') {
      setModalContent(
        <WorkLogModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
        />,
      );
    } else if (openModalContent === '상담기록') {
      setModalContent(
        <ConsultationRecordsModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
        />,
      );
    } else if (openModalContent === '학생 관찰 일지') {
      setModalContent(
        <StudentRecordsModal
          closeWriteModal={closeWriteModal}
          handleClickModal={handleClickModal}
        />,
      );
    }
    setIsOpenWriteModal(true);
    closeWriteFormModal();
  };
  console.log(2, modalContent);

  const openWriteModal = () => {
    setIsOpenWriteModal(true);
  };

  const closeWriteModal = () => {
    setIsOpenWriteModal(false);
  };
  // const [writeModal, setWriteModal] = useState<WriteModal>({
  //   isOpen: false,
  //   content: null,
  //   isClose: true,
  // });
  //여기서 모달 열리는 부분 상태를 정의 handleClickModal

  const openWriteFormModal = () => {
    setIsOpenWriteFormModal(true);
  };

  const closeWriteFormModal = () => {
    setIsOpenWriteFormModal(false);
  };

  // useEffect(() => {
  //   if (writeModal.isOpen) closeModal();
  // }, [writeModal]);

  return (
    <>
      <SWriteBtn onClick={openWriteFormModal}>글쓰기</SWriteBtn>
      {isOpenWriteFormModal && (
        <WriteFormModal
          closeWriteFormModal={closeWriteFormModal}
          handleClickModal={handleClickModal}
          // isOpen={isOpen}
          // closeModal={closeModal}
          // setWriteModal={setWriteModal}
        />
      )}
      {modalContent && isOpenWriteModal ? (
        <ModalBackground>{modalContent}</ModalBackground>
      ) : null}
      {/* {writeModal.isOpen && !writeModal.isClose ? (
        <ModalBackground>{writeModal.content}</ModalBackground>
      ) : null} */}
    </>
  );
};

export default WriteButton;
