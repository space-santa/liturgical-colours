import {
  calculateEaster,
  calculateFirstAdvent,
  calculateFirstOrdinaryTime,
} from './LiturgicalYear';
import { DateTime } from 'luxon';

test('calculateFirstOrdinaryTime returns the correct date for the first ordinary time in 2023', () => {
  const year = 2023;
  const expectedDate = DateTime.fromObject({ year: year, month: 1, day: 9 }); // 9th Jan 2023 is the first Monday after Epiphany
  const result = calculateFirstOrdinaryTime(year);
  expect(result.toString()).toBe(expectedDate.toString());
});

test('calculateFirstOrdinaryTime handles different years', () => {
  const year = 2024;
  const expectedDate = DateTime.fromObject({ year: year, month: 1, day: 8 }); // 8th Jan 2024 is the first Monday after Epiphany
  const result = calculateFirstOrdinaryTime(year);
  expect(result.toString()).toBe(expectedDate.toString());
});

test('calculateFirstAdvent returns the correct date for the first Advent in 2023', () => {
  const year = 2023;
  const expectedDate = DateTime.fromObject({ year: year, month: 12, day: 3 }); // 3rd Dec 2023 is the first Sunday after St. Andrew's Day
  const result = calculateFirstAdvent(year);
  expect(result.toString()).toBe(expectedDate.toString());
});

test('calculateFirstAdvent handles different years', () => {
  const year = 2024;
  const expectedDate = DateTime.fromObject({ year: year, month: 12, day: 1 }); // 1st Dec 2024 is the first Sunday after St. Andrew's Day
  const result = calculateFirstAdvent(year);
  expect(result.toString()).toBe(expectedDate.toString());
});

test('calculateEaster returns the correct date for Easter in 2023', () => {
  const year = 2023;
  const expectedDate = DateTime.fromObject({ year: year, month: 4, day: 9 }); // 9th Apr 2023 is Easter Sunday
  const result = calculateEaster(year);
  expect(result.toString()).toBe(expectedDate.toString());
});

test('calculateEaster handles different years', () => {
  const year = 2024;
  const expectedDate = DateTime.fromObject({ year: year, month: 3, day: 31 }); // 31st Mar 2024 is Easter Sunday
  const result = calculateEaster(year);
  expect(result.toString()).toBe(expectedDate.toString());
});
