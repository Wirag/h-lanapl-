import { computeStreak } from './streak';
import { createEmptyEntry, JournalEntry } from '../models/journal-entry.model';
import { toIsoDate, todayIso } from './date-utils';

function daysAgoIso(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return toIsoDate(date);
}

function withItem(date: string): JournalEntry {
  const entry = createEmptyEntry(date);
  entry.items[0] = 'valami';
  return entry;
}

describe('computeStreak', () => {
  it('is 0 with no entries', () => {
    expect(computeStreak([])).toBe(0);
  });

  it('counts consecutive days ending today', () => {
    const entries = [withItem(todayIso()), withItem(daysAgoIso(1)), withItem(daysAgoIso(2))];
    expect(computeStreak(entries)).toBe(3);
  });

  it('counts consecutive days ending yesterday when today has no entry yet', () => {
    const entries = [withItem(daysAgoIso(1)), withItem(daysAgoIso(2))];
    expect(computeStreak(entries)).toBe(2);
  });

  it('stops at a gap', () => {
    const entries = [withItem(todayIso()), withItem(daysAgoIso(1)), withItem(daysAgoIso(3))];
    expect(computeStreak(entries)).toBe(2);
  });

  it('ignores entries with no filled items', () => {
    const entries = [createEmptyEntry(todayIso())];
    expect(computeStreak(entries)).toBe(0);
  });
});
