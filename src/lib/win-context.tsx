import React from 'react';
import { StartMenuItem } from '../top-nav/start-menu/start-menu';
import { EventRegistry } from './event-registry';

type StartMenuSelectEventHandler = (data: StartMenuItem) => void;

export type WinCtx = {
  startMenuSelect: (startMenuItem: StartMenuItem) => void;
  onStartMenuSelect: (callback: StartMenuSelectEventHandler) => () => void;
};

type WinContextProviderProps = {
  children: JSX.Element | null;
};

const WinContext = React.createContext<WinCtx | undefined>(undefined);


export function WinContextProvider(props: WinContextProviderProps) {

  const startMenuEventRegistry = new EventRegistry<StartMenuItem, void>(false);

  const winCtx: WinCtx = {
    startMenuSelect,
    onStartMenuSelect: registerStartMenuEventHandler,
  };

  return (
    <WinContext.Provider value={winCtx}>
      {props.children}
    </WinContext.Provider>
  ); 

  function startMenuSelect(startMenuItem: StartMenuItem) {
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
