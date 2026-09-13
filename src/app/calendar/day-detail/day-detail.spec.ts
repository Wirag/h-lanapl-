import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DayDetail } from './day-detail';

describe('DayDetail', () => {
  let component: DayDetail;
  let fixture: ComponentFixture<DayDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DayDetail);
    fixture.componentRef.setInput('date', '2026-01-01');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
