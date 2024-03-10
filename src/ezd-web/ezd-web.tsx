
import './ezd-web.scss';
// import ezdWebMarkdown from './ezd-web.md';
import { useEffect, useState } from 'react';

import Markdown from 'react-markdown';
import { EzdCard } from '../components/ezd-card/ezd-card';
import { WinContextProvider, useWinCtx } from '../lib/win-context';
import { WindowManager } from '../lib/window-manager';
import { TopNav } from '../top-nav/top-nav';


type EzdWebProps = {

};

export function EzdWeb(props: EzdWebProps) {

  return (
    // <div
    //   className="ezd-web-root"
    //   id="ezd-web-root"
    // >
    //     <div className="ezd-web-page">
    //       <Outlet />
    //     </div>
    //     <WindowManager/>
    //   <TopNav/>
    // </div>
    // </WinContextProvider>
    <WinContextProvider>
      <div className="ezd-web">
        <div className="ezd-web-page"/>
        <WindowManager/>
        <TopNav/>
      </div>
    </WinContextProvider>
    // <div
    //   className="ezd-web"
    // >
    //   <WinContextProvider>
    //     <div
    //       className="ezd-web-root"
    //       id="ezd-web-root"
    //     >
    //       <div
    //         className="ezd-web-page"
    //       >
    //         {/* <Outlet /> */}
    //       </div>
    //       <WindowManager/>
    //       <TopNav/>
    //     </div>
    //   </WinContextProvider>
    // </div>
  );
}