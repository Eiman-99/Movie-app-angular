import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, DatePipe } from '@angular/common';
import { WatchlistService } from '../../services/watchlist-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, HttpClientModule, FontAwesomeModule, DatePipe, FontAwesomeModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {

   faHeart = faHeartRegular;
  faHeartSolid = faHeartSolid;
  
 private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  watchlistService = inject(WatchlistService);
  

  query = '';
  results: any[] = [];
  apiKey = 'cc687401dafd56a04490baaaa29e1329'; 

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.searchMovies(this.query);
      }
    });
  }

  searchMovies(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`;
    this.http.get<any>(url).subscribe(res => {
      this.results = res.results || [];
    });
  }

 searchTerm = '';
  private router = inject(Router);

  onSearchInput() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm.trim() }
      });
    }
  }

  toggleWatchlist(movie: any) {
  this.watchlistService.toggle(movie);
}

isFav(movie: any): boolean {
  return this.watchlistService.isInWatchlist(movie.id);
}

}
