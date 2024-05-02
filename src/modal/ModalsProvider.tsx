import React, { useMemo, useState, ReactNode } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';
import Modals from './Modals';

interface ModalItem {
  Component: any;
  props: any;
  isOpen: boolean;
}

const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalItem[]>([]);

  const open = (Component: any, props: any) => {
    setOpenedModals((prevModals) => [
      ...prevModals,
      {
        Component,
        props,
        isOpen: true,
      },
    ]);
  };

  const close = (Component: any) => {
    setOpenedModals((prevModals) =>
      prevModals.filter((item) => item.Component !== Component),
    );
  };

  const dispatch = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        <Modals />
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
