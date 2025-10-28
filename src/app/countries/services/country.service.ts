import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpClient = inject(HttpClient);
  url: string = 'https://restcountries.com/v3.1/all?fields=name,flags';

  constructor() { }

  getCountries():Observable<any[]>{
    return this.httpClient.get<any[]>(this.url)
  }
}
