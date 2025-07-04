import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home }  from './pages/home/home';
import { Shows } from './pages/shows/shows';
import { Watchlist } from './pages/watchlist/watchlist';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Search } from './pages/search/search';
import { TvDetails } from './pages/tv-details/tv-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'shows', component: Shows },
  {path: 'watchlist', component: Watchlist},
  {path: 'movie-details/:id', component: MovieDetails},
  {path: 'search', component: Search},
  {path: 'tv-details/:id', component: TvDetails}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
