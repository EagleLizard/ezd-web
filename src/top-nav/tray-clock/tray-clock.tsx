
import { useEffect, useState } from 'react';
import './tray-clock.scss';
import { useWinCtx } from '../../lib/win-context';

const monthNames = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.'
];

type TrayClockProps = {

};

export function TrayClock() {

  const [updateClock, setUpdateClock] = useState<boolean>(true);
  const [nowDate, setNowDate] = useState<Date>();

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
    setUpdateClock
  ]);

  useEffect(() => {
    let nextTimeStr: string;
    let dateStr: string;

    let month: number;
    let monthStr: string;
    let day: number;
    let dayStr: string;
    let year: number;
    let yearStr: string;

    let hours: number;
    let hoursStr: string;
    let mins: number;
    let minsStr: string;
    let secs: number;
    let secsStr: string;

    let ampm: string;
    if(!nowDate) {
      return;
    }

    year = nowDate.getFullYear();
    yearStr = `${year}`;
    month = nowDate.getMonth();
    monthStr = monthNames[month];
    day = nowDate.getDate();
    dayStr = `${day + 1}`;

    hours = nowDate.getHours();
    hoursStr = `${hours}`;
    mins = nowDate.getMinutes();
    minsStr = `${(mins < 10) ? '0' : ''}${mins}`;
    secs = nowDate.getSeconds();
    secsStr = `${(secs < 10) ? '0' : ''}${secs}`;

    ampm = hours < 12
      ? 'AM'
      : 'PM'
    dateStr = `${monthStr} ${dayStr}, ${yearStr}`
    nextTimeStr = [
      // dateStr,
      `${hoursStr}:${minsStr}:${secsStr} ${ampm}`,
    ].join(' - ');
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
    winCtx.launchWindow({
      key: 'clock',
      title: 'clock',
      content: () => {
        return (
          <div>
            <TrayClock/>
          </div>
        )
      },
    })
  }
}
