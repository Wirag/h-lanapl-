import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isFutureIsoDate, isValidIsoDate } from '../util/date-utils';

export const validDateGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const date = route.paramMap.get('date') ?? '';
  if (!isValidIsoDate(date) || isFutureIsoDate(date)) {
    return router.parseUrl('/calendar');
  }
  return true;
};
