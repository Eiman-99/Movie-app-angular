import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watchlist-service';
import { Movie } from '../../components/movie/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, Movie],
  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.scss']
})
export class Watchlist{
  watchlistService = inject(WatchlistService);
  watchlist = this.watchlistService.watchlist;
  private router = inject(Router);

  goBackHome() {
    this.router.navigate(['/']);
  }
}
