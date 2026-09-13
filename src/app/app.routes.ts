import { Routes } from '@angular/router';
import { Today } from './today/today';
import { Calendar } from './calendar/calendar';
import { DayDetail } from './calendar/day-detail/day-detail';
import { Settings } from './settings/settings';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { validDateGuard } from './core/guards/valid-date.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'today' },
  { path: 'today', component: Today, canDeactivate: [unsavedChangesGuard] },
  { path: 'calendar', component: Calendar },
  {
    path: 'calendar/:date',
    component: DayDetail,
    canActivate: [validDateGuard],
    canDeactivate: [unsavedChangesGuard],
  },
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: 'today' },
];
