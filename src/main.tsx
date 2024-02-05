
import './main.scss';
import React from 'react';
import { Root, createRoot } from 'react-dom/client';

import { EzdWeb } from './ezd-web/ezd-web';
import { CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';

import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import './external/98.css';

const ezdTheme = createTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    type: 'dark',
    
  },
  // typography: {
  //   fontFamily: [
  //     'Pixelated MS Sans Serif'
  //   ].join(','),
  // },
  overrides: {
    MuiPaper: {
      
    }
  },
  // shadows: {
    
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiPaper: {
      
    }
  },
});

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


(async () => {
  try {
    await init();
  } catch(e) {
    console.error(e);
    throw e;
  }
})();

async function init() {
  let root: Root | undefined;
  const container = document.getElementById('app-root');
  const Index = () => {
    return (
      <React.StrictMode>
        <ThemeProvider theme={ezdTheme}>
          <CssBaseline/>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </React.StrictMode>
    );
  };
  if(container !== null) {
    root = createRoot(container);
  } else {
    throw new Error('Could not find root element');
  }
  root.render(<Index/>);
}
