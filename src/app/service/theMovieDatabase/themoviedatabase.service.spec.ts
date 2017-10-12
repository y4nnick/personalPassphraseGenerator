import { TestBed, inject } from '@angular/core/testing';

import { ThemoviedatabaseService } from './themoviedatabase.service.ts';

describe('ThemoviedatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemoviedatabaseService]
    });
  });

  it('should be created', inject([ThemoviedatabaseService], (service: ThemoviedatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
