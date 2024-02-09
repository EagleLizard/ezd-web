import React from 'react';
import { StartMenuItem } from '../top-nav/start-menu/start-menu';
import { EventRegistry } from './event-registry';
import { WindowItem } from '../models/window-item';

type StartMenuSelectEventHandler = (data: WindowItem) => void;

export type WinCtx = {
  startMenuSelect: (startMenuItem: WindowItem) => void;
  onStartMenuSelect: (callback: StartMenuSelectEventHandler) => () => void;
};

type WinContextProviderProps = {
  children: JSX.Element | null;
};

const WinContext = React.createContext<WinCtx | undefined>(undefined);


export function WinContextProvider(props: WinContextProviderProps) {

  const startMenuEventRegistry = new EventRegistry<WindowItem, void>(false);

  const winCtx: WinCtx = {
    startMenuSelect,
    onStartMenuSelect: registerStartMenuEventHandler,
  };

  return (
    <WinContext.Provider value={winCtx}>
      {props.children}
    </WinContext.Provider>
  ); 

  function startMenuSelect(startMenuItem: WindowItem) {
    startMenuEventRegistry.trigger(startMenuItem);
  }

  function registerStartMenuEventHandler(callback: StartMenuSelectEventHandler) {
    return startMenuEventRegistry.register(callback);
  }
}

export function useWinCtx(): WinCtx {
  const winCtx = React.useContext(WinContext);
  if(winCtx === undefined) {
    throw new Error(`useWinCtx() must be used in a WinContext`);
  }
  return winCtx;
}
