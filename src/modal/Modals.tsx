import { useContext } from 'react';
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

  return ReactDOM.createPortal(
    <div className={'modal-wrapper'}>
      {openedModals.map((modalInfo, index) => {
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
