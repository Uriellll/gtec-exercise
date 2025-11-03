import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryInterface } from '../interfaces/country.interface';
import { CountryMapperService } from '../services/country-mapper.service';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export default class CountryComponent implements OnInit {
  nombrePais!: string;
  country!: CountryInterface | undefined;
  activatedRoute = inject(ActivatedRoute);
  countryServiceMapper = inject(CountryMapperService);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.findCountry(params.get('name') || '');
    });
  }
  findCountry(name: string) {
    this.countryServiceMapper.getCountryFound(name).subscribe(res => {
      this.country = res;
    });
  }
}
