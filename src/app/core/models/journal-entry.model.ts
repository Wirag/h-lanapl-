export type Mood = 'kimerult' | 'borus' | 'bekes' | 'vidam' | 'halas';

export interface MoodOption {
  value: Mood;
  label: string;
  icon: string;
}

export const MOOD_OPTIONS: readonly MoodOption[] = [
  { value: 'kimerult', label: 'Kimerült', icon: 'bedtime' },
  { value: 'borus', label: 'Borús', icon: 'rainy' },
  { value: 'bekes', label: 'Békés', icon: 'spa' },
  { value: 'vidam', label: 'Vidám', icon: 'mood' },
  { value: 'halas', label: 'Hálás', icon: 'favorite' },
];

export function moodOption(mood: Mood | null): MoodOption | undefined {
  return MOOD_OPTIONS.find((option) => option.value === mood);
}

export interface JournalEntry {
  /** ISO date, yyyy-MM-dd. One entry per calendar day. */
  date: string;
  items: [string, string, string];
  mood: Mood | null;
}

export function createEmptyEntry(date: string): JournalEntry {
  return { date, items: ['', '', ''], mood: null };
}

export function filledItemCount(entry: Pick<JournalEntry, 'items'>): number {
  return entry.items.filter((item) => item.trim().length > 0).length;
}
