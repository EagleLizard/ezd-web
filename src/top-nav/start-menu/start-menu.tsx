import React from 'react';
import './start-menu.scss';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';
import { EzdWeb } from '../../ezd-web/ezd-web';


export type StartMenuItem = {
  label: string;
  key: string;
  content?: React.FC;
};

const START_MENU_ITEMS: StartMenuItem[] = [
  {
    label: 'Home',
    key: 'home',
    content: () => {
      return (
        <div>
          <EzdWeb/>
        </div>
      )
    }
  },
  {
    label: 'About',
    key: 'about',
  },
  {
    label: 'Test Win',
    key: 'test_win',
  },
];

type StartMenuProps = {
  onClick: (menuItem: StartMenuItem) => void;
};

export const StartMenu = React.forwardRef<HTMLDivElement, StartMenuProps>(
  function StartMenu(props: StartMenuProps, ref) {
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
                    {startMenuItem.label}
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
