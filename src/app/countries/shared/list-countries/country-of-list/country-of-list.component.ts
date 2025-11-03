import { Component, Input } from '@angular/core';
import { CountryInterface } from '../../../interfaces/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-of-list',
  imports: [RouterLink],
  templateUrl: './country-of-list.component.html',
  styleUrl: './country-of-list.component.scss',
})
export class CountryOfListComponent {
  @Input() country!: CountryInterface;
}
