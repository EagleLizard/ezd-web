import React, { useEffect, useState } from 'react';
import { START_MENU_ITEMS, StartMenuItem } from '../top-nav/start-menu/start-menu';
import { EventRegistry } from './event-registry';
import { WindowItem } from '../models/window-item';
import { INITIAL_WINDOW_ITEMS } from './window-manager';

type StartMenuSelectEventHandler = (data: WindowItem) => void;

export type WinCtx = {
  startMenuSelect: (startMenuItem: WindowItem) => void;
  onStartMenuSelect: (callback: StartMenuSelectEventHandler) => () => void;
  openWindowState: [
    WindowItem[],
    (windowItems: WindowItem[]) => void,
  ],
};

type WinContextProviderProps = {
  children: JSX.Element | null;
};

const WinContext = React.createContext<WinCtx | undefined>(undefined);


export function WinContextProvider(props: WinContextProviderProps) {
  let [openWindows, setOpenWindows] = useState<WindowItem[]>([
    ...INITIAL_WINDOW_ITEMS,
  ]);

  const startMenuEventRegistry = new EventRegistry<WindowItem, void>(false);

  const winCtx: WinCtx = {
    startMenuSelect,
    onStartMenuSelect: registerStartMenuEventHandler,
    openWindowState: [
      openWindows,
      (windowItems) => {
        setOpenWindows(windowItems);
      }
    ]
  };

  useEffect(() => {
    console.log({openWindows});
  }, [
    openWindows
  ]);

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
