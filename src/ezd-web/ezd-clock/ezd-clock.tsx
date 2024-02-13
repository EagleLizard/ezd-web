
import { useEffect, useRef, useState } from 'react';
import './ezd-clock.scss';

type EzdClockProps = {

};

export function EzdClock(props: EzdClockProps) {
  const [ nowDate, setNowDate ] = useState<Date>(new Date);

  const [initTimestamp, ] = useState<number>(Date.now())
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const doUpdate = useRef<boolean>();

  const secsMod = nowDate.getSeconds() / 60;

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
      }, 500);
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
      <div>
        {nowDate.valueOf()}
      </div>
      <div>
        {elapsedMs}
      </div>
      <div className="clock-parts-container">
        <div
          className="seconds-hand"
          style={{
            // width: 50,
            // height: 50,
            backgroundColor: 'pink',
            transform: 'rotate(' + secsMod * 360 + 'deg)'
        }}/>
      </div>
    </div>
  );
}
