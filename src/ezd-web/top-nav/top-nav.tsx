
import './top-nav.scss';
import React, { useCallback, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';
import { ClickAwayListener, Popper } from '@mui/material';
import { START_MENU_ITEMS, StartMenu, StartMenuItem } from './start-menu/start-menu';
import { useWinCtx } from '../../lib/win-context';
import { BASE_Z_INDEX, WindowItem, WindowItemParams } from '../../models/window-item';
import { TrayClock } from './tray-clock/tray-clock';
import { MdWindowItem, MdWindowParams } from '../../models/windows/md-window';
import { AlertWinItemParams } from '../../models/windows/alert-window';

type TopNavProps = {

};

export function TopNav(props: TopNavProps) {
  const winCtx = useWinCtx();

  const [openWindows, ] = winCtx.openWindowState;
  const [startMenuOpen, setStartMenuOpen] = React.useState<boolean>(false);
  const [ startMenuBtnEl, setStartMenuBtnEl ] = useState<HTMLButtonElement | null>(null);
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
        <StartMenu
          menuItems={START_MENU_ITEMS}
          open={startMenuOpen}
          isRoot={true}
          anchorEl={startMenuBtnEl}
          onClickAway={handleCLickAway}
          onClick={handleStartMenuItemClick}
        />
    </div>
  );

  function handleTaskClick(win: WindowItem) {
    winCtx.setWinMinimized(win.id, false);
  }

  function handleStartMenuItemClick(startMenuItem: StartMenuItem) {
    let mdWinParams: MdWindowParams;
    let startMenuWinItem: WindowItem;

    startMenuWinItem = WindowItem.init({
      ...startMenuItem,
    });
    switch(startMenuWinItem.key) {
      case 'about':
        mdWinParams = {
          title: startMenuWinItem.title,
          key: startMenuWinItem.key,
          mdImportCb: MdWindowItem.getMdImportCb(
            'https://raw.githubusercontent.com/EagleLizard/ezd-web/main/src/ezd-web/ezd-about/ezd-about.md'
          ),
        };
        winCtx.launchMdWin(mdWinParams);
        break;
      case 'home':
        mdWinParams = {
          title: startMenuWinItem.title,
          key: startMenuWinItem.key,
          // mdImportCb: async () => {
          //   const mdContent = (await import('../ezd-web/ezd-home/ezd-home.md?raw')).default;
          //   return mdContent;
          // }
          mdImportCb: MdWindowItem.getMdImportCb(
            'https://raw.githubusercontent.com/EagleLizard/ezd-web/main/src/ezd-web/ezd-home/ezd-home.md'
          ),
        }
        winCtx.launchMdWin(mdWinParams);
        break;
      case 'test_alert':
        let alertParams: AlertWinItemParams;
        alertParams = {
          title: 'Alert test',
          key: startMenuItem.key,
          width: 200,
          height: 100,
        };
        winCtx.launchAlertWin(alertParams);
        break;
      default:
        winCtx.startMenuSelect(startMenuWinItem);
    }
  }

  function handleCLickAway() {
    setStartMenuOpen(false);
  }

  function handleStartMenuClick($e: React.MouseEvent<HTMLElement>) {
    setStartMenuOpen(!startMenuOpen);
  }
}
