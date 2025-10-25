import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOfListComponent } from './country-of-list.component';

describe('CountryOfListComponent', () => {
  let component: CountryOfListComponent;
  let fixture: ComponentFixture<CountryOfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryOfListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryOfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
