
import './top-nav.scss';
import React, { useCallback, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../components/ezd-button/ezd-button';
import { ClickAwayListener, Popper } from '@mui/material';
import { StartMenu, StartMenuItem } from './start-menu/start-menu';
import { useWinCtx } from '../lib/win-context';
import { WindowItem } from '../models/window-item';
import { TrayClock } from './tray-clock/tray-clock';

type TopNavProps = {

};

export function TopNav(props: TopNavProps) {

  const winCtx = useWinCtx();
  const [openWindows, ] = winCtx.openWindowState;

  const [startMenuOpen, setStartMenuOpen] = React.useState<boolean>(false);

  // const startMenuBtnEl = React.useRef<HTMLButtonElement | null>(null);
  const [ startMenuBtnEl, setStartMenuBtnEl ] = useState<HTMLButtonElement>();
  const onStartMenuBtnRefChange = useCallback((el: HTMLButtonElement) => {
    setStartMenuBtnEl(el);
  }, []);


  return (
    <div className="top-nav">
      <div className="top-nav-btn">
        <EzdButton
          onClick={($e) => {
            handleStartMenuClick($e);
          }}
          ref={onStartMenuBtnRefChange}
        >
          🦎 Start
        </EzdButton>
      </div>
      <div className="top-nav-divider"/>
      {/* <div className="top-nav-btn">
        <Link to="/">
          <EzdButton>
            Home 
          </EzdButton>
        </Link>
      </div>
      <div className="top-nav-btn">
        <Link to="/about">
          <EzdButton>
              About
          </EzdButton>
        </Link>
      </div> */}
      <div className="tasks">
        {openWindows.map(win => {
          let topLayer: number;
          let isTopWindow: boolean;
          let activeWin: boolean;
          topLayer = winCtx.getTopVisibleLayer();
          isTopWindow = win.layer === topLayer;
          activeWin = winCtx.isWindowActive(win.id);
          return (
            <div
              key={win.id}
              className={[
                'task',
                (activeWin)
                  ? 'top-win'
                  : ''
              ].join(' ')}
            >
              <EzdButton
                onClick={() => {
                  handleTaskClick(win);
                }}
              >
                <div className="task-btn-inner">
                  {win.title}
                </div>
              </EzdButton>
            </div>
          )
        })}
      </div>
      <div className="ezd-tray-container status-bar">
        <div className="ezd-tray status-bar-field">
          <TrayClock/>
        </div>
      </div>
      <Popper
        open={startMenuOpen}
        anchorEl={startMenuBtnEl}
      >
        <ClickAwayListener
          onClickAway={handleCLickAway}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <StartMenu
            onClick={handleStartMenuItemClick}
          />
        </ClickAwayListener>
      </Popper>
    </div>
  );

  function handleTaskClick(win: WindowItem) {
    winCtx.setWinMinimized(win.id, false);
  }

  function handleStartMenuItemClick(startMenuItem: WindowItem) {
    winCtx.startMenuSelect(startMenuItem);
  }

  function handleCLickAway() {
    setStartMenuOpen(false);
  }

  function handleStartMenuClick($e: React.MouseEvent<HTMLElement>) {
    setStartMenuOpen(!startMenuOpen);
  }
}
