import React, { ReactNode, useMemo, useState } from 'react';
import {
  ModalItem,
  ModalsDispatchContext,
  ModalsStateContext,
} from './ModalsContext';
// import Modals from './Modals';

const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalItem[]>([]);

  const open = (Component: ReactNode, props: any) => {
    setOpenedModals((prevModals) => [
      ...prevModals,
      {
        Component,
        props,
        isOpen: true,
      },
    ]);
  };

  const close = (Component: ReactNode) => {
    setOpenedModals((prevModals) =>
      prevModals.filter((item) => item.Component !== Component),
    );
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {/* <Modals /> */}
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
