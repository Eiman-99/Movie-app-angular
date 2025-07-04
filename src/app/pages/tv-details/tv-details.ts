import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ShowsService } from '../../services/shows-service';
import { WatchlistService } from '../../services/watchlist-service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './tv-details.html',
  styleUrls: ['./tv-details.scss'],
})
@Injectable({ providedIn: 'root' })
export class TvDetails implements OnInit {
  // Icons
  faStarSolid = faStarSolid;
  faStarHalfAlt = faStarHalfAlt;
  faStar = faStarRegular;
  faHeartSolid = faHeartSolid;
  faHeart = faHeartRegular;

  // Services
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private showsService = inject(ShowsService);
  private watchlistService = inject(WatchlistService);

  // Signals
  readonly tvShow = this.showsService.selectedTvShow;
  readonly recommendations = signal<any[]>([]);
  readonly reviews = signal<any[]>([]);

  private apiKey = 'cc687401dafd56a04490baaaa29e1329';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.showsService.fetchTvShowDetails(id);
        this.fetchRecommendations(id);
        this.fetchReviews(id);
      }
    });
  }

  private fetchRecommendations(id: number) {
    this.http
      .get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${this.apiKey}`)
      .subscribe((res: any) => this.recommendations.set(res.results));
  }

  private fetchReviews(id: number) {
    this.http
      .get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.apiKey}`)
      .subscribe((res: any) => this.reviews.set(res.results));
  }

  isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.tvShow()?.id);
  }

  toggleWatchlist(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.watchlistService.toggle(this.tvShow());
  }
}
