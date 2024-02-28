
import './start-menu.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import IconRightSVG from '../../external/icon/button-right.svg?react';

import { EzdButton } from '../../components/ezd-button/ezd-button';
import { BASE_Z_INDEX, WindowItem } from '../../models/window-item';
import { EzdAbout } from '../../ezd-web/ezd-about/ezd-about';
import { TestWin } from '../../ezd-web/test-win/test-win';
import { EzdHome } from '../../ezd-web/ezd-home/ezd-home';
import { ClickAwayListener, Popper, PopperProps } from '@mui/material';
import { useWinCtx } from '../../lib/win-context';


export type StartMenuItem = {
  title: string;
  key: string;
  content?: React.FC;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  submenu?: StartMenuItem[]
  open?: boolean;
};

const baseStartMenuItems: StartMenuItem[] = [
  {
    title: 'Home',
    key: 'home',
    content: () => {
      return (
        <EzdHome/>
      )
    },
    x: 100,
    y: 100,
    width: 150,
    height: 100,
  },
  {
    title: 'About',
    key: 'about',
    content: () => {
      return (
        <EzdAbout/>
      );
    },
    x: 200,
    y: 200,
    width: 250,
    height: 200,
  },
  {
    title: 'Test Win',
    key: 'test_win',
    content: () => {
      return (
        <TestWin/>
      );
    },
    // x: 100,
    y: 40,
  },
  {
    title: 'Programs',
    key: 'programs_menu',
    submenu: [
      {
        title: 'Text Edit',
        key: 'text_edit',
        open: false,
      },
    ],
  },
];

// const START_MENU_ITEMS: WindowItem[] = [
//   ...baseStartMenuItems,
// ].map(startMenuItem => {
//   return WindowItem.init({
//     key: startMenuItem.key,
//     title: startMenuItem.title,
//     content: startMenuItem.content,
//     x: startMenuItem.x,
//     y: startMenuItem.y,
//     width: startMenuItem.width,
//     height: startMenuItem.height,
//   });
// });
export const START_MENU_ITEMS = [
  ...baseStartMenuItems,
]

type StartMenuProps = {
  open: boolean;
  menuItems: StartMenuItem[];
  anchorEl: HTMLElement | null;

  placement?: PopperProps['placement'];
  isRoot?: boolean;
  className?: string;

  onClick: (menuItem: WindowItem) => void;
  onClickAway: () => void;
};

export const StartMenu = React.forwardRef<HTMLDivElement, StartMenuProps>(
  function StartMenu(props: StartMenuProps, ref) {
    
    const [s, setState] = useState([]);

    const winCtx = useWinCtx();

    return (
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        style={{
          zIndex: BASE_Z_INDEX + (winCtx.getTopLayer() + 1),
        }}
        placement={props.placement}
      >
        <ClickAwayListener
          onClickAway={props.onClickAway}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <div>
          <div
            className={"start-menu window " + ((props.isRoot)
              ? 'base-menu'
              : ''
            )}
            // ref={ref}
          >
            {props.isRoot && (
              <div className="left-banner">

              </div>
            )}
            <div className="start-menu-container">
              {props.menuItems.map(startMenuItem => {
                // const menuItemRef = React.createRef<HTMLButtonElement>();
                // console.log(menuItemRef);

                const [anchorEl, setAnchorEl] = useState<HTMLDivElement>();
                const onAnchorRefChange = useCallback((el: HTMLDivElement) => {
                  setAnchorEl(el);
                }, []);
                const anchorRef = React.useRef<HTMLDivElement | null>(null);
                
                return (
                  <div
                    key={startMenuItem.key}
                    className="start-menu-item"
                  >
                    {(startMenuItem.submenu === undefined)
                      ? (
                        <EzdButton
                          className="start-menu-item-button"
                          onClick={() => {
                            handleStartMenuItemClick(startMenuItem);
                          }}
                        >
                          <div className="start-menu-item-content">
                            {startMenuItem.title}
                          </div>
                        </EzdButton>
                      )
                      : (
                        <>
                          <EzdButton
                            // ref={onAnchorRefChange}
                            className="start-menu-item-button"
                            onMouseEnter={($e) => {
                              console.log('onMouseEnter');
                              startMenuItem.open = true;
                              console.log(startMenuItem);
                              console.log(anchorEl);
                              console.log(anchorRef)
                              setState([]);
                            }}
                          >
                            <div className="start-menu-item-content">
                              <div>
                                {
                                  startMenuItem.title
                                }
                              </div>
                              <ChevronRight/>
                            </div>
                          </EzdButton>
                          <div ref={anchorRef}></div>
                          <div ref={onAnchorRefChange}></div>
                          <StartMenu
                            open={startMenuItem.open ?? false}
                            menuItems={startMenuItem.submenu}
                            // anchorEl={anchorRef?.current ?? undefined}
                            // anchorEl={anchorRef.current}
                            anchorEl={anchorEl ?? null}
                            onClickAway={() => {
                              console.log('onClickAway');
                              console.log(startMenuItem);
                              // startMenuItem.open = false;
                              // setState([]);
                            }}
                            onClick={props.onClick}
                            placement={'right'}
                          />
                        </>
                    )}
                    <div
                      className="horizontal-divider"
                    />   
                  </div>
                )
              })}
              <div className="start-menu-item">
                <Link
                  to="/"
                  className="start-menu-link"
                >
                  <div className="start-menu-item-content">
                    Home
                  </div>
                </Link>
              </div>
              <div
                className="horizontal-divider"
              />
              <div className="start-menu-item">
                <Link
                  to="/about"
                  className="start-menu-link"
                >
                  <div className="start-menu-item-content">
                    About
                  </div>
                </Link>
              </div>
              <div
                className="horizontal-divider"
              />
            </div>
          </div>
          </div>
        </ClickAwayListener>
      </Popper>
    );

    function handleStartMenuItemClick(startMenuItem: StartMenuItem) {
      let winItem: WindowItem;
      if(startMenuItem.submenu !== undefined) {
        return;
      }
      winItem = WindowItem.init({
        ...startMenuItem,
      })
      props.onClick(winItem);
    }
  }
);
