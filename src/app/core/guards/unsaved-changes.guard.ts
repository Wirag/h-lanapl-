import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithUnsavedChanges> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }
  return confirm('El nem mentett változtatásaid vannak. Elhagyod mentés nélkül?');
};
