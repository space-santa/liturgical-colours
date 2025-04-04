import express, { Request, Response } from 'express';
import { DateTime } from 'luxon';
import ColourFactory from './ColourFactory';

const app = express();

app.get('/api/colour-of-the-day', (req, res) => {
  const dateStr = req.query.date as string | undefined;
  let dateObj = DateTime.local();
  if (dateStr) {
    const parsedDate = DateTime.fromISO(dateStr);
    if (!parsedDate.isValid) {
      res.status(400).json({ error: 'Invalid date format' });
      return;
    }
    dateObj = parsedDate;
  }
  const ly = new ColourFactory(dateObj);
  res.json({ colour: ly.getTodaysColour() });
});

export default app;
