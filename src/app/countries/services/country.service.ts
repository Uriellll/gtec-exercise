import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  httpClient = inject(HttpClient);
  url = 'https://restcountries.com/v3.1/all?fields=name,flags';

  getCountries(): Observable<RawCountry[]> {
    return this.httpClient.get<RawCountry[]>(this.url);
  }
}
