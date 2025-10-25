import { Component, Input } from '@angular/core';
import { CountryInterface } from '../../interfaces/country.interface';
import { CountryOfListComponent } from './country-of-list/country-of-list.component';

@Component({
  selector: 'app-list-countries',
  imports: [CountryOfListComponent],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {
  @Input() countries: CountryInterface[] = [];

}
