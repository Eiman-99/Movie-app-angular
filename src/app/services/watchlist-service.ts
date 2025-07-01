import { Injectable, signal, computed } from '@angular/core';

type Movie = any; 

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private watchlistSignal = signal<Movie[]>([]);

  get watchlist() {
    return this.watchlistSignal;
  }

  readonly count = computed(() => this.watchlistSignal().length);

  isInWatchlist(movieId: number): boolean {
    return this.watchlistSignal().some(m => m.id === movieId);
  }

  toggle(movie: Movie) {
    const current = this.watchlistSignal();
    const exists = current.find(m => m.id === movie.id);
    if (exists) {
      this.watchlistSignal.set(current.filter(m => m.id !== movie.id));
    } else {
      this.watchlistSignal.set([...current, movie]);
    }
  }

  remove(movieId: number) {
    this.watchlistSignal.set(this.watchlistSignal().filter(m => m.id !== movieId));
  }
}
