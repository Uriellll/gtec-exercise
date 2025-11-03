import { Component, inject } from '@angular/core';
import { CountryInterface } from '../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from '../shared/searcher/searcher.component';
import { ListCountriesComponent } from '../shared/list-countries/list-countries.component';
import { CountryMapperService } from '../services/country-mapper.service';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, SearcherComponent, ListCountriesComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export default class CountriesComponent {
  countryMappedService = inject(CountryMapperService);
  listCountriesFound: CountryInterface[] = [];

  searchCountry(country: string) {
    this.countryMappedService.getFilteredCountries(country).subscribe(res => {
      this.listCountriesFound = res;
    });
  }
}
