import { DateTime } from 'luxon';
import {
  enforceFriday,
  enforceMonday,
  enforceSunday,
  enforceThursday,
  enforceWednesday,
} from './enforceWeekday';

function calculateEaster(year: number): DateTime {
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
  const easterSunday = DateTime.fromObject({ year, month: month, day });
  return enforceSunday(easterSunday);
}

function calculateFirstOrdinaryTime(year: number): DateTime {
  const epiphanyDate = DateTime.fromObject({ year, month: 1, day: 6 });
  const dayOfWeek = epiphanyDate.weekday;
  const daysToNextSunday = (7 - dayOfWeek) % 7;
  const firstSundayAfterEpiphany = epiphanyDate.plus({
    days: daysToNextSunday,
  });
  const firstOrdinaryTimeDate = firstSundayAfterEpiphany.plus({ days: 1 });
  return enforceMonday(firstOrdinaryTimeDate);
}

function calculateFirstAdvent(year: number): DateTime {
  const stAndrewDate = DateTime.fromObject({ year, month: 11, day: 30 });
  const dayOfWeek = stAndrewDate.weekday;
  const daysToNextSunday = (7 - dayOfWeek) % 7;
  const firstAdventDate = stAndrewDate.plus({ days: daysToNextSunday });
  return enforceSunday(firstAdventDate);
}

export enum Colour {
  Green = 'green',
  Rose = 'rose',
  Purple = 'purple',
  Red = 'red',
  White = 'white',
}

export type LiturgicalDay = {
  colour: Colour;
  name: string;
  value: DateTime;
};

export type LiturgicalYear = {
  [key: string]: LiturgicalDay;
};

export const getLiturgicalYear = (year: number): LiturgicalYear => {
  const easterSunday = calculateEaster(year);
  const firstAdvent = calculateFirstAdvent(year);

  return {
    firstMondayOfOrdinaryTime: {
      colour: Colour.Green,
      name: 'First Monday of Ordinary Time',
      value: calculateFirstOrdinaryTime(year),
    },
    ashWednesday: {
      colour: Colour.Purple,
      name: 'Ash Wednesday',
      value: enforceWednesday(easterSunday.minus({ days: 46 })),
    },
    fourthSundayOfLent: {
      colour: Colour.Rose,
      name: 'Fourth Sunday of Lent',
      value: enforceSunday(easterSunday.minus({ days: 21 })),
    },
    palmSunday: {
      colour: Colour.Red,
      name: 'Palm Sunday',
      value: enforceSunday(easterSunday.minus({ days: 7 })),
    },
    maundyThursday: {
      colour: Colour.Red,
      name: 'Maundy Thursday',
      value: enforceThursday(easterSunday.minus({ days: 3 })),
    },
    goodFriday: {
      colour: Colour.Red,
      name: 'Good Friday',
      value: enforceFriday(easterSunday.minus({ days: 2 })),
    },
    easterSunday: {
      colour: Colour.White,
      name: 'Easter Sunday',
      value: easterSunday,
    },
    pentecost: {
      colour: Colour.Red,
      name: 'Pentecost',
      value: enforceSunday(easterSunday.plus({ days: 49 })),
    },
    firstAdvent: {
      name: 'First Advent',
      colour: Colour.Purple,
      value: firstAdvent,
    },
    thirdAdvent: {
      name: 'Third Advent',
      colour: Colour.Rose,
      value: enforceSunday(firstAdvent.plus({ days: 14 })),
    },
    stAndrew: {
      name: 'St Andrew',
      colour: Colour.Red,
      value: DateTime.fromObject({
        year: year,
        month: 11,
        day: 30,
      }),
    },
    stIgnatiusOfAntioch: {
      colour: Colour.Red,
      name: 'St Ignatius of Antioch',
      value: DateTime.fromObject({
        year: year,
        month: 10,
        day: 17,
      }),
    },
    stLuke: {
      colour: Colour.Red,
      name: 'St Luke',
      value: DateTime.fromObject({
        year: year,
        month: 10,
        day: 18,
      }),
    },
    stsSimonAndJude: {
      colour: Colour.Red,
      name: 'Saints Simon and Jude',
      value: DateTime.fromObject({
        year: year,
        month: 10,
        day: 28,
      }),
    },
    assumptionOfMary: {
      colour: Colour.White,
      name: 'Assumption of Mary',
      value: DateTime.fromObject({
        year: year,
        month: 8,
        day: 15,
      }),
    },
    allSaints: {
      colour: Colour.White,
      name: 'All Saints',
      value: DateTime.fromObject({
        year: year,
        month: 11,
        day: 1,
      }),
    },
    allSouls: {
      colour: Colour.White, // This should be black.
      name: 'All Souls',
      value: DateTime.fromObject({
        year: year,
        month: 11,
        day: 2,
      }),
    },
  };
};
