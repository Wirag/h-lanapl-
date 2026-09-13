import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExportImportService } from '../core/services/export-import.service';

@Component({
  selector: 'app-settings',
  imports: [RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private readonly exportImport = inject(ExportImportService);

  readonly exporting = signal(false);
  readonly importing = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly statusIsError = signal(false);

  async export(): Promise<void> {
    this.exporting.set(true);
    this.statusMessage.set(null);
    try {
      await this.exportImport.exportToFile();
      this.setStatus('A mentés elkészült és letöltődött.', false);
    } catch {
      this.setStatus('A mentés nem sikerült.', true);
    } finally {
      this.exporting.set(false);
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.importing.set(true);
    this.statusMessage.set(null);
    try {
      const count = await this.exportImport.importFromFile(file);
      this.setStatus(`${count} nap sikeresen visszaállítva.`, false);
    } catch {
      this.setStatus('A fájl nem érvényes mentés.', true);
    } finally {
      this.importing.set(false);
      input.value = '';
    }
  }

  private setStatus(message: string, isError: boolean): void {
    this.statusMessage.set(message);
    this.statusIsError.set(isError);
  }
}
