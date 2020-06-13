import { TestBed } from '@angular/core/testing';

import { ServNodeService } from './serv-node.service';

describe('ServNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServNodeService = TestBed.get(ServNodeService);
    expect(service).toBeTruthy();
  });
});
