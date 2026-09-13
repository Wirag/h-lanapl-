import { Injectable } from '@angular/core';
import { JournalEntry } from '../models/journal-entry.model';
import { isFutureIsoDate } from '../util/date-utils';

const DB_NAME = 'halanaplo';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

@Injectable({ providedIn: 'root' })
export class EntryStorageService {
  private dbPromise: Promise<IDBDatabase> = this.openDb();

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) {
          request.result.createObjectStore(STORE_NAME, { keyPath: 'date' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getEntry(date: string): Promise<JournalEntry | undefined> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(date);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async listEntries(): Promise<JournalEntry[]> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveEntry(entry: JournalEntry): Promise<void> {
    if (isFutureIsoDate(entry.date)) {
      throw new Error(`Cannot save an entry for a future date: ${entry.date}`);
    }
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(entry);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveEntries(entries: JournalEntry[]): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      for (const entry of entries) {
        if (!isFutureIsoDate(entry.date)) {
          store.put(entry);
        }
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async deleteEntry(date: string): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(date);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}
