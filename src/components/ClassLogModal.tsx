import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import { useState } from 'react';

const SClassLogBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SClassLogContent = styled.div`
  border: 1px solid black;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ClassLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleCloseBtn = () => {
    setModal({ isOpen: false, content: null });
  };

  return (
    <SClassLogBackground>
      <SClassLogContent>
        <button onClick={handleCloseBtn}>&times;</button>
        <p>학급일지</p>
      </SClassLogContent>
    </SClassLogBackground>
  );
};

export default ClassLogModal;
