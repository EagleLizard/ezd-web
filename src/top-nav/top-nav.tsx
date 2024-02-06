
import './top-nav.scss';
import React, { useCallback, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../components/ezd-button/ezd-button';
import { ClickAwayListener, Popper } from '@mui/material';
import { StartMenu, StartMenuItem } from './start-menu/start-menu';
import { useWinCtx } from '../lib/win-context';

type TopNavProps = {

};

export function TopNav(props: TopNavProps) {

  const [startMenuOpen, setStartMenuOpen] = React.useState<boolean>(false);

  // const startMenuBtnEl = React.useRef<HTMLButtonElement | null>(null);
  const [ startMenuBtnEl, setStartMenuBtnEl ] = useState<HTMLButtonElement>();
  const onStartMenuBtnRefChange = useCallback((el: HTMLButtonElement) => {
    setStartMenuBtnEl(el);
  }, []);

  const winCtx = useWinCtx();

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
      <div className="top-nav-btn">
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
      </div>
      <Popper
        open={startMenuOpen}
        anchorEl={startMenuBtnEl}
      >
        <ClickAwayListener
          onClickAway={handleCLickAway}
        >
          <StartMenu
            onClick={handleStartMenuItemClick}
          />
        </ClickAwayListener>
      </Popper>
    </div>
  );

  function handleStartMenuItemClick(startMenuItem: StartMenuItem) {
    winCtx.startMenuSelect(startMenuItem);
  }

  function handleCLickAway() {
    setStartMenuOpen(false);
  }

  function handleStartMenuClick($e: React.MouseEvent<HTMLElement>) {
    setStartMenuOpen(!startMenuOpen);
  }
}
