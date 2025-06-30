import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Movies } from '../../components/movies/movies';
@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, Movies],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  faStar = faStar;
  faPlay = faPlay;
  faPlus = faPlus;
}
