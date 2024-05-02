import React, { useContext } from 'react';
import ReactDom from 'react-dom';
import {
  ModalItem,
  ModalsDispatchContext,
  ModalsDispatchContextType,
  ModalsStateContext,
} from './ModalsContext';

const Modals = () => {
  const openedModals = useContext<ModalItem[]>(ModalsStateContext);
  const { close } = useContext<ModalsDispatchContextType>(
    ModalsDispatchContext,
  );

  return ReactDom.createPortal(
    <div className={'modal-wrapper'}>
      {openedModals.map((modalInfo, index) => {
        const { Component, props, isOpen } = modalInfo;
        const onClose = () => {
          console.log('닫기');
          close(Component);
        };
        const ModalComponent = Component as React.ElementType;
        return (
          <ModalComponent
            key={index}
            isOpen={isOpen}
            onClose={onClose}
            {...props}
          />
        );
      })}
    </div>,
    document.body,
  );
};

export default Modals;
