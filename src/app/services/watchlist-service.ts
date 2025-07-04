import { Injectable, signal, computed } from '@angular/core';

type Movie = any; 

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  has(id: any): boolean {
    throw new Error('Method not implemented.');
  }
  private watchlistSignal = signal<Movie[]>([]);

  get watchlist() {
    return this.watchlistSignal;
  }

  readonly count = computed(() => this.watchlistSignal().length);

  isInWatchlist(movieId: number): boolean {
    return this.watchlistSignal().some(m => m.id === movieId);
  }

   toggle(item: any) {
    const current = this.watchlistSignal();
    const exists = current.find(m => m.id === item.id);
    if (exists) {
      this.remove(item.id);
    } else {
      this.addToWatchlist(item);  
    }
  }

  remove(movieId: number) {
    this.watchlistSignal.set(this.watchlistSignal().filter(m => m.id !== movieId));
  }

   addToWatchlist(item: any) {
  const displayTitle = item.title || item.name || 'Unknown';
  const media_type = item.first_air_date ? 'tv' : 'movie'; // TV shows have first_air_date
  const watchlistItem = { ...item, displayTitle, media_type };
  this.watchlistSignal.set([...this.watchlist(), watchlistItem]);
}



}
