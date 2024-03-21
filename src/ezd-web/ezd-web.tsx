
import './ezd-web.scss';

import { WinContextProvider, useWinCtx } from '../lib/win-context';
import { EzdDesktop } from './ezd-desktop/ezd-desktop';


type EzdWebProps = {

};

export function EzdWeb(props: EzdWebProps) {
  return (
    <WinContextProvider>
      <EzdDesktop/>
    </WinContextProvider>
  );
}