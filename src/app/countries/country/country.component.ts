import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CountryInterface } from '../interfaces/country.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export default class CountryComponent implements OnInit {
  nombrePais!: string;
  country!: CountryInterface;
  activatedRoute = inject(ActivatedRoute)
  countryService = inject(CountryService);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.nombrePais = params.get('name') || '' ;
      this.countryService.getCountriesMap(this.nombrePais).subscribe(res =>{
        this.country = res;;
      })
    });
  }
}
