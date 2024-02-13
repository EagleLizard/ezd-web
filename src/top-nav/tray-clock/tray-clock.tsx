
import React, { useEffect, useState } from 'react';
import './tray-clock.scss';
import { useWinCtx } from '../../lib/win-context';
import { EzdClock } from '../../ezd-web/ezd-clock/ezd-clock';

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
    winCtx.launchWindow({
      key: 'clock',
      title: 'clock',
      content: () => {
        return React.createElement(EzdClock)
      },
    })
  }

}

function getTimeString(date: Date): string {
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

    year = date.getFullYear();
    yearStr = `${year}`;
    month = date.getMonth();
    monthStr = monthNames[month];
    day = date.getDate();
    dayStr = `${day + 1}`;

    hours = date.getHours();
    hoursStr = `${hours}`;
    mins = date.getMinutes();
    minsStr = `${(mins < 10) ? '0' : ''}${mins}`;
    secs = date.getSeconds();
    secsStr = `${(secs < 10) ? '0' : ''}${secs}`;

    ampm = hours < 12
      ? 'AM'
      : 'PM'
    dateStr = `${monthStr} ${dayStr}, ${yearStr}`
    nextTimeStr = [
      // dateStr,
      `${hoursStr}:${minsStr}:${secsStr} ${ampm}`,
    ].join(' - ');
    return nextTimeStr;
}
