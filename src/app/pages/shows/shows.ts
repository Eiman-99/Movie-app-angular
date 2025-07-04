import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows-service';
import { RouterModule } from '@angular/router';
import { WatchlistService } from '../../services/watchlist-service';
import { CommonModule } from '@angular/common';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [RouterModule , CommonModule, FontAwesomeModule, NgbPaginationModule],
  templateUrl: './shows.html',
  styleUrl: './shows.scss'
})
export class Shows {
  private showsService = inject(ShowsService);
  readonly tvShows = this.showsService.popularTvShows;

  private _ = this.showsService.fetchPopularTvShows();
  watchlistService = inject(WatchlistService);

  faHeart = faHeart;
  faHeartSolid = faHeartSolid;

isFav = (id: number) => this.watchlistService.isInWatchlist(id);
toggleWatchlist = (show: any) => this.watchlistService.toggle(show);


  page = this.showsService.currentPage;
  totalPages = this.showsService.totalPages;

  ngOnInit() {
    this.showsService.fetchPopularTvShows(); 
  }

  goToPage(page: number) {
    this.showsService.goToPage(page);
  }
}
