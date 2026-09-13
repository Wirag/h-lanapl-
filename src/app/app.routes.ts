import { Routes } from '@angular/router';
import { Today } from './today/today';
import { Calendar } from './calendar/calendar';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'today' },
  { path: 'today', component: Today },
  { path: 'calendar', component: Calendar },
  { path: '**', redirectTo: 'today' },
];
