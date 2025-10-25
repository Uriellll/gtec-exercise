import { inject, Injectable } from '@angular/core';
import { CountryService } from './country.service';
import { find, map, Observable } from 'rxjs';
import { CountryInterface } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryMapperService {
  countryService = inject(CountryService);

  getMappedCountries(): Observable<CountryInterface[]> {
    return this.countryService.getCountries().pipe(
      map((countries: any[]) => {
        return countries.map((country) => ({
          flag: country.flags.png,
          common: country.name.common,
          official: country.name.official,
        }));
      })
    );
  }
  getFilteredCountries(search: string): Observable<CountryInterface[]> {
    return this.getMappedCountries().pipe(
      map((countries: CountryInterface[]) => {
        return countries.filter(
          (coun: CountryInterface) =>
            coun.common.toLowerCase().includes(search.toLowerCase()) ||
            coun.official.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }
  getCountryFound(name: string): Observable<CountryInterface | undefined> {
    return this.getMappedCountries().pipe(
      map((countries: CountryInterface[]) => {
        return countries.find(
          (country: CountryInterface) =>
            country.common.toLowerCase() === name.toLowerCase()
        );
      })
    );
  }
}
