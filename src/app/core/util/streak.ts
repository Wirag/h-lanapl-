import { filledItemCount, JournalEntry } from '../models/journal-entry.model';
import { toIsoDate, todayIso } from './date-utils';

/**
 * Consecutive days (ending today, or yesterday if today has no entry yet)
 * with at least one filled gratitude item.
 */
export function computeStreak(entries: readonly JournalEntry[]): number {
  const loggedDates = new Set(
    entries.filter((entry) => filledItemCount(entry) > 0).map((entry) => entry.date),
  );

  const cursor = new Date(`${todayIso()}T00:00:00`);
  if (!loggedDates.has(toIsoDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (loggedDates.has(toIsoDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
