import { Component, OnInit } from '@angular/core';
import { movieOptions } from './app.constants';
import { Option } from './components/autocomplete/autocomplete.component';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'dummyApp';
  searchText = '';
  debounceTimeThreshold = 400;
  allMovieOptions = [];
  selectedMovies = [];
  filteredMovieOptions = [];

  constructor(public movieService: MovieService) {
    this.allMovieOptions = movieOptions.map(m => ({ label: m.name, selected: false }));
    this.filteredMovieOptions = [...this.allMovieOptions];
  }

  handleOptionSelection(options: Option[]) {
    this.selectedMovies = options;
  }

  handleSearchTextChange(searchText: string) {
    console.log('FETCH MOVIES FOR ... : ', searchText);
    this.filteredMovieOptions = this.allMovieOptions.filter(n => n.label.includes(searchText));
  }
}