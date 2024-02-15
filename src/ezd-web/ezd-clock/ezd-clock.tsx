
import './ezd-clock.scss';
import { useEffect, useRef, useState } from 'react';

import { ClockWidget } from './clock-widget/clock-widget';
import { getDateString, getTimeString } from '../../lib/date-time-util';

type EzdClockProps = {

};

export function EzdClock(props: EzdClockProps) {
  const [ nowDate, setNowDate ] = useState<Date>(new Date);
  const [initTimestamp, ] = useState<number>(Date.now())

  const doUpdate = useRef<boolean>();
  
  const elapsedMs = nowDate.valueOf() - initTimestamp;
  const timeStr = getTimeString(nowDate);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    doUpdate.current = true;
    const updateClock = () => {
      let nextNowDate = new Date;
      setNowDate(() => nextNowDate);
      timer = setTimeout(() => {
        if(!doUpdate.current) {
          return;
        }
        updateClock();
      }, 100);
    }
    updateClock();
    return () => {
      clearTimeout(timer);
      doUpdate.current = false;
    };
  }, []);

  return (
    <div className="ezd-clock">
      <div className="clock-details">
        {/* <div>
          {elapsedMs}
        </div> */}
        <div className="month">
          {
            getDateString(nowDate)
          }
        </div>
      </div>
      <div className="time-section">
        <div>
          {timeStr}
        </div>
        <div className="clock-container">
          <ClockWidget
            date={nowDate}
          />
        </div>
      </div>
    </div>
  );
}
