
import React, { useEffect, useState } from 'react';
import './tray-clock.scss';
import { useWinCtx } from '../../../lib/win-context';
import { EzdClock } from '../../ezd-clock/ezd-clock';
import { getTimeString } from '../../../lib/date-time-util';

type TrayClockProps = {

};

export function TrayClock() {

  const [updateClock, setUpdateClock] = useState<boolean>(true);
  const [nowDate, setNowDate] = useState<Date>();
  // const [initTimestamp, ] = useState<number>(Date.now());
  const [initTimestamp, ] = useState<number>(1000188000000);

  const [ timeStr, setTimeStr ] = useState<string>();

  const winCtx = useWinCtx();

  useEffect(() => {
    return () => {
      setUpdateClock(false);
    }
  }, []);

  useEffect(() => {
    if(!setUpdateClock) {
      return;
    }
    const doClockUpdate = () => {
      let nextDate: Date;
      nextDate = new Date;
      setNowDate(nextDate);
      setTimeout(() => {
        if(!updateClock) {
          return;
        }
        doClockUpdate();
      }, 500);
    }
    doClockUpdate();
  }, [
    updateClock
  ]);

  useEffect(() => {
    let nextTimeStr: string;
    if(nowDate === undefined) {
      return;
    }
    nextTimeStr = getTimeString(nowDate);
    setTimeStr(nextTimeStr);
  }, [
    nowDate
  ])

  return (
    <div
      className="tray-clock"
      onClick={handleClockClick}
    >
      {timeStr}
    </div>
  );

  function handleClockClick() {
    console.log('click');
    // winCtx.launchWindow({
    //   key: 'clock',
    //   title: 'clock',
    //   content: () => {
    //     return React.createElement(EzdClock)
    //   },
    // });
    winCtx.launchClockWin({
      initTimestamp,
    });
  }

}

