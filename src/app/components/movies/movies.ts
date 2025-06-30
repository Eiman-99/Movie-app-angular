import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movies-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
private movieService = inject(MovieService);
  movies = this.movieService.nowPlaying;
}
