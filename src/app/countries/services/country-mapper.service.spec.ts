import { TestBed } from '@angular/core/testing';

import { CountryMapperService } from './country-mapper.service';
import { CountryService } from './country.service';
import { CountryInterface, RawCountry } from '../interfaces/country.interface';
import { of } from 'rxjs';

describe('CountryMapperService', () => {
  let service: CountryMapperService;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;

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
  const expectedMappedData: CountryInterface[] = [
    {
      flag: 'https://flagcdn.com/w320/lt.png',
      common: 'Lithuania',
      official: 'Republic of Lithuania',
    },
    {
      flag: 'https://flagcdn.com/w320/cl.png',
      common: 'Chile',
      official: 'Republic of Chile',
    },
    {
      flag: 'https://flagcdn.com/w320/bj.png',
      common: 'Benin',
      official: 'Republic of Benin',
    },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CountryService', ['getCountries']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CountryService,
          useValue: spy,
        },
      ],
    });
    service = TestBed.inject(CountryMapperService);
    countryServiceSpy = TestBed.inject(
      CountryService
    ) as jasmine.SpyObj<CountryService>;
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getMappedCountries', () => {
    it('should map the data correctly', () => {
      countryServiceSpy.getCountries.and.returnValue(of(dummyCountries));
      service.getMappedCountries().subscribe((result: CountryInterface[]) => {
        expect(result).toEqual(expectedMappedData);
        expect(countryServiceSpy.getCountries).toHaveBeenCalled();
      });
    });
  });
  describe('getFilteredCountries', () => {
    it('should filter data including the text given', () => {
      spyOn(service, 'getMappedCountries').and.returnValue(
        of(expectedMappedData)
      );
      const search = 'chi';

      service
        .getFilteredCountries(search)
        .subscribe((res: CountryInterface[]) => {
          expect(res).toEqual([expectedMappedData[1]]);
        });
    });
    it('should return empty array when the text doesn´t match with an country', () => {
      spyOn(service, 'getMappedCountries').and.returnValue(
        of(expectedMappedData)
      );
      const search = 'fgfgv';

      service
        .getFilteredCountries(search)
        .subscribe((res: CountryInterface[]) => {
          expect(res).toEqual([]);
        });
    });
  });
  describe('getCountryFound', () => {
    it('should return country found', () => {
      spyOn(service, 'getMappedCountries').and.returnValue(
        of(expectedMappedData)
      );
      const name = 'chile';
      service
        .getCountryFound(name)
        .subscribe((res: CountryInterface | undefined) => {
          expect(res).toEqual(expectedMappedData[1]);
        });
      expect(service.getMappedCountries).toHaveBeenCalledTimes(1);
    });
    it('should return undefined if country is not found', () => {
      spyOn(service, 'getMappedCountries').and.returnValue(
        of(expectedMappedData)
      );
      const name = 'mexico';
      service
        .getCountryFound(name)
        .subscribe((res: CountryInterface | undefined) => {
          expect(res).toBeUndefined();
        });
      expect(service.getMappedCountries).toHaveBeenCalledTimes(1);
    });
  });
});
