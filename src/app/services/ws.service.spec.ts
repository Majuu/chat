import { TestBed } from '@angular/core/testing';

import { WsService } from './ws.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WsService', () => {
  let service: WsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
