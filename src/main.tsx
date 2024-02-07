
import './main.scss';
import React from 'react';
import { Root, createRoot } from 'react-dom/client';

import { EzdWeb } from './ezd-web/ezd-web';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

const ezdTheme = createTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    // mode: 'dark',
    
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: 0,
          color: 'initial',
          backgroundColor: 'initial',
        }
      }
    },
  },
  spacing: 0
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
