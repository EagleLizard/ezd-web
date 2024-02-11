import React, { useEffect, useState } from 'react';
import { START_MENU_ITEMS, StartMenuItem } from '../top-nav/start-menu/start-menu';
import { EventRegistry } from './event-registry';
import { WindowItem, WindowItemParams } from '../models/window-item';
import { INITIAL_WINDOW_ITEMS } from './window-manager';

type StartMenuSelectEventHandler = (data: WindowItem) => void;

export type WinCtx = {
  startMenuSelect: (startMenuItem: WindowItem) => void;
  onStartMenuSelect: (callback: StartMenuSelectEventHandler) => () => void;
  setWinMinimized: (windowId: string, minimized: boolean) => void;
  toTopLayer: (windowId: string) => void;
  getTopVisibleLayer: () => number;
  getTopLayer: () => number;
  launchWindow: (winItem: WindowItemParams) => void;
  isWindowActive: (windowId: string) => boolean;
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
    setWinMinimized,
    toTopLayer,
    getTopVisibleLayer,
    getTopLayer,
    launchWindow,
    isWindowActive,
    openWindowState: [
      openWindows,
      (windowItems) => {
        setOpenWindows(windowItems);
      }
    ],
    
  };


  // useEffect(() => {
  //   console.log(openWindows);
  // }, [openWindows])

  return (
    <WinContext.Provider value={winCtx}>
      {props.children}
    </WinContext.Provider>
  );
  function isWindowActive(windowId: string) {
    let foundWin: WindowItem | undefined;
    foundWin = openWindows.find(win => {
      return win.id === windowId;
    });
    if(foundWin === undefined) {
      return false;
    }
    return !foundWin.minimized && (foundWin.layer === getTopVisibleLayer());
  }

  function launchWindow(windowItemParams: WindowItemParams) {
    let nextWindowItem: WindowItem;
    nextWindowItem = WindowItem.init({
      ...windowItemParams,
      layer: getTopLayer() + 1,
    });
    setOpenWindows([
      ...openWindows,
      nextWindowItem,
    ]);
  }

  function setWinMinimized(windowId: string, minimized: boolean) {
    let foundWin: WindowItem | undefined;
    foundWin = openWindows.find(win => {
      return win.id === windowId;
    });
    if(foundWin === undefined) {
      return;
    }
    foundWin.minimized = minimized;

    setOpenWindows([
      ...openWindows
    ]);
    if(!foundWin.minimized) {
      toTopLayer(foundWin.id);
    }
  }

  function toTopLayer(windowId: string) {
    // let targetWindow: WindowItem | undefined;
    let frontWindows: WindowItem[];
    let topLayer: number;
    const targetWindow = openWindows.find(win => {
      return win.id === windowId;
    });
    if(targetWindow === undefined) {
      return;
    }
    topLayer = getTopLayer();
    frontWindows = openWindows.filter(win => {
      return win.layer > targetWindow.layer;
    });
    frontWindows.forEach(frontWindow => {
      frontWindow.layer = frontWindow.layer - 1;
    });

    targetWindow.layer = topLayer;

    setOpenWindows([
      ...openWindows,
    ]);
  }

  function startMenuSelect(startMenuItem: WindowItem) {
    startMenuEventRegistry.trigger(startMenuItem);
  }

  function registerStartMenuEventHandler(callback: StartMenuSelectEventHandler) {
    return startMenuEventRegistry.register(callback);
  }

  function getTopVisibleLayer(): number {
    let topVisibleLayer = openWindows
      .filter(win => {
        return !win.minimized;
      })
      .reduce((acc, curr) => {
        return Math.max(acc, curr.layer ?? -1);
      }, 0);
    return topVisibleLayer;
  }

  function getTopLayer(): number {
    let currTopLayer = openWindows
      .reduce((acc, curr) => {
        return Math.max(acc, curr.layer ?? -1);
      }, 0);
    return currTopLayer;
  }
}

export function useWinCtx(): WinCtx {
  const winCtx = React.useContext(WinContext);
  if(winCtx === undefined) {
    throw new Error(`useWinCtx() must be used in a WinContext`);
  }
  return winCtx;
}
