import { Component, input, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentWithUnsavedChanges } from '../../core/guards/unsaved-changes.guard';
import { EntryForm } from '../../shared/entry-form/entry-form';

@Component({
  selector: 'app-day-detail',
  imports: [EntryForm, DatePipe, RouterLink],
  templateUrl: './day-detail.html',
  styleUrl: './day-detail.scss',
})
export class DayDetail implements ComponentWithUnsavedChanges {
  readonly date = input.required<string>();
  private readonly entryForm = viewChild.required(EntryForm);

  hasUnsavedChanges(): boolean {
    return this.entryForm().hasUnsavedChanges();
  }
}
