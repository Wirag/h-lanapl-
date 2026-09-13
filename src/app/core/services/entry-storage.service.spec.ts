import { TestBed } from '@angular/core/testing';
import { EntryStorageService } from './entry-storage.service';
import { createEmptyEntry } from '../models/journal-entry.model';

describe('EntryStorageService', () => {
  let service: EntryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryStorageService);
  });

  it('returns undefined for a date with no entry', async () => {
    expect(await service.getEntry('2020-01-01')).toBeUndefined();
  });

  it('saves and retrieves an entry by date', async () => {
    const entry = { ...createEmptyEntry('2020-01-01'), mood: 'halas' as const };
    entry.items[0] = 'Napsütés';
    await service.saveEntry(entry);

    const loaded = await service.getEntry('2020-01-01');
    expect(loaded).toEqual(entry);
  });

  it('lists all saved entries', async () => {
    await service.saveEntry(createEmptyEntry('2020-01-01'));
    await service.saveEntry(createEmptyEntry('2020-01-02'));

    const all = await service.listEntries();
    expect(all.map((e) => e.date).sort()).toEqual(['2020-01-01', '2020-01-02']);
  });

  it('rejects saving an entry for a future date', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const isoFuture = futureDate.toISOString().slice(0, 10);

    await expect(service.saveEntry(createEmptyEntry(isoFuture))).rejects.toThrow();
  });

  it('deletes an entry', async () => {
    await service.saveEntry(createEmptyEntry('2020-01-01'));
    await service.deleteEntry('2020-01-01');
    expect(await service.getEntry('2020-01-01')).toBeUndefined();
  });
});
