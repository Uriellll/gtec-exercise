import { Component, inject, Inject, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { CountryInterface } from '../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, RouterLink],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export default class CountriesComponent implements OnInit {
  countryService = inject(CountryService);
  listCountries: any[]  = [];
  listCountriesMap : CountryInterface[] = [];
  listCountriesFound: CountryInterface[] = [];
  ngOnInit(): void {
    this.countryService.getCountries().subscribe(res =>{
      this.listCountries = res;
      this.listCountriesMap = this.listCountries.map((country:any)=>({
        flag: country.flags.png,
        common: country.name.common,
        official: country.name.official
      }))
    })
  }

  searchCountry(country: string){
    this.listCountriesFound = this.listCountriesMap.filter((coun:CountryInterface) => coun.common.toLowerCase().includes(country.toLowerCase())  || coun.official.toLowerCase().includes(country.toLowerCase()))
  }
}
