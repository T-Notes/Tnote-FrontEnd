import React, { createContext, ReactNode, useMemo, useState } from 'react';
import Modals from './Modals';

interface ModalItem {
  Component: any;
  props: any;
  isOpen: boolean;
}

interface ModalsContextType {
  open: (Component: any, props: any) => void;
  close: (Component: any) => void;
}

export const ModalsDispatchContext = createContext<ModalsContextType>({
  open: (Component, props) => {},
  close: (Component) => {},
});

export const ModalsStateContext = createContext<ModalItem[]>([]);
