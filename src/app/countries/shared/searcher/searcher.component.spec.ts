import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { By } from '@angular/platform-browser';
import { finalize } from 'rxjs';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the input on screen', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).not.toBeNull();
  });
  it('should call searchCountry with event keyup', () => {
    const spySearch = spyOn(component, 'searchCountry');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Mexico';
    input.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();
    expect(spySearch).toHaveBeenCalledOnceWith('Mexico');
  });
  it('should emit the value with event keyup', () => {
    const spyEvent = spyOn(component.searcherOut, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Chile';
    input.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();
    expect(spyEvent).toHaveBeenCalledWith('Chile');
    expect(spyEvent).toHaveBeenCalledTimes(1);
  });
});
