import React from 'react';
import './start-menu.scss';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';


type StartMenuItem = {

};

type StartMenuProps = {

};

export const StartMenu = React.forwardRef<HTMLDivElement, StartMenuProps>(
  function StartMenu(props: StartMenuProps, ref) {
    return (
      <div className="start-menu window" ref={ref}>
        <div className="left-banner">
          
        </div>
        <div className="start-menu-container">
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
