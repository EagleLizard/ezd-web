
import './ezd-desktop.scss';
import { useEffect, useRef, useState } from 'react';
import { useWinCtx } from '../../lib/win-context';
import { WindowManager } from '../../lib/window-manager';
import { UserService } from '../../services/user-service';
import { TopNav } from '../top-nav/top-nav';
import { Link, useNavigate } from '@tanstack/react-router';
import { UserDto } from '../../models/user-dto';
import { sleep } from '../../lib/sleep';

type EzdDesktopProps = {

};

export function EzdDesktop(props: EzdDesktopProps) {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const doPoll = useRef<boolean>(false);
  const [ loggedIn, setLoggedIn ] = useState<boolean | undefined>(undefined);
  const [ lastPollMs, setLastPollMs ] = useState<number>();

  const winCtx = useWinCtx();
  const navigate = useNavigate();

  useEffect(() => {
    if(!doPoll.current) {
      doPoll.current = true;
      sleep(1e3).then(pollSession);
    }
    // setTimeout(() => {
    //   doPoll.current = false;
    // }, 5e3);
    return () => {
      doPoll.current = false;
    };
  }, []);

  useEffect(() => {
    if(loggedIn === false) {
      winCtx.launchAlertWin({
        title: 'Logged Out',
        key: 'logged_out_alert',
        ezdAlertProps: {
          alertMessage: (
            <div>
              <h3>
                Logged out.
              </h3>
              <br/>
              <div>
                <span>
                  Please log back in
                </span>
                &nbsp;
                <span>
                  <Link to="/login">
                    here
                  </Link>
                </span>
                .
              </div>
            </div>
          ),
        },
      });
    }
  }, [
    loggedIn,
    lastPollMs,
  ]);

  return (
    <div className="ezd-desktop">
      <div className="ezd-web-page"/>
      <WindowManager/>
      <TopNav/>
    </div>
  );

  async function pollSession() {
    let verifyRes: UserDto | undefined;
    verifyRes = await UserService.verifyUser();
    setLastPollMs(Date.now());
    if(verifyRes === undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
    console.log(`doPoll.current: ${doPoll.current}`);

    if(doPoll.current === false) {
      return;
    }

    setTimeout(() => {
      pollSession();
    }, 5e3);
  }
}
