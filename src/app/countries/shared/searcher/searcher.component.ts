import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  @Output() searcherOut = new EventEmitter<string>();
  searchCountry(country: string) {
    this.searcherOut.emit(country);
  }
}
