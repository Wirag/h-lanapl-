import { TestBed } from '@angular/core/testing';
import { ExportImportService } from './export-import.service';
import { EntryStorageService } from './entry-storage.service';
import { createEmptyEntry } from '../models/journal-entry.model';

describe('ExportImportService', () => {
  let service: ExportImportService;
  let storage: EntryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportImportService);
    storage = TestBed.inject(EntryStorageService);
  });

  it('exports without throwing', async () => {
    await storage.saveEntry(createEmptyEntry('2020-01-01'));
    await expect(service.exportToFile()).resolves.toBeUndefined();
  });

  it('imports entries from a valid export file', async () => {
    const entry = createEmptyEntry('2020-01-01');
    entry.items[0] = 'Kávé';
    const file = new File(
      [JSON.stringify({ exportedAt: '2020-01-01T00:00:00.000Z', entries: [entry] })],
      'export.json',
      { type: 'application/json' },
    );

    const count = await service.importFromFile(file);

    expect(count).toBe(1);
    expect(await storage.getEntry('2020-01-01')).toEqual(entry);
  });

  it('imports a bare array of entries too', async () => {
    const entry = createEmptyEntry('2020-02-02');
    const file = new File([JSON.stringify([entry])], 'export.json', {
      type: 'application/json',
    });

    expect(await service.importFromFile(file)).toBe(1);
  });

  it('rejects a file that is not a valid export', async () => {
    const file = new File([JSON.stringify({ foo: 'bar' })], 'bad.json', {
      type: 'application/json',
    });

    await expect(service.importFromFile(file)).rejects.toThrow();
  });
});
