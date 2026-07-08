import { TestBed } from '@angular/core/testing';
import { WsService } from './ws.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('WsService', () => {
  let service: WsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(WsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete items', () => {

    service.deleteItems('test').subscribe(res => {
      expect(res).toBe(null)
    });
  });
});
