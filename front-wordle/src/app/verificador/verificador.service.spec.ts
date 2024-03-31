import { TestBed } from '@angular/core/testing';

import { VerificadorService } from './verificador.service';

describe('VerificadorService', () => {
  let service: VerificadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
