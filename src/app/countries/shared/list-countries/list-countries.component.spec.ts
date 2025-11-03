import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCountriesComponent } from './list-countries.component';
import { CountryInterface } from '../../interfaces/country.interface';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListCountriesComponent', () => {
  let component: ListCountriesComponent;
  let fixture: ComponentFixture<ListCountriesComponent>;

  const mockCountries: CountryInterface[] = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCountriesComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render child component for each country', () => {
    component.countries = mockCountries;
    fixture.detectChanges();
    const children = fixture.debugElement.queryAll(
      By.css('app-country-of-list')
    );
    expect(children.length).toBe(3);
    expect(component.countries.length).toBe(3);
  });
});
