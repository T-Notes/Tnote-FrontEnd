import { useEffect } from 'react';
import styled from 'styled-components';
import { useModal } from '../../utils/useHooks/useModal';
import { useToggle } from '../../utils/useHooks/useToggle';
import { ModalBackground } from '../common/styled/ModalLayout';
import WriteFormModal from './WriteFormModal';

const SWriteBtn = styled.button`
  width: 80px;
  height: 80px;
  position: fixed;
  bottom: 2%;
  left: 14%;
  border-radius: 82px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption1};
`;
const WriteButton = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <SWriteBtn onClick={openModal}>글쓰기</SWriteBtn>
      {isOpen && <WriteFormModal isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
};

export default WriteButton;
