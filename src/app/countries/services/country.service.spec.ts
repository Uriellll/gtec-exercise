import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RawCountry } from '../interfaces/country.interface';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all products', () => {
    const dummyCountries: RawCountry[] = [
      {
        flags: {
          png: 'https://flagcdn.com/w320/lt.png',
        },
        name: {
          common: 'Lithuania',
          official: 'Republic of Lithuania',
        },
      },
      {
        flags: {
          png: 'https://flagcdn.com/w320/cl.png',
        },
        name: {
          common: 'Chile',
          official: 'Republic of Chile',
        },
      },
      {
        flags: {
          png: 'https://flagcdn.com/w320/bj.png',
        },
        name: {
          common: 'Benin',
          official: 'Republic of Benin',
        },
      },
    ];
    service.getCountries().subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(dummyCountries);
    });
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });
});
