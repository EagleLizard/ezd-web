
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { TopNav } from '../ezd-web/top-nav/top-nav'

import { WinContextProvider } from '../lib/win-context';
import { WindowManager } from '../lib/window-manager';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div> */}
      {/* <hr /> */}
      <Outlet />
      {/* <WinContextProvider>
        <div
          className="ezd-web-root"
          id="ezd-web-root"
        >
          <div className="ezd-web-page">
            <Outlet />
          </div>
          <WindowManager/>
          <TopNav/>
        </div>
      </WinContextProvider> */}
      {/* </div> */}
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})