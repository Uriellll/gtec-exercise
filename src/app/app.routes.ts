import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: ()=> import('./countries/countries/countries.component')},
    {path: 'country/:name', loadComponent: ()=> import('./countries/country/country.component')},
    {path: '**', redirectTo:''}
];
