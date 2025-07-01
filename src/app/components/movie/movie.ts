import { Component, input, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { WatchlistService } from '../../services/watchlist-service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DatePipe, DecimalPipe], 
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
})
export class Movie {
  readonly movie = input<any>();
  watchlistService = inject(WatchlistService);

  faHeart = faHeartRegular;
  faHeartSolid = faHeartSolid;

  toggleWishlist() {
    this.watchlistService.toggle(this.movie());
  }

  isFav(): boolean {
    return this.watchlistService.isInWatchlist(this.movie().id);
  }
}
