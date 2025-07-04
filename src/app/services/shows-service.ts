import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private http = inject(HttpClient);

  readonly popularTvShows = signal<any[]>([]);
  readonly selectedTvShow = signal<any | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);

  fetchPopularTvShows(page = 1) {
    this.http
      .get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&page=${page}`)
      .subscribe((res: any) => {
  this.popularTvShows.set(res.results);
  this.currentPage.set(res.page);
  this.totalPages.set(Math.min(res.total_pages, 6));
});

  }

  goToPage(page: number) {
    this.fetchPopularTvShows(page);
  }

  fetchTvShowDetails(id: number) {
    this.http
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`)
      .subscribe((res) => this.selectedTvShow.set(res));
  }
}
