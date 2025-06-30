// src/app/services/movie.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'cc687401dafd56a04490baaaa29e1329'; 
  private apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`;

  private nowPlayingSignal = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.fetchNowPlaying();
  }

  get nowPlaying() {
    return this.nowPlayingSignal;
  }

  private fetchNowPlaying() {
    this.http.get<any>(this.apiUrl).subscribe(res => {
  this.nowPlayingSignal.set(res.results);
});

  }
}
