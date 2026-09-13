import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  createEmptyEntry,
  JournalEntry,
  Mood,
  MOOD_OPTIONS,
} from '../../core/models/journal-entry.model';
import { EntryStorageService } from '../../core/services/entry-storage.service';

@Component({
  selector: 'app-entry-form',
  imports: [FormsModule],
  templateUrl: './entry-form.html',
  styleUrl: './entry-form.scss',
})
export class EntryForm {
  private readonly storage = inject(EntryStorageService);

  readonly date = input.required<string>();
  readonly saved = output<JournalEntry>();

  readonly moodOptions = MOOD_OPTIONS;

  readonly items = signal<[string, string, string]>(['', '', '']);
  readonly mood = signal<Mood | null>(null);
  readonly loaded = signal(false);
  readonly saving = signal(false);
  readonly showSavedToast = signal(false);

  private savedSnapshot = signal<JournalEntry | null>(null);
  private toastTimeout?: ReturnType<typeof setTimeout>;

  readonly filledCount = computed(() => this.items().filter((item) => item.trim().length > 0).length);

  readonly isDirty = computed(() => {
    const snapshot = this.savedSnapshot();
    if (!snapshot) {
      return false;
    }
    const items = this.items();
    return snapshot.mood !== this.mood() || snapshot.items.some((value, i) => value !== items[i]);
  });

  constructor() {
    effect(() => {
      const date = this.date();
      this.loadEntry(date);
    });
  }

  private async loadEntry(date: string): Promise<void> {
    this.loaded.set(false);
    const existing = await this.storage.getEntry(date);
    const entry = existing ?? createEmptyEntry(date);
    this.items.set([...entry.items]);
    this.mood.set(entry.mood);
    this.savedSnapshot.set(entry);
    this.loaded.set(true);
  }

  setItem(index: number, value: string): void {
    this.items.update((items) => {
      const next = [...items] as [string, string, string];
      next[index] = value;
      return next;
    });
  }

  selectMood(mood: Mood): void {
    this.mood.set(mood);
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty();
  }

  async save(): Promise<void> {
    this.saving.set(true);
    const entry: JournalEntry = {
      date: this.date(),
      items: [...this.items()] as [string, string, string],
      mood: this.mood(),
    };
    try {
      await this.storage.saveEntry(entry);
      this.savedSnapshot.set(entry);
      this.saved.emit(entry);
      this.showSavedToast.set(true);
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => this.showSavedToast.set(false), 2500);
    } finally {
      this.saving.set(false);
    }
  }
}
