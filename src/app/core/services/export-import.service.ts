import { Injectable, inject } from '@angular/core';
import { JournalEntry } from '../models/journal-entry.model';
import { EntryStorageService } from './entry-storage.service';
import { todayIso } from '../util/date-utils';

interface ExportPayload {
  exportedAt: string;
  entries: JournalEntry[];
}

@Injectable({ providedIn: 'root' })
export class ExportImportService {
  private readonly storage = inject(EntryStorageService);

  async exportToFile(): Promise<void> {
    const entries = await this.storage.listEntries();
    const payload: ExportPayload = { exportedAt: new Date().toISOString(), entries };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `halanaplo-mentes-${todayIso()}.json`;
      link.click();
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async importFromFile(file: File): Promise<number> {
    const text = await file.text();
    const parsed: unknown = JSON.parse(text);
    const entries = Array.isArray(parsed)
      ? parsed
      : ((parsed as Partial<ExportPayload>)?.entries ?? null);

    if (!Array.isArray(entries)) {
      throw new Error('Érvénytelen fájlformátum.');
    }

    const validEntries = entries.filter(isJournalEntry);
    await this.storage.saveEntries(validEntries);
    return validEntries.length;
  }
}

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<JournalEntry>;
  return (
    typeof candidate.date === 'string' &&
    Array.isArray(candidate.items) &&
    candidate.items.length === 3
  );
}
