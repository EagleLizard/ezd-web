
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

export function getTimeString(date: Date): string {
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

