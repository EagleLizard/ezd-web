
import './window-manager.scss';
import React, { useEffect, useState } from 'react';
import { Instance as PopperInstance } from '@popperjs/core'

import { useWinCtx } from './win-context';
import { START_MENU_ITEMS, StartMenuItem } from '../top-nav/start-menu/start-menu';
import { Popper } from '@mui/material';
import { EzdWindow } from '../components/ezd-window/ezd-window';
import { BASE_Z_INDEX, WindowItem } from '../models/window-item';

export const INITIAL_WINDOW_ITEMS = [
  START_MENU_ITEMS[2],
  START_MENU_ITEMS[0],
  START_MENU_ITEMS[1],
].map((initialWinItem, idx) => {
  initialWinItem.layer = idx + 1;
  return initialWinItem;
});

export function WindowManager() {
  const winCtx = useWinCtx();
  const [windows, setWindows] = winCtx.openWindowState;

  useEffect(() => {
    const startMenuEventUnregister = winCtx.onStartMenuSelect((startMenuItem) => {
      handleStartMenuSelect(startMenuItem);
    });
    return () => {
      startMenuEventUnregister();
    };
  }, [
    windows
  ]);

  return (
    <>
      {windows.map(win => {
        const popperRef = React.createRef<PopperInstance>();
        return (
          <Popper
            open={!win.minimized}
            className="ezd-window-popper"
            anchorEl={win.virtualElement}
            key={win.id}
            popperRef={popperRef}
            placement="right-start"
            modifiers={[
              {
                name: 'flip',
                enabled: false,
                // options: {
                //   fallbackPlacements: [],
                // },
              },
            ]}
            style={{
              zIndex: BASE_Z_INDEX + win.layer,
            }}
          >
            <EzdWindow
              onClose={() => {
                handleOnClose(win.id);
              }}
              onMinimizeClick={handleMinimizeClick}
              onMouseDown={handleMouseDown}
              windowItem={win}
              popperRef={popperRef}
              active={winCtx.isWindowActive(win.id)}
            >
              <div className="ezd-window-content-container">
                {(win.content === undefined)
                  ? win.title
                  : <win.content/>
                }
              </div>
            </EzdWindow>
          </Popper>
        );
      })}
    </>
  );

  function handleMinimizeClick(windowId: string) {
    winCtx.setWinMinimized(windowId, true);
  }

  function handleMouseDown($e: React.MouseEvent<HTMLDivElement>, targetWindow: WindowItem) {
    winCtx.toTopLayer(targetWindow.id);
  }

  function handleOnClose(windowId: string) {
    let foundWindowIdx: number;
    let nextWindows: WindowItem[];
    foundWindowIdx = windows.findIndex(window => {
      return window.id === windowId;
    });
    if(foundWindowIdx === -1) {
      return;
    }
    nextWindows = windows.slice();
    nextWindows.splice(foundWindowIdx, 1);
    setWindows(nextWindows);
  }

  function handleStartMenuSelect(startMenuItem: WindowItem) {
    winCtx.launchWindow({
      ...startMenuItem,
    });
  }

  function getWindowItem(startMenuItem: StartMenuItem): WindowItem {
    let windowItem: WindowItem;

    windowItem =  WindowItem.init({
      key: startMenuItem.key,
      title: startMenuItem.title,
      content: startMenuItem.content,
    });

    return windowItem;
  }
}
