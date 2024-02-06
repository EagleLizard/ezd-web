import { useEffect, useState } from 'react';
import { useWinCtx } from './win-context';
import { StartMenuItem } from '../top-nav/start-menu/start-menu';
import { Popper } from '@mui/material';
import { EzdWindow } from '../components/ezd-window/ezd-window';

let idCounter = 0;

let xOrigin = 50;
let yOrigin = 50;

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  x: number;
  y: number;
}

export type WindowItem = {
  id: number;
  key: string;
  title: string;
  virtualEl: VirtualElement,
}

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
        return (
          <Popper
            open={true}
            anchorEl={window.virtualEl}
            key={window.id}
          >
            <EzdWindow
              onClose={() => {
                handleOnClose(window.id);
              }}
              windowItem={window}
            >
              <div>
                {window.title}
              </div>
            </EzdWindow>
          </Popper>
        );
      })}
    </>
  );

  function handleOnClose(windowId: number) {
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
    // console.log(startMenuItem);
    nextWindowItem = getWindowItem(startMenuItem);
    console.log(windows);
    nextWindowItems = [
      ...windows,
      nextWindowItem,
    ];
    setWindows(nextWindowItems);
  }

  function getWindowItem(startMenuItem: StartMenuItem): WindowItem {
    let virtualEl: VirtualElement = {
      getBoundingClientRect: function() {
        return {
          width: 0,
          height: 0,
          top: this.x,
          right: this.x,
          bottom: this.y,
          left: this.x,
          x: this.x,
          y: this.y,
          toJSON: () => '',
        };
      },
      x: xOrigin,
      y: yOrigin,
    };
    yOrigin += 10;
    xOrigin += 10;
    return {
      id: idCounter++,
      key: startMenuItem.key,
      title: startMenuItem.label,
      virtualEl,
    };
  }
}
