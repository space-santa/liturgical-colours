import request from 'supertest';
import app from './app'; // Ensure this points to your Express app module

const testCases = [
  { date: '2024-03-24', expectedColour: 'red' }, // Palm Sunday
  { date: '2024-03-29', expectedColour: 'red' }, // Good Friday
  { date: '2024-05-19', expectedColour: 'red' }, // Pentecost
  { date: '2024-11-30', expectedColour: 'red' }, // St. Andrew's Day
  { date: '2024-12-15', expectedColour: 'rose' }, // Third Advent Sunday
  { date: '2024-03-10', expectedColour: 'rose' }, // Fourth Sunday of Lent
  { date: '2024-08-15', expectedColour: 'white' }, // Assumption of Mary
  { date: '2024-11-01', expectedColour: 'white' }, // All Saints' Day
  { date: '2024-03-06', expectedColour: 'purple' }, // A day in Lent
  { date: '2024-12-03', expectedColour: 'purple' }, // A day in Advent
  { date: '2024-12-25', expectedColour: 'white' }, // A day in Christmas time
  { date: '2024-01-07', expectedColour: 'white' }, // Another day in Christmas time
  { date: '2024-02-04', expectedColour: 'green' }, // A day in 1st ordinary time
  { date: '2024-05-22', expectedColour: 'green' }, // A day in 2nd ordinary time
];

describe('GET /api/colour-of-the-day', () => {
  testCases.forEach(({ date, expectedColour }) => {
    test(`should return ${expectedColour} for date ${date}`, async () => {
      const response = await request(app).get(
        `/api/colour-of-the-day?date=${date}`,
      );
      expect(response.status).toBe(200);
      expect(response.body.colour).toBe(expectedColour);
    });
  });

  test('should return the colour of the day for today when no date is provided', async () => {
    const response = await request(app).get('/api/colour-of-the-day');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('colour');
  });

  test('should return 400 error for invalid date format', async () => {
    const invalidDateStr = 'invalid-date';
    const response = await request(app).get(
      `/api/colour-of-the-day?date=${invalidDateStr}`,
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid date format');
  });
});
