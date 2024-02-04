
import { AppBar, Button } from '@material-ui/core';
import './top-nav.scss';
import React from 'react';
import { Link } from '@tanstack/react-router';

type TopNavProps = {

};

export function TopNav(props: TopNavProps) {
  return (
    <div>
      <Link to="/">
        <Button>
          Home 
        </Button>
      </Link>
      <Link to="/about">
        <Button>
            About
        </Button>
      </Link>
    </div>
  );
}
