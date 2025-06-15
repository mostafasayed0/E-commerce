import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { confiremGuard } from './confirem.guard';

describe('confiremGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confiremGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
