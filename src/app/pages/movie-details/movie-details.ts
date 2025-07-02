import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie-service';
import { WatchlistService } from '../../services/watchlist-service';;
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,RouterModule, FontAwesomeModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss'],
})
export class MovieDetails implements OnInit {
  faStarSolid = faStarSolid;
  faStarHalfAlt = faStarHalfAlt;
  faStar = faStarRegular;
  faHeartSolid = faHeartSolid;
  faHeart = faHeartRegular;

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);

  movie = this.movieService.movie;
  recommendations = this.movieService.recommendations;
  reviews = this.movieService.reviews;

  ngOnInit() {
  this.route.params.subscribe(params => {
    const id = Number(params['id']);
    this.movieService.fetchAll(id);
  });
}


  isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movie()?.id);
  }

  toggleWatchlist(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.watchlistService.toggle(this.movie());
  }

  getMovieLink(id: number) {
    console.log('Navigating to movie:', id);
    return ['/movie-details', id];
  }

}
