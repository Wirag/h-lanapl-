import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';

// jsdom doesn't implement the Blob URL APIs used by file export/import.
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:mock';
}
if (typeof URL.revokeObjectURL !== 'function') {
  URL.revokeObjectURL = () => {};
}

// Give every test a fresh, empty IndexedDB so entries from one test/spec
// file never leak into another (EntryStorageService always opens the same
// database name).
beforeEach(() => {
  globalThis.indexedDB = new IDBFactory();
});
