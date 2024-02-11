
import './window-manager.scss';
import React, { useEffect, useState } from 'react';
import { Instance as PopperInstance } from '@popperjs/core'

import { useWinCtx } from './win-context';
import { START_MENU_ITEMS, StartMenuItem } from '../top-nav/start-menu/start-menu';
import { Popper, PopperProps } from '@mui/material';
import { EzdWindow } from '../components/ezd-window/ezd-window';
import { WindowItem } from '../models/window-item';
import { EzdWeb } from '../ezd-web/ezd-web';
import { EzdAbout } from '../ezd-web/ezd-about/ezd-about';

const BASE_Z_INDEX = 1000;

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
      {windows.map(window => {
        const popperRef = React.createRef<PopperInstance>();
        return (
          <Popper
            open={true}
            className="ezd-window-popper"
            anchorEl={window.virtualElement}
            key={window.id}
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
              zIndex: BASE_Z_INDEX + window.layer,
            }}
          >
            <EzdWindow
              onClose={() => {
                handleOnClose(window.id);
              }}
              onMouseDown={handleMouseDown}
              windowItem={window}
              popperRef={popperRef}
            >
              <div className="ezd-window-content-container">
                {(window.content === undefined)
                  ? window.title
                  : <window.content/>
                }
              </div>
            </EzdWindow>
          </Popper>
        );
      })}
    </>
  );

  function handleMouseDown($e: React.MouseEvent<HTMLDivElement>, targetWindow: WindowItem) {
    let topLayer: number;
    topLayer = getTopLayer();
    /*
      find every window in front of the current window.
      Update all windows in front of the current window
        to have layer - 1
      Update current window layer to top layer
    */
    let frontWindows: WindowItem[];
    frontWindows = windows.filter(win => {
      return win.layer > targetWindow.layer;
    });
    frontWindows.forEach(frontWindow => {
      frontWindow.layer = frontWindow.layer - 1;
    });

    targetWindow.layer = topLayer;

    setWindows([
      ...windows,
    ]);
    //  $e.preventDefault();
    //  $e.stopPropagation();
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
    let nextWindowItem: WindowItem;
    let nextWindowItems: WindowItem[];
    nextWindowItem = getWindowItem(startMenuItem);
    nextWindowItem.layer = getTopLayer() + 1;
    nextWindowItems = [
      ...windows,
      nextWindowItem,
    ];
    console.log(nextWindowItem);
    setWindows(nextWindowItems);
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

  function getTopLayer(): number {
    let currTopLayer = windows.reduce((acc, curr) => {
      return Math.max(acc, curr.layer ?? -1);
    }, 0);
    return currTopLayer;
  }
}
