import { TestBed, inject } from '@angular/core/testing';

import { PassphraseManagerService } from './passphrase-manager.service';

describe('PassphraseManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassphraseManagerService]
    });
  });

  it('should be created', inject([PassphraseManagerService], (service: PassphraseManagerService) => {
    expect(service).toBeTruthy();
  }));
});
