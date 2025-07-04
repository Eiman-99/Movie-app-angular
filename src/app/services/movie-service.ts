import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language-service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private baseUrl = 'https://api.themoviedb.org/3/movie';

  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  readonly movie = signal<any>(null);
  readonly recommendations = signal<any[]>([]);
  readonly reviews = signal<any[]>([]);

  fetchMovie(id: number) {
    const lang = this.languageService.selectedLanguage();
    const url = `${this.baseUrl}/${id}?api_key=${this.apiKey}&language=${lang}`;

    this.http.get<any>(url).subscribe(res => this.movie.set(res));
  }

  fetchRecommendations(id: number) {
    const lang = this.languageService.selectedLanguage();
    const url = `${this.baseUrl}/${id}/recommendations?api_key=${this.apiKey}&language=${lang}`;

    this.http.get<any>(url).subscribe(res => this.recommendations.set(res.results));
  }

  fetchReviews(id: number) {
    const lang = this.languageService.selectedLanguage();
    const url = `${this.baseUrl}/${id}/reviews?api_key=${this.apiKey}&language=${lang}`;

    this.http.get<any>(url).subscribe(res => this.reviews.set(res.results));
  }

  fetchAll(id: number) {
    this.fetchMovie(id);
    this.fetchRecommendations(id);
    this.fetchReviews(id);
  }
}
