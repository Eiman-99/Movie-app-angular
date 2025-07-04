import { Component, input, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { WatchlistService } from '../../services/watchlist-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DatePipe, DecimalPipe, RouterModule], 
  templateUrl: './movie.html',
  styleUrls: ['./movie.scss'], 
})
export class Movie {
  readonly movie = input<any>();
  watchlistService = inject(WatchlistService);

  faHeart = faHeartRegular;
  faHeartSolid = faHeartSolid;

  private router = inject(Router);

  goToDetails() {
    const m = this.movie();
    if (m.media_type === 'tv') {
      this.router.navigate(['/tv', m.id]);
    } else {
      this.router.navigate(['/movie', m.id]);
    }
  }

  toggleWatchlist() {
    this.watchlistService.toggle(this.movie());
  }

  isFav(): boolean {
    return this.watchlistService.isInWatchlist(this.movie().id);
  }
}
