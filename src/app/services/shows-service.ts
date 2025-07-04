import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language-service';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  readonly popularTvShows = signal<any[]>([]);
  readonly selectedTvShow = signal<any | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);

  readonly _ = effect(() => {
    const lang = this.languageService.selectedLanguage();
    const page = this.currentPage();

    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&page=${page}&language=${lang}`;
    this.http.get<any>(url).subscribe(res => {
      this.popularTvShows.set(res.results || []);
      this.currentPage.set(res.page);
      this.totalPages.set(Math.min(res.total_pages, 6));
    });
  });

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  fetchPopularTvShows() {
    this.currentPage.set(this.currentPage());
  }

  fetchTvShowDetails(id: number) {
    const lang = this.languageService.selectedLanguage();
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=${lang}`;
    this.http.get<any>(url).subscribe(res => this.selectedTvShow.set(res));
  }
}
