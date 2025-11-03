import { ComponentFixture, TestBed } from '@angular/core/testing';
import CountriesComponent from './countries.component';
import { CountryMapperService } from '../services/country-mapper.service';
import { CountryInterface } from '../interfaces/country.interface';
import { of } from 'rxjs';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let countryMapperServiceSpy: jasmine.SpyObj<CountryMapperService>;

  beforeEach(async () => {
    countryMapperServiceSpy = jasmine.createSpyObj('CountryMapperService', [
      'getFilteredCountries',
    ]);
    await TestBed.configureTestingModule({
      imports: [CountriesComponent],
      providers: [
        {
          provide: CountryMapperService,
          useValue: countryMapperServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update listCountriesFound when searchCountry is called', () => {
    const mockCountries: CountryInterface[] = [
      {
        flag: 'https://flagcdn.com/w320/cl.png',
        common: 'Chile',
        official: 'Republic of Chile',
      },
    ];
    countryMapperServiceSpy.getFilteredCountries.and.returnValue(
      of(mockCountries)
    );
    component.searchCountry('Chile');
    expect(component.listCountriesFound).toEqual(mockCountries);
    expect(countryMapperServiceSpy.getFilteredCountries).toHaveBeenCalledWith(
      'Chile'
    );
  });
});
