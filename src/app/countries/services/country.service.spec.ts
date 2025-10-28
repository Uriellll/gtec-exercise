import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;
  const baseUrl: string = 'https://restcountries.com/v3.1/all?fields=name,flags'

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
    const dummyCountries: any[] = [
      {
        flags: {
          png: 'https://flagcdn.com/w320/lt.png',
          svg: 'https://flagcdn.com/lt.svg',
          alt: 'The flag of Lithuania is composed of three equal horizontal bands of yellow, green and red.',
        },
        name: {
          common: 'Lithuania',
          official: 'Republic of Lithuania',
          nativeName: {
            lit: {
              official: 'Lietuvos Respublikos',
              common: 'Lietuva',
            },
          },
        },
      },
      {
        flags: {
          png: 'https://flagcdn.com/w320/cl.png',
          svg: 'https://flagcdn.com/cl.svg',
          alt: 'The flag of Chile is composed of two equal horizontal bands of white and red, with a blue square of the same height as the white band superimposed in the canton. A white five-pointed star is centered in the blue square.',
        },
        name: {
          common: 'Chile',
          official: 'Republic of Chile',
          nativeName: {
            spa: {
              official: 'República de Chile',
              common: 'Chile',
            },
          },
        },
      },
      {
        flags: {
          png: 'https://flagcdn.com/w320/bj.png',
          svg: 'https://flagcdn.com/bj.svg',
          alt: 'The flag of Benin features a green vertical band on its hoist side that takes up about two-fifth the width of the field and two equal horizontal bands of yellow and red adjoining the vertical band.',
        },
        name: {
          common: 'Benin',
          official: 'Republic of Benin',
          nativeName: {
            fra: {
              official: 'République du Bénin',
              common: 'Bénin',
            },
          },
        },
      },
    ];
    service.getCountries().subscribe(data =>{
      expect(data.length).toBe(3);
      expect(data).toEqual(dummyCountries);
    })
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET')
    req.flush(dummyCountries);

  });
});
