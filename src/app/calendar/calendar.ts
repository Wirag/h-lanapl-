import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EntryStorageService } from '../core/services/entry-storage.service';
import { JournalEntry, filledItemCount, moodOption } from '../core/models/journal-entry.model';
import { toIsoDate, todayIso } from '../core/util/date-utils';

interface DayCell {
  iso: string;
  dayOfMonth: number;
  inMonth: boolean;
  isFuture: boolean;
  isToday: boolean;
  entry?: JournalEntry;
}

const WEEKDAY_LABELS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

@Component({
  selector: 'app-calendar',
  imports: [DatePipe, RouterLink],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  private readonly storage = inject(EntryStorageService);

  readonly weekdayLabels = WEEKDAY_LABELS;
  readonly viewedMonth = signal(startOfMonth(new Date()));
  private readonly entriesByDate = signal(new Map<string, JournalEntry>());

  readonly monthGrid = computed<DayCell[]>(() => {
    const month = this.viewedMonth();
    const entries = this.entriesByDate();
    const today = todayIso();

    const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const leadingBlankDays = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    const cells: DayCell[] = [];
    for (let i = 0; i < leadingBlankDays; i++) {
      cells.push({ iso: '', dayOfMonth: 0, inMonth: false, isFuture: false, isToday: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const iso = toIsoDate(date);
      cells.push({
        iso,
        dayOfMonth: day,
        inMonth: true,
        isFuture: iso > today,
        isToday: iso === today,
        entry: entries.get(iso),
      });
    }
    return cells;
  });

  moodIcon(entry: JournalEntry | undefined): string | undefined {
    if (!entry || filledItemCount(entry) === 0) {
      return undefined;
    }
    return moodOption(entry.mood)?.icon;
  }

  constructor() {
    this.loadEntries();
  }

  private async loadEntries(): Promise<void> {
    const entries = await this.storage.listEntries();
    this.entriesByDate.set(new Map(entries.map((entry) => [entry.date, entry])));
  }

  previousMonth(): void {
    this.viewedMonth.update((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.viewedMonth.update((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
