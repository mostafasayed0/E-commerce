import { CanDeactivateFn } from '@angular/router';

export const confiremGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  return component.confirm();
};
