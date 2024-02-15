import React, { useEffect, useState } from 'react';
import { START_MENU_ITEMS, StartMenuItem } from '../top-nav/start-menu/start-menu';
import { EventRegistry } from './event-registry';
import { WindowItem, WindowItemParams } from '../models/window-item';
import { MdWindowItem, MdWindowParams } from '../models/windows/md-window';
import { INITIAL_WINDOW_ITEMS } from './window-manager';
import { ClockWindowItem } from '../models/windows/clock-window';

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

  launchMdWin: (winParams: MdWindowParams) => void;
  launchClockWin: () => void;

  openWindowState: [
    WindowItem[],
    (windowItems: WindowItem[]) => void,
  ],
};

type WinContextProviderProps = {
  children: JSX.Element | null;
};

const WinContext = React.createContext<WinCtx | undefined>(undefined);

// MdWindowItem.getMdImportCb('https://raw.githubusercontent.com/EagleLizard/ezd-web/main/src/ezd-web/ezd-about/ezd-about.md');
// MdWindowItem.getMdImportCb('../ezd-web/ezd-about/ezd-about.md?raw');

export function WinContextProvider(props: WinContextProviderProps) {
  let [openWindows, setOpenWindows] = useState<WindowItem[]>([
    // ...INITIAL_WINDOW_ITEMS,
    // ClockWindowItem.init({
    //   width: 300,
    //   height: 200,
    //   // layer: getTopLayer() + 1,
    // }),
    MdWindowItem.init({
      title: 'About',
      key: 'about',
      mdImportCb: MdWindowItem.getMdImportCb(
        'https://raw.githubusercontent.com/EagleLizard/ezd-web/main/src/ezd-web/ezd-about/ezd-about.md'
      ),
      width: 210,
      height: 170,
      x: 100,
      y: 150,
    }),
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
  
    launchMdWin,
    launchClockWin,

    openWindowState: [
      openWindows,
      (windowItems) => {
        setOpenWindows(windowItems);
      }
    ],
    
  };

  return (
    <WinContext.Provider value={winCtx}>
      {props.children}
    </WinContext.Provider>
  );


  function launchClockWin() {
    let nextClockWin: ClockWindowItem;
    let openWindow: WindowItem | undefined;
    openWindow = getOpenWindow('clock');
    if(openWindow !== undefined) {
      setWinMinimized(openWindow.id, false);
      toTopLayer(openWindow.id);
      return;
    }
    nextClockWin = ClockWindowItem.init({
      width: 300,
      height: 200,
      layer: getTopLayer() + 1,
    });

    setOpenWindows([
      ...openWindows,
      nextClockWin,
    ]);
  }


  function launchMdWin(mdWinParams: MdWindowParams) {
    let nextMdWin: MdWindowItem;
    let openWindow: WindowItem | undefined;
    openWindow = getOpenWindow(mdWinParams.key)
    if(openWindow !== undefined) {
      setWinMinimized(openWindow.id, false);
      toTopLayer(openWindow.id);
      return;
    }
    nextMdWin = MdWindowItem.init({
      ...mdWinParams,
      layer: getTopLayer() + 1,
    });
    setOpenWindows([
      ...openWindows,
      nextMdWin,
    ]);
  }

  function getOpenWindow(winKey: string): WindowItem | undefined {
    let foundWindow: WindowItem | undefined;
    foundWindow = openWindows.find(openWin => {
      return openWin.key === winKey;
    });
    return foundWindow;
  }

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
