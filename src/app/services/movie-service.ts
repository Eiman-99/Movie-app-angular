import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329';
  private baseUrl = 'https://api.themoviedb.org/3/movie';

  movie = signal<any>(null);
  recommendations = signal<any[]>([]);
  reviews = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchMovie(id: number) {
    this.http.get(`${this.baseUrl}/${id}?api_key=${this.apiKey}`)
      .subscribe(data => this.movie.set(data));
  }

  fetchRecommendations(id: number) {
    this.http.get<any>(`${this.baseUrl}/${id}/recommendations?api_key=${this.apiKey}`)
      .subscribe(res => this.recommendations.set(res.results));
  }

  fetchReviews(id: number) {
    this.http.get<any>(`${this.baseUrl}/${id}/reviews?api_key=${this.apiKey}`)
      .subscribe(res => this.reviews.set(res.results));
  }

  fetchAll(id: number) {
    this.fetchMovie(id);
    this.fetchRecommendations(id);
    this.fetchReviews(id);
  }
}
