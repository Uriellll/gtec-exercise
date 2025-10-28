import { TestBed } from '@angular/core/testing';

import { CountryMapperService } from './country-mapper.service';
import { CountryService } from './country.service';
import { CountryInterface } from '../interfaces/country.interface';
import { of } from 'rxjs';

describe('CountryMapperService', () => {
  let service: CountryMapperService;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;

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
      let search = 'chi';

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
      let search = 'fgfgv';

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
      let name = 'chile';
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
      let name = 'mexico';
      service
        .getCountryFound(name)
        .subscribe((res: CountryInterface | undefined) => {
          expect(res).toBeUndefined();
        });
      expect(service.getMappedCountries).toHaveBeenCalledTimes(1);
    });
  });
});
