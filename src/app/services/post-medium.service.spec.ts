import { TestBed } from '@angular/core/testing';

import { PostMediumService } from './post-medium.service';

describe('PostMediumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostMediumService = TestBed.get(PostMediumService);
    expect(service).toBeTruthy();
  });
});
