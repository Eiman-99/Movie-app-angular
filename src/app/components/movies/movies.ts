import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movies-service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgbPaginationModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  private movieService = inject(MovieService);

  movies = this.movieService.nowPlaying;
  page = this.movieService.currentPage;
  totalPages = this.movieService.totalPages;

  faFavorites = faHeartRegular;

  goToPage(page: number) {
    this.movieService.goToPage(page);
  }
}
