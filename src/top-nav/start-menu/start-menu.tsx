import React from 'react';
import './start-menu.scss';
import { Link } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';

type StartMenuProps = {

};

export const StartMenu = React.forwardRef<HTMLDivElement, StartMenuProps>(
  function StartMenu(props: StartMenuProps, ref) {
    return (
      <div className="start-menu window" ref={ref}>
        <div className="start-menu-container">
          Start Menu
        </div>
        <div
          className="horizontal-divider"
        />
        <div className="top-nav-btn">
          <Link to="/">
            <EzdButton>
              Home 
            </EzdButton>
          </Link>
        </div>
        <div
          className="horizontal-divider"
        />
        <div className="top-nav-btn">
          <Link to="/about">
            <EzdButton>
                About
            </EzdButton>
          </Link>
        </div>
      </div>
    );
  }
);
