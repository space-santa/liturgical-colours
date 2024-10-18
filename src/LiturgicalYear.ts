import { DateTime } from 'luxon';
import { Colour, getLiturgicalYear, LiturgicalYear } from './fixedDays';
import { enforceThursday } from './enforceWeekday';

function dateIsInChristmasTime(value: DateTime): boolean {
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

export default class ColourFactory {
  today: DateTime;
  year: number;
  days: LiturgicalYear;

  constructor(today: DateTime) {
    this.today = today;
    this.year = this.today.year;
    this.days = getLiturgicalYear(this.year);
  }

  get thirdAdvent() {
    return this.days.thirdAdvent;
  }

  get ashWednesday() {
    return this.days.ashWednesday;
  }

  get fourthSundayOfLent() {
    return this.days.fourthSundayOfLent;
  }

  get palmSunday() {
    return this.days.palmSunday;
  }

  get maundyThursday() {
    return this.days.maundyThursday.value;
  }

  get goodFriday() {
    return this.days.goodFriday;
  }

  get pentecost() {
    return this.days.pentecost;
  }

  get roseDays() {
    return [this.thirdAdvent.value, this.fourthSundayOfLent.value];
  }

  get redDays() {
    return Object.values(this.days)
      .filter((item) => item.colour === Colour.Red)
      .map((item) => item.value);
  }

  get whiteDays() {
    return Object.values(this.days)
      .filter((item) => item.colour === Colour.White)
      .map((item) => item.value);
  }

  dateIsInAdvent(value: DateTime): boolean {
    const christmas = DateTime.fromObject({
      year: value.year,
      month: 12,
      day: 25,
    });
    return this.days.firstAdvent.value <= value && value < christmas;
  }

  dateIsInOrdinaryTime(value: DateTime): boolean {
    return (
      (this.days.firstMondayOfOrdinaryTime.value <= value &&
        value < this.ashWednesday.value) ||
      (this.pentecost.value < value && value < this.days.firstAdvent.value)
    );
  }

  dateIsInLent(value: DateTime): boolean {
    return this.ashWednesday.value <= value && value < this.maundyThursday;
  }

  dateIsInEasterTime(value: DateTime): boolean {
    return this.maundyThursday <= value && value < this.pentecost.value;
  }

  isRoseDay() {
    return this.roseDays.some((day) => day.hasSame(this.today, 'day'));
  }

  isRedDay() {
    return this.redDays.some((day) => day.hasSame(this.today, 'day'));
  }

  isWhiteDay() {
    return (
      this.whiteDays.some((day: DateTime) => day.hasSame(this.today, 'day')) ||
      dateIsInChristmasTime(this.today) ||
      this.dateIsInEasterTime(this.today)
    );
  }

  isPurpleDay() {
    return this.dateIsInLent(this.today) || this.dateIsInAdvent(this.today);
  }

  getTodaysColour(): string {
    if (this.isRoseDay()) return Colour.Rose;

    if (this.isRedDay()) return Colour.Red;

    if (this.isWhiteDay()) return Colour.White;

    if (this.isPurpleDay()) return Colour.Purple;

    if (this.dateIsInOrdinaryTime(this.today)) return Colour.Green;

    return Colour.White;
  }
}
