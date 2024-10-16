import { DateTime } from 'luxon';

function enforceFriday(date: DateTime): void {
  if (date.weekday !== 5) throw new Error('Not a Friday');
}

function enforceMonday(date: DateTime): void {
  if (date.weekday !== 1) throw new Error('Not a Monday');
}

function enforceSunday(date: DateTime): void {
  if (date.weekday !== 7) throw new Error('Not a Sunday');
}

function enforceThursday(date: DateTime): void {
  if (date.weekday !== 4) throw new Error('Not a Thursday');
}

function enforceWednesday(date: DateTime): void {
  if (date.weekday !== 3) throw new Error('Not a Wednesday');
}

export function calculateEaster(year: number): DateTime {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return DateTime.fromObject({ year, month: month, day });
}

export function calculateFirstOrdinaryTime(year: number): DateTime {
  const epiphanyDate = DateTime.fromObject({ year, month: 1, day: 6 });
  const dayOfWeek = epiphanyDate.weekday;
  const daysToNextSunday = (7 - dayOfWeek) % 7;
  const firstSundayAfterEpiphany = epiphanyDate.plus({
    days: daysToNextSunday,
  });
  const firstOrdinaryTimeDate = firstSundayAfterEpiphany.plus({ days: 1 });
  enforceMonday(firstOrdinaryTimeDate);
  return firstOrdinaryTimeDate;
}

export function calculateFirstAdvent(year: number): DateTime {
  const stAndrewDate = DateTime.fromObject({ year, month: 11, day: 30 });
  const dayOfWeek = stAndrewDate.weekday;
  const daysToNextSunday = (7 - dayOfWeek) % 7;
  const firstAdventDate = stAndrewDate.plus({ days: daysToNextSunday });
  enforceSunday(firstAdventDate);
  return firstAdventDate;
}

export default class LiturgicalYear {
  today: DateTime;
  year: number;
  firstAdvent: DateTime;
  firstOrdinaryTimeStart: DateTime;
  easterSunday: DateTime;
  assumptionOfMary: DateTime;
  allSaints: DateTime;
  stAndrew: DateTime;
  stIgnatiusOfAntioch: DateTime;
  thirdAdvent: DateTime;

  constructor(today: DateTime) {
    this.today = today;
    this.year = this.today.year;
    this.firstAdvent = calculateFirstAdvent(this.year);
    enforceSunday(this.firstAdvent);
    this.firstOrdinaryTimeStart = calculateFirstOrdinaryTime(this.year);
    enforceMonday(this.firstOrdinaryTimeStart);
    this.easterSunday = calculateEaster(this.year);
    enforceSunday(this.easterSunday);
    this.assumptionOfMary = DateTime.fromObject({
      year: this.year,
      month: 8,
      day: 15,
    });
    this.allSaints = DateTime.fromObject({
      year: this.year,
      month: 11,
      day: 1,
    });
    this.stAndrew = DateTime.fromObject({
      year: this.year,
      month: 11,
      day: 30,
    });
    this.stIgnatiusOfAntioch = DateTime.fromObject({
      year: this.year,
      month: 10,
      day: 17,
    });
    this.thirdAdvent = this.firstAdvent.plus({ days: 14 });
    enforceSunday(this.thirdAdvent);
  }

  get ashWednesday() {
    const ashWednesday = this.easterSunday.minus({ days: 46 });
    enforceWednesday(ashWednesday);
    return ashWednesday;
  }

  get fourthSundayOfLent() {
    const fourthSundayOfLent = this.easterSunday.minus({ days: 21 });
    enforceSunday(fourthSundayOfLent);
    return fourthSundayOfLent;
  }

  get palmSunday() {
    const palmSunday = this.easterSunday.minus({ days: 7 });
    enforceSunday(palmSunday);
    return palmSunday;
  }

  get maundyThursday() {
    const maundyThursday = this.easterSunday.minus({ days: 3 });
    enforceThursday(maundyThursday);
    return maundyThursday;
  }

  get goodFriday() {
    const goodFriday = this.easterSunday.minus({ days: 2 });
    enforceFriday(goodFriday);
    return goodFriday;
  }

  get pentecost() {
    const pentecost = this.easterSunday.plus({ days: 49 });
    enforceSunday(pentecost);
    return pentecost;
  }

  get roseDays() {
    return [this.thirdAdvent, this.fourthSundayOfLent];
  }

  get redDays() {
    return [
      this.palmSunday,
      this.goodFriday,
      this.pentecost,
      this.stAndrew,
      this.stIgnatiusOfAntioch,
    ];
  }

  get whiteDays() {
    return [this.assumptionOfMary, this.allSaints];
  }

  dateIsInAdvent(value: DateTime): boolean {
    const christmas = DateTime.fromObject({
      year: value.year,
      month: 12,
      day: 25,
    });
    return this.firstAdvent <= value && value < christmas;
  }

  static dateIsInChristmasTime(value: DateTime): boolean {
    const christmas = DateTime.fromObject({
      year: value.year,
      month: 12,
      day: 25,
    });

    const epiphany = DateTime.fromObject({
      year: value.year + (value.month === 1 && value.day > 6 ? 0 : 1),
      month: 1,
      day: 6,
    });

    const baptismOfTheLord = epiphany.plus({ days: 7 - epiphany.weekday });

    return christmas <= value && value <= baptismOfTheLord;
  }

  dateIsInOrdinaryTime(value: DateTime): boolean {
    return (
      (this.firstOrdinaryTimeStart <= value && value < this.ashWednesday) ||
      (this.pentecost < value && value < this.firstAdvent)
    );
  }

  dateIsInLent(value: DateTime): boolean {
    return this.ashWednesday <= value && value < this.maundyThursday;
  }

  dateIsInEasterTime(value: DateTime): boolean {
    return this.maundyThursday <= value && value < this.pentecost;
  }

  getTodaysColour(): string {
    if (this.roseDays.some((day) => day.hasSame(this.today, 'day')))
      return 'rose';

    if (this.redDays.some((day) => day.hasSame(this.today, 'day')))
      return 'red';

    if (
      this.whiteDays.some((day) => day.hasSame(this.today, 'day')) ||
      LiturgicalYear.dateIsInChristmasTime(this.today) ||
      this.dateIsInEasterTime(this.today)
    ) {
      return 'white';
    }
    if (this.dateIsInLent(this.today) || this.dateIsInAdvent(this.today))
      return 'purple';

    if (this.dateIsInOrdinaryTime(this.today)) return 'green';

    return 'white';
  }
}
