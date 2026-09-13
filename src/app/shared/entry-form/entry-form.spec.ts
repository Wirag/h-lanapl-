import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryForm } from './entry-form';

describe('EntryForm', () => {
  let component: EntryForm;
  let fixture: ComponentFixture<EntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryForm);
    fixture.componentRef.setInput('date', '2026-01-01');
    component = fixture.componentInstance;
    await fixture.whenStable();
    while (!component.loaded()) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads an empty entry with all 3 items blank', () => {
    expect(component.items()).toEqual(['', '', '']);
    expect(component.filledCount()).toBe(0);
  });

  it('saves the mood and items via the storage service', async () => {
    component.selectMood('halas');
    component.setItem(0, 'Napsütés');
    await component.save();

    expect(component.hasUnsavedChanges()).toBe(false);
  });
});
