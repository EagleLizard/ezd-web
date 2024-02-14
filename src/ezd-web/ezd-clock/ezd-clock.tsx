
import { useEffect, useRef, useState } from 'react';
import './ezd-clock.scss';
import { getTimeString } from '../../lib/date-time-util';

type EzdClockProps = {

};

export function EzdClock(props: EzdClockProps) {
  const [ nowDate, setNowDate ] = useState<Date>(new Date);

  const [initTimestamp, ] = useState<number>(Date.now())
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const doUpdate = useRef<boolean>();

  // const secsMod = (nowDate.getSeconds() + (nowDate.getMilliseconds() / 1000)) / 60;
  const secsMod = (nowDate.getSeconds()) / 60;
  // const minsMod = (nowDate.getMinutes() + (secsMod )) / 60;
  const minsMod = (nowDate.getMinutes()) / 60;
  const hours = nowDate.getHours();
  const twelveHours = (hours > 12)
    ? hours - 12
    : hours
  ;
  const hoursMod = (twelveHours) / 12;

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
      }, 50);
    }
    updateClock();
    return () => {
      clearTimeout(timer);
      doUpdate.current = false;
    };
  }, []);
  useEffect(() => {
    let nextElapsed: number;
    nextElapsed = nowDate.valueOf() - initTimestamp;
    setElapsedMs(nextElapsed);
  }, [ nowDate ])

  return (
    <div className="ezd-clock">
      <div className="clock-details">
        <div>
          {nowDate.valueOf()}
        </div>
        <div>
          {elapsedMs}
        </div>
      </div>
      <div className="time-section">
        <div>
          {timeStr}
        </div>
        <div className="clock-container">
          <div className="clock-parts-container">
            <div className="clock-part">
              <div className="clock-face"/>
            </div>
            <div className="clock-part">
              <div
                className="minutes-hand"
                style={{
                  transform: 'rotate(' + minsMod * 360 + 'deg)',
                }}
              >
                <div className="clock-hand-inner"/>
              </div>
              <div
                className="hours-hand"
                style={{
                  transform: 'rotate(' + hoursMod * 360 + 'deg)',
                }}
              >
                <div className="clock-hand-inner"/>
              </div>
              <div
                className="seconds-hand"
                style={{
                  transform: 'rotate(' + secsMod * 360 + 'deg)',
                }}
              >
                <div className="clock-hand-inner"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
