import { ComponentFixture, TestBed } from '@angular/core/testing';
import CountryComponent from './country.component';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { CountryMapperService } from '../services/country-mapper.service';
import { CountryInterface } from '../interfaces/country.interface';
import { By } from '@angular/platform-browser';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let countryMapperServiceSpy: jasmine.SpyObj<CountryMapperService>;
  const fakeCountry: CountryInterface = {
    common: 'Mexico',
    official: 'Estados Unidos Mexicanos',
    flag: 'mexico-flag.png',
  };

  beforeEach(async () => {
    countryMapperServiceSpy = jasmine.createSpyObj('CountryMapperService', [
      'getCountryFound',
    ]);
    countryMapperServiceSpy.getCountryFound.and.returnValue(of(fakeCountry));
    mockActivatedRoute = {
      paramMap: of<ParamMap>(convertToParamMap({ name: 'Mexico' })),
    };
    await TestBed.configureTestingModule({
      imports: [CountryComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: CountryMapperService,
          useValue: countryMapperServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getCountryFound with the param of the route', () => {
    component.ngOnInit();
    expect(countryMapperServiceSpy.getCountryFound).toHaveBeenCalledWith(
      'Mexico'
    );
    // Como es un observable síncrono con of(), country ya debería estar definido
    expect(component.country).toEqual(fakeCountry);
  });
  it('shoukd  render country in template', () => {
    component.country = fakeCountry;
    fixture.detectChanges();

    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(h1.textContent).toContain(fakeCountry.official);
    expect(p.textContent).toContain(fakeCountry.common);
    expect(img.src).toContain(fakeCountry.flag);
  });
});
