import { createContext, ReactNode } from 'react';

type OpenModalFunction = (Component: ReactNode, props: any) => void;
type CloseModalFunction = (Component: ReactNode) => void;

export interface ModalsDispatchContextType {
  open: OpenModalFunction;
  close: CloseModalFunction;
}

export interface ModalItem {
  Component: ReactNode;
  props: any;
  isOpen: boolean;
}

export const ModalsDispatchContext = createContext<ModalsDispatchContextType>({
  open: (Component, props) => {},
  close: (Component) => {},
});

export const ModalsStateContext = createContext<ModalItem[]>([]);
