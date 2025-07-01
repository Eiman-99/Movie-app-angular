import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { WatchlistService } from '../../services/watchlist-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FontAwesomeModule, NgbCollapse],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  watchlistService = inject(WatchlistService);
  count = this.watchlistService.count;
  faHeartSolid =faHeartSolid;
  faHeart = faHeartRegular;
  faBookmark = faBookmarkRegular;
  faSearch = faSearch;
  isCollapsed = true;
}
