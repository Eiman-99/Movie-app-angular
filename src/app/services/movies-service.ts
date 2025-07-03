import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private baseUrl = 'https://api.themoviedb.org/3/movie/now_playing';

  private nowPlayingSignal = signal<any[]>([]);
  private currentPageSignal = signal(1);
  private totalPagesSignal = signal(1); 

  constructor(private http: HttpClient) {
    effect(() => {
      this.fetchNowPlaying(this.currentPageSignal());
    });
  }

  get nowPlaying() {
    return this.nowPlayingSignal;
  }

  get currentPage() {
    return this.currentPageSignal;
  }

  get totalPages() {
    return this.totalPagesSignal;
  }

  goToPage(page: number) {
    this.currentPageSignal.set(page); 
  }

  private fetchNowPlaying(page: number) {
  const url = `${this.baseUrl}?api_key=${this.apiKey}&page=${page}`;
  this.http.get<any>(url).subscribe(res => {
    this.nowPlayingSignal.set(res.results);
    this.totalPagesSignal.set(Math.min(res.total_pages, 6)); 
  });
}

}
