
import { format } from 'date-fns';

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

export function getDateString(date: Date): string {
  let nextDateStr: string;
  nextDateStr = format(date, 'ccc. MMM. do, y')
  return nextDateStr;
}

export function getTimeString(date: Date): string {
  
  let nextTimeStr: string;

  nextTimeStr = format(date, 'pp')
  return nextTimeStr;
}

