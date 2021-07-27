import { Component } from '@angular/core';
import { movieOptions } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dummyApp';
  searchText = '';
  debounceTimeThreshold = 400;
  movieNames = movieOptions.map(m => m.name);
  

  handleOptionAction() {

  }

  handleOptionSelection() {

  }

  handleSearchTextChange(searchText: string) {
    this.movieNames = movieOptions.map(m => m.name).filter(n => n.includes(searchText));
  }
}