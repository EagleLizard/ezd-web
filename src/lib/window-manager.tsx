import React, { useEffect, useState } from 'react';
import { Instance as PopperInstance } from '@popperjs/core'

import { useWinCtx } from './win-context';
import { StartMenuItem } from '../top-nav/start-menu/start-menu';
import { Popper, PopperProps } from '@mui/material';
import { EzdWindow } from '../components/ezd-window/ezd-window';
import { WindowItem } from '../models/window-item';

export function WindowManager() {
  const winCtx = useWinCtx();
  const [windows, setWindows] = useState<WindowItem[]>([]);

  useEffect(() => {
    const startMenuEventUnregister = winCtx.onStartMenuSelect((startMenuItem) => {
      handleStartMenuSelect(startMenuItem);
    });
    return () => {
      startMenuEventUnregister();
    };
  }, [
    windows
  ])

  return (
    <>
      {windows.map(window => {
        const popperRef = React.createRef<PopperInstance>();
        return (
          <Popper
            open={true}
            anchorEl={window.virtualElement}
            key={window.id}
            popperRef={popperRef}
          >
            <EzdWindow
              onClose={() => {
                handleOnClose(window.id);
              }}
              windowItem={window}
              popperRef={popperRef}
            >
              <div>
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

  function handleStartMenuSelect(startMenuItem: StartMenuItem) {
    let nextWindowItem: WindowItem;
    let nextWindowItems: WindowItem[];
    nextWindowItem = getWindowItem(startMenuItem);
    nextWindowItems = [
      ...windows,
      nextWindowItem,
    ];
    setWindows(nextWindowItems);
  }

  function getWindowItem(startMenuItem: StartMenuItem): WindowItem {
    let windowItem: WindowItem;

    windowItem =  WindowItem.init(
      startMenuItem.key,
      startMenuItem.label,
      startMenuItem.content,
    );

    return windowItem;
  }
}
