import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

interface ModalInfo {
  Component: any;
  props: any;
  isOpen: boolean;
}

const Modals = () => {
  const openedModals = useContext<ModalInfo[]>(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  useEffect(() => {
    if (openedModals.length > 1) {
      openedModals.slice(0, -1).forEach((modal) => close(modal.Component));
    }
  }, [openedModals, close]);

  return ReactDOM.createPortal(
    <div className={'modal-wrapper'}>
      {openedModals.slice(0).map((modalInfo, index) => {
        const { Component, props, isOpen } = modalInfo;
        const onClose = () => {
          close(Component);
        };
        return (
          <Component key={index} isOpen={isOpen} onClose={onClose} {...props} />
        );
      })}
    </div>,
    document.body,
  );
};

export default Modals;
