import { TestBed } from '@angular/core/testing';

import { PasswordUtilsService } from './password-utils.service';

describe('PasswordUtilsService', () => {
  let service: PasswordUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
