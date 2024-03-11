import { useState } from 'react';

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
