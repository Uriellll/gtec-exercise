import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOfListComponent } from './country-of-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryInterface } from '../../../interfaces/country.interface';
import { By } from '@angular/platform-browser';

describe('CountryOfListComponent', () => {
  let component: CountryOfListComponent;
  let fixture: ComponentFixture<CountryOfListComponent>;
  const mockCountry: CountryInterface = {
    common: 'Mexico',
    official: 'United Mexican States',
    flag: 'https://flagcdn.com/mx.svg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryOfListComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryOfListComponent);
    component = fixture.componentInstance;
    component.country = mockCountry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the country official name', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe('United Mexican States');
  });
  it('should render the country flag', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain('https://flagcdn.com/mx.svg');
  });
  it('should have correct routerLink', () => {
    const a = fixture.debugElement.query(By.css('a')).attributes[
      'ng-reflect-router-link'
    ];
    expect(a).toBe('/country,Mexico'); // Angular convierte el array a string separado por coma
  });
});
