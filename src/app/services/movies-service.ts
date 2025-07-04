import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language-service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private baseUrl = 'https://api.themoviedb.org/3/movie/now_playing';

  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  private nowPlayingSignal = signal<any[]>([]);
  private currentPageSignal = signal(1);
  private totalPagesSignal = signal(1);

  readonly loadMovies = effect(() => {
    const page = this.currentPageSignal();
    const lang = this.languageService.selectedLanguage();

    const url = `${this.baseUrl}?api_key=${this.apiKey}&page=${page}&language=${lang}`;

    this.http.get<any>(url).subscribe(res => {
      this.nowPlayingSignal.set(res.results || []);
      this.totalPagesSignal.set(Math.min(res.total_pages, 6));
    });
  });

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
}
