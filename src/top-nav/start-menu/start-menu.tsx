import React, { useEffect } from 'react';
import './start-menu.scss';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';
import { EzdWeb } from '../../ezd-web/ezd-web';
import { WindowItem } from '../../models/window-item';
import { EzdAbout } from '../../ezd-web/ezd-about/ezd-about';


export type StartMenuItem = {
  title: string;
  key: string;
  content?: React.FC;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

const baseStartMenuItems: StartMenuItem[] = [
  {
    title: 'Home',
    key: 'home',
    content: () => {
      return (
        <EzdWeb/>
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
  },
];

export const START_MENU_ITEMS: WindowItem[] = [
  ...baseStartMenuItems,
].map(startMenuItem => {
  return WindowItem.init({
    key: startMenuItem.key,
    title: startMenuItem.title,
    content: startMenuItem.content,
    x: startMenuItem.x,
    y: startMenuItem.y,
    width: startMenuItem.width,
    height: startMenuItem.height,
  });
});

type StartMenuProps = {
  onClick: (menuItem: StartMenuItem) => void;
};

export const StartMenu = React.forwardRef<HTMLDivElement, StartMenuProps>(
  function StartMenu(props: StartMenuProps, ref) {
    
    // useEffect(() => {
    //   props.onClick(START_MENU_ITEMS[0]);
    //   // props.onClick(START_MENU_ITEMS[1]);
    // }, []);

    return (
      <div className="start-menu window" ref={ref}>
        <div className="left-banner">

        </div>
        <div className="start-menu-container">
          {START_MENU_ITEMS.map(startMenuItem => {
            return (
              <div
                key={startMenuItem.key}
                className="start-menu-item"
              >
                <EzdButton
                  className="start-menu-item-button"
                  onClick={() => {
                    props.onClick(startMenuItem);
                  }}
                >
                  <div className="start-menu-item-content">
                    {startMenuItem.title}
                  </div>
                </EzdButton>
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
    );
  }
);
