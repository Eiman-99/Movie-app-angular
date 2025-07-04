import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WatchlistService } from '../../services/watchlist-service';
import { FormsModule } from '@angular/forms'; 
import { MovieService } from '../../services/movies-service';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FontAwesomeModule, NgbCollapse, FormsModule, NgbDropdownModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private router = inject(Router);
  watchlistService = inject(WatchlistService);

  count = this.watchlistService.count;
  faHeartSolid = faHeartSolid;
  faHeart = faHeartRegular;
  faBookmark = faBookmarkRegular;
  faSearch = faSearch;

  isCollapsed = true;
  isSearchOpen = false;
  searchTerm = '';
  readonly languageService = inject(LanguageService);
  readonly movieService = inject(MovieService);
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onSearchEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm.trim() },
      });
      this.searchTerm = '';
      this.isSearchOpen = false;
    }
  }

  onSearchInput() {
  const trimmed = this.searchTerm.trim();
  if (trimmed) {
    this.router.navigate(['/search'], {
      queryParams: { query: trimmed },
    });
  } else {
    this.router.navigate(['/']); 
  }
}


}
