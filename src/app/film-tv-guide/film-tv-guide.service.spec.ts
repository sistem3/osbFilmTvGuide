import { TestBed, inject } from '@angular/core/testing';

import { FilmTvGuideService } from './film-tv-guide.service';

describe('FilmTvGuideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmTvGuideService]
    });
  });

  it('should be created', inject([FilmTvGuideService], (service: FilmTvGuideService) => {
    expect(service).toBeTruthy();
  }));
});
