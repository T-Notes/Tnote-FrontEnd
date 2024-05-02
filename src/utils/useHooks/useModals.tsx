import { ReactNode, useContext } from 'react';
import { ModalsDispatchContext } from '../../modal/ModalsContext';

export const useModals = () => {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (Component: ReactNode, props: any) => {
    open(Component, props);
  };

  const closeModal = (Component: ReactNode) => {
    close(Component);
  };

  return { openModal, closeModal };
};
