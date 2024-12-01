import { DateTime } from 'luxon';

export function enforceFriday(date: DateTime): DateTime {
  if (date.weekday !== 5) throw new Error('Not a Friday');
  return date;
}
export function enforceMonday(date: DateTime): DateTime {
  if (date.weekday !== 1) throw new Error('Not a Monday');
  return date;
}
export function enforceSunday(date: DateTime): DateTime {
  if (date.weekday !== 7) throw new Error('Not a Sunday');
  return date;
}
export function enforceThursday(date: DateTime): DateTime {
  if (date.weekday !== 4) throw new Error('Not a Thursday');
  return date;
}
export function enforceWednesday(date: DateTime): DateTime {
  if (date.weekday !== 3) throw new Error('Not a Wednesday');
  return date;
}
