import { Component, inject, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ComponentWithUnsavedChanges } from '../core/guards/unsaved-changes.guard';
import { EntryForm } from '../shared/entry-form/entry-form';
import { EntryStorageService } from '../core/services/entry-storage.service';
import { computeStreak } from '../core/util/streak';
import { todayIso } from '../core/util/date-utils';
import { greeting } from '../core/util/greeting';

@Component({
  selector: 'app-today',
  imports: [EntryForm, DatePipe],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class Today implements ComponentWithUnsavedChanges {
  private readonly storage = inject(EntryStorageService);
  private readonly entryForm = viewChild.required(EntryForm);

  readonly date = todayIso();
  readonly today = new Date();
  readonly greeting = greeting(this.today);
  readonly streak = signal(0);

  constructor() {
    this.refreshStreak();
  }

  hasUnsavedChanges(): boolean {
    return this.entryForm().hasUnsavedChanges();
  }

  onEntrySaved(): void {
    this.refreshStreak();
  }

  private async refreshStreak(): Promise<void> {
    const entries = await this.storage.listEntries();
    this.streak.set(computeStreak(entries));
  }
}
