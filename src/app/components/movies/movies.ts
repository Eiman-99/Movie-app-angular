import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movies-service';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, Movie],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  private movieService = inject(MovieService);

  movies = this.movieService.nowPlaying;
  page = this.movieService.currentPage;
  totalPages = this.movieService.totalPages;

  goToPage(page: number) {
    this.movieService.goToPage(page);
  }
}
