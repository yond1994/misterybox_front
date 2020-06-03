import { TestBed } from '@angular/core/testing';

import { AuthmbService } from './authmb.service';

describe('AuthmbService', () => {
  let service: AuthmbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthmbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
